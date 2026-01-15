import * as naslTypes from '@nasl/ast-mini';
import { NameGroup, firstUpperCase } from './blocks/utils';
import { genPropertyEditableTemplate, genFormItemTemplate } from './blocks/genCommonBlock';
import { genSubFormEntityNewComposite } from './subForm';
import { logicNamespace } from '../../../src/components/utils';

import type { ProcessV2 } from '../index';

// 生成页面下的局部变量
export function genViewVariables(variableConfigList: Array<any>, isApprovePage: boolean) {
  return variableConfigList
    .map((variableConfig) => {
      const { varName, type, isMainEntity, delInfoVarName } = variableConfig;
      // case1: 主实体
      if (isMainEntity) {
        return `let ${varName}: ${type};`;
      } else {
        // case2: 子表单
        // 子表单数据源局部变量(审批页面不需要该局部变量)
        const dataSourceVarName = `${varName}List`;
        return isApprovePage ? `let ${delInfoVarName}: ${type};` : `let ${dataSourceVarName}: List<${type}>;\n  let ${delInfoVarName}: ${type};`;
      }
    })
    .join('\n  ');
}

export function genProcessV2LaunchLogic(entity: naslTypes.Entity, process: ProcessV2, nameGroup: any, variableConfigList: Array<any>) {
  const mainEntityName = entity.name;
  const app = entity.getAncestor('App');
  // step1: 生成参数
  const params = variableConfigList
    .map((variableConfig, index) => {
      const { type, isMainEntity } = variableConfig;
      return `param${index + 1}: ${isMainEntity ? type : `List<${type}>`}`;
    })
    .join(', ');

  // step2: 生成数据创建逻辑
  const dataCreateStr =
    variableConfigList
      .map((variableConfig, index) => {
        const { type, isMainEntity } = variableConfig;
        if (isMainEntity) {
          return `variable1 = ${type}Entity.create(param1);`;
        } else {
          const subFormEntity = app.findNodeByCompleteName(type);
          // 子表单关联主表单的属性
          const property = subFormEntity.properties.find((prop: any) => prop?.relationEntity && prop?.relationEntity === mainEntityName);
          const param = `param${index + 1}`;
          return `if (nasl.util.HasValue(${param})) {
              ForEach(${param}, 0, __IDENTIFIER__, (item, index) => {
                  item.${property.name} = variable1.${property.relationProperty}
              })
              ${type}Entity.batchCreate(${param})
          }`;
        }
      })
      .join('\n') || '';
  // step3: 生成调用逻辑的data参数
  const dataArgs = variableConfigList
    .map((variableConfig, index) => {
      return variableConfig.isMainEntity ? `data: variable1` : `${variableConfig.name}: param${index + 1}`;
    })
    .join(', ');

  return `export function ${nameGroup.processLaunch}(${params} ) {
    let variable1;
    let result;
    ${dataCreateStr}
    result = ${logicNamespace}.launchProcess(nasl.util.NewAnonymousStructure({ ${dataArgs} }), '${process.uniqueKey}');
    return result;
  }`;
}

// 表单项外层套栅格布局
export function genGridLayoutColumnTemplate(
  entity: naslTypes.Entity,
  properties: Array<naslTypes.EntityProperty>,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>,
  options = {
    needRules: true,
  }
) {
  return `${properties
    .map((property) => {
      const formItemTemplate = genFormItemTemplate(entity, property, nameGroup, selectNameGroupMap, options);
      return `<ElCol span={12}>\n  ${formItemTemplate}\n</ElCol>`;
    })
    .join('\n')}`;
}
