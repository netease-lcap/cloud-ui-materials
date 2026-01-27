import * as naslTypes from '@nasl/ast-mini';
import type { ProcessV2 } from '../index';
import {
  NameGroup,
  filterProperty,
  firstUpperCase,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  transEntityMetadataTypes,
} from './blocks/utils';

import { genColumnMeta, genQueryLogic, isMinMaxString, parseSafeNumberRule } from './blocks/genCommonBlock';

// ----------------------------------------------------------------------------- utils -----------------------------------------------------------------------------
// 生成当前子表单的命名组
function genSubFormNameGroup(variableConfig: any, likeComponent: any, isApprovePage: boolean) {
  const { entity, name, processName, delInfoVarName } = variableConfig;
  const entityName = entity.name;
  return {
    headerTitle: `子表单${entityName}`, // 子表单标题
    addInfo: likeComponent.getLogicUniqueName('addInfo'), // 添加信息逻辑
    copyInfo: likeComponent.getLogicUniqueName('copyInfo'), // 复制信息逻辑
    deleteInfo: likeComponent.getLogicUniqueName('deleteInfo'), // 删除信息逻辑
    tableNode: likeComponent.getViewElementUniqueName('tableView'), // 子表单table节点名
    dataSourceVarName: isApprovePage // 子表单数据源局部变量名
      ? `${processName}.${name}` // (审批页面)
      : `${firstLowerCase(entityName)}List`, // (申请页面)
    delInfoVarName, // 子表单删除信息局部变量名
    delModalName: likeComponent.getViewElementUniqueName(`del${entityName}Modal`), // 删除弹窗节点名
    vModelName: 'current.item', // 子表单列v-model绑定值
    entityFullName: `${entity.getNamespace()}.${entityName}`, // 子表单实体全名
  };
}

// 子表单实体属性过滤
const filterProperties = ['id', 'createdTime', 'updatedTime', 'createdBy', 'updatedBy'];

// ----------------------------------------------------------------------------- export ----------------------------------------------------------------------------
// 获取子表单配置
export function getSubFormConfig(process: ProcessV2, source?: any, likeComponent?: any) {
  const app = process.getAncestor('App');
  const processName = process.name;
  return (
    process?.bind?.typeAnnotation?.properties
      ?.filter((property: any) => {
        if (property?.name?.startsWith('relation_data') || property?.name?.startsWith('relationData')) {
          const { typeName } = property.typeAnnotation.typeArguments[0];
          return source ? source[typeName] : true;
        }
      })
      ?.map((property: any) => {
        const typeAnnotation = property?.typeAnnotation?.typeArguments?.[0];
        if (typeAnnotation) {
          const { typeName, typeNamespace } = typeAnnotation;
          const fullName = `${typeNamespace}.${typeName}`;
          let delInfoVarName = `del${typeName}`;
          return {
            name: property.name, // 子表单名称
            varName: firstLowerCase(typeName), // 局部变量名为首字母小写
            entity: app.findNodeByCompleteName(fullName), // 实体
            type: fullName,
            isMainEntity: false,
            processName,
            delInfoVarName: likeComponent ? likeComponent.getVariableUniqueName(delInfoVarName) : delInfoVarName, // 子表单删除信息局部变量需要唯一
          };
        }
      }) || []
  );
}

// 生成子表单新建实体的配置
export function genSubFormEntityNewComposite(entity: naslTypes.Entity, withConnection: boolean) {
  return entity.properties
    .map((property) => {
      const propertyName = property.name;
      return `${propertyName}: ${
        filterProperties.includes(propertyName) ? 'undefined' : withConnection ? `current.item.${propertyName}` : 'undefined'
      }`;
    })
    .join(', ');
}

// 生成子表单模版
export function genSubFormStencilTemplate(
  mainEntity: naslTypes.Entity,
  likeComponent: any,
  variableConfigList: Array<any>,
  selectNameGroupMap: Map<string, NameGroup>,
  newLogics: Array<string>,
  isApprovePage: boolean, // 是否是审批页面
  source?: any // 选择的属性
) {
  let result = '';
  const module = mainEntity.getAncestor('App');
  variableConfigList.forEach((variableConfig) => {
    const { isMainEntity, entity } = variableConfig;
    if (!isMainEntity) {
      const entityName = entity.name;
      const subFormTitle = `子表单${entityName}`;
      const nameGroup = genSubFormNameGroup(variableConfig, likeComponent, isApprovePage); // 生成子表单命名组
      let properties: any = [];
      if (source) {
        properties = source[entityName] || [];
      } else {
        properties = entity.properties.filter((property: any) => {
          return !filterProperties.includes(property.name) && property?.relationEntity !== mainEntity.name && filterProperty('inForm')(property);
        });
      }
      if (!properties.length) return;
      properties.forEach((property) => {
        // 有外键关联
        if (property.relationEntity) {
          const relationEntity = entity.parentNode?.findEntityByName(property.relationEntity);
          if (relationEntity) {
            const displayedProperty = getFirstDisplayedProperty(relationEntity);
            if (displayedProperty) {
              const viewElementSelect = likeComponent.getViewElementUniqueName('el_select');
              const selectNameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementSelect, false, relationEntity.name);
              selectNameGroup.viewElementSelect = viewElementSelect;
              // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
              const key = [entityName, property.name, relationEntity.name].join('-');
              selectNameGroupMap.set(key, selectNameGroup);
              const newLogic = genQueryLogic([relationEntity], selectNameGroup, false, false, false);
              newLogics.push(newLogic);
            }
          }
        }
      });
      const width = 60 + 160 + properties.length * 180; // “序号列 + 操作列 + 属性列” 的宽度
      result += `<ElCol span={24}>
          <ElFlex direction="vertical" mode="block">
            <ElFlex direction="horizontal" mode="block">
              <ElText text="${subFormTitle}"></ElText>
            </ElFlex>
            <ElFlex direction="vertical" mode="block">
              <ElFlex direction="horizontal" mode="block">
                <ElButton
                  text="添 加" 
                  type="primary"
                  style="margin-bottom:0px;"
                  onClick={
                    function ${nameGroup.addInfo}(event) {
                      nasl.util.Add(${nameGroup.dataSourceVarName}, nasl.util.NewEntity<${nameGroup.entityFullName}>({ ${genSubFormEntityNewComposite(
        entity,
        false
      )} }))
                    }
                  }
                >
                </ElButton>
              </ElFlex>
              <ElTable
                ref="${nameGroup.tableNode}"
                dataSource={$sync(${nameGroup.dataSourceVarName})}
                sticky={false}
                border={false}
                stripe={false}
                style="--el-table-header-bg-color:#f7f8fa; --custom-start: auto; width: min(${width}px, 100%);"
              >
                <ElTableColumn
                  type="index"
                  isFixed={true}
                  resizable={false}
                  fixed="left"
                  style="width:60px;"
                  slotHeader={ <ElText text="序号"></ElText> }
                >
                </ElTableColumn>
                ${properties.map((property: any) => `${genTableColumnTemplate(entity, property, nameGroup, selectNameGroupMap)}`).join('\n')}
                <ElTableColumn
                  isFixed={true}
                  resizable={false}
                  fixed="right"
                  style="width:160px;"
                  slotHeader={ <ElText text="操作"></ElText> }
                  slotDefault={
                    (current) => <ElFlex direction="horizontal" mode="block">
                      <ElLink 
                        text="复制" 
                        type="primary"
                        onClick={
                          function ${nameGroup.copyInfo}(event) {
                            nasl.util.Add(${nameGroup.dataSourceVarName}, nasl.util.NewEntity<${
        nameGroup.entityFullName
      }>({ ${genSubFormEntityNewComposite(entity, true)} }))
                          }
                        }
                      >
                      </ElLink>
                      <ElLink 
                        text="删除" 
                        type="primary"
                        onClick={
                          function ${nameGroup.deleteInfo}(event) {
                            ${nameGroup.delInfoVarName} = current.item
                            $refs.${nameGroup.delModalName}.open()
                          }
                        }
                      >
                      </ElLink>
                  </ElFlex>
                  }
                >
                </ElTableColumn>
              </ElTable>
            </ElFlex>

            <ElDialog 
              ref="${nameGroup.delModalName}"
              width="400px"
              slotHeader={ <ElText text="删除"></ElText> }
              slotFooter={
                <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center">
                  <ElButton 
                    text="取 消"
                    onClick={
                      function ${nameGroup.deleteInfo}(event) {
                        $refs.${nameGroup.delModalName}.close()
                      }
                    }
                  >
                  </ElButton>
                  <ElButton 
                    text="确 定"
                    type="primary"
                    onClick={
                      function ${nameGroup.deleteInfo}(event) {
                        nasl.util.Remove(${nameGroup.dataSourceVarName}, ${nameGroup.delInfoVarName})
                        $refs.${nameGroup.delModalName}.close()
                      }
                    }
                  >
                  </ElButton>
                </ElFlex>
              }
            >
              <ElFlex direction="horizontal" mode="flex" justify="center" alignment="center" style="padding-top:20px;padding-bottom:20px;">
                <ElIcon name="WarningFilled" style="font-size:48px;color:#ffaf0f;"></ElIcon>
                <ElFlex direction="vertical" wrap={true} justify="start" alignment="stretch">
                  <ElText text="请确认是否删除？" style="font-size:18px;font-weight:bold;"></ElText>
                  <ElText text="删除后将无法恢复，请谨慎操作"></ElText>
                </ElFlex>
              </ElFlex>
            </ElDialog>
          </ElFlex>
      </ElCol>\n`;
    }
  });
  return result;
}

// 生成子表单列模版
function genTableColumnTemplate(
  entity: naslTypes.Entity,
  property: naslTypes.EntityProperty,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>
) {
  const { title } = genColumnMeta(property, nameGroup);
  const required = property.required;

  return `<ElTableColumn
    style="width:180px;"
    resizable={false}
    prop="${property.name}"
    slotHeader={
      <>
        ${required ? '<ElText text="*" style="color: red;"></ElText>' : ''}
        <ElText text="${title}"></ElText>
      </>
    }
    slotDefault={
      (current) => ${genPropertyEditableTemplate(entity, property, nameGroup, selectNameGroupMap, {
        needRules: true,
        needDefaultValue: true,
      })}
    }
  >
  </ElTableColumn>`;
}

/**
 * property 列生成
 * @param {*} entity
 * @param {*} property
 * @param {*} nameGroup
 * @param {*} selectNameGroupMap
 * @param {*} options
 * @returns
 */
// 与genCommonBlock中的genPropertyEditableTemplate不同点：
// 1.可能存在多个子表单，所以在检索属性的外健关联时，key由实体名+属性名+关联实体名组成
// 2.USelect组件需要额外添加appendTo="body"属性
function genPropertyEditableTemplate(
  entity: naslTypes.Entity,
  property: naslTypes.EntityProperty,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>,
  options: { needRules: boolean; needDefaultValue: boolean }
) {
  // 下面是 生成rules和formItemAttrs的逻辑，参考genFormItemTemplate
  const required = !!property.required && options.needRules;
  const rules: Array<string> = [];

  if (options.needRules && property.rules && property.rules.length) {
    property.rules.forEach((rule) => {
      let curRule = rule;
      if (!rule.endsWith(')')) {
        curRule += '()';
      }
      if (isMinMaxString(curRule)) {
        curRule = parseSafeNumberRule(curRule);
      }
      rules.push(`nasl.validation.${curRule}`);
    });
  }

  if (required) rules.push('nasl.validation.required()');

  const formItemAttrs: string[] = ['labelWidth={0}', `style="width:100%;margin-bottom:0;"`]; // 子表单中的需要特化处理

  // if (required) {
  //   formItemAttrs.push('isRequired={true}'); // 子表单中的表单项不需要必填标记
  // }

  if (rules.length > 0) {
    formItemAttrs.push(`rules={[${rules.join(',')}]}`);
  }

  // 下面开始是genPropertyEditableTemplate的逻辑
  const dataSource = entity.parentNode;
  const vModel = `${nameGroup.vModelName}.${property.name}`;
  const label = (property.label || property.name).replace(/"/g, '&quot;');
  const { typeAnnotation } = property || {};
  const { typeNamespace: propertyTypeNamespace } = typeAnnotation || {};
  const propertyTypeName = transEntityMetadataTypes(typeAnnotation, dataSource.app);
  const propertyTypeMaxLength =
    Number(
      property.rules
        .find((item) => item.indexOf('max') > -1)
        ?.split('(')[1]
        .slice(0, -1)
    ) || 0;
  if (property.relationEntity) {
    // 有外键关联
    const relationEntity = dataSource?.findEntityByName(property.relationEntity);
    if (relationEntity) {
      const relationProperty = relationEntity.properties.find((prop) => prop.name === property.relationProperty);
      const displayedProperty = getFirstDisplayedProperty(relationEntity);
      if (displayedProperty) {
        const lowerEntityName = firstLowerCase(relationEntity.name);
        // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
        const key = [entity.name, property.name, relationEntity.name].join('-'); // 此处的key多了entity.name
        const selectNameGroup = selectNameGroupMap.get(key);
        const dataSourceValue = `app.logics.${selectNameGroup.logic}()`; // 选择器不支持分页
        return `<ElFormSelect ${formItemAttrs.join(' ')}
            clearable={true}
            placeholder="请选择${label}"
            dataSource={${dataSourceValue}}
            textField="${lowerEntityName}.${displayedProperty.name}"
            valueField="${lowerEntityName}.${relationProperty.name}"
            modelValue={$sync(${vModel})}>
        </ElFormSelect>`;
      }
      return '';
    }
    return '';
  }
  if (propertyTypeName === 'Boolean') {
    return `<ElFormSelect ${formItemAttrs.join(' ')}
        clearable={true}
        placeholder="请选择${label}"
        modelValue={$sync(${vModel})}>
        <ElOption value={true} label="是"><ElText text="是" /></ElOption>
        <ElOption value={false} label="否"><ElText text="否" /></ElOption>
    </ElFormSelect>`;
  }
  if (propertyTypeName === 'Integer' || propertyTypeName === 'Long') {
    return `<ElFormInputNumber ${formItemAttrs.join(' ')}
        theme="column"
        placeholder="请输入${label}"
        modelValue={$sync(${vModel})}>
    </ElFormInputNumber>`;
  }
  if (propertyTypeName === 'Double') {
    return `<ElFormInputNumber ${formItemAttrs.join(' ')}
        theme="column"
        placeholder="请输入${label}"
        modelValue={$sync(${vModel})}>
    </ElFormInputNumber>`;
  }
  if (propertyTypeName === 'Decimal') {
    return `<ElFormInputNumber ${formItemAttrs.join(' ')}
        theme="column"
        placeholder="请输入${label}"
        modelValue={$sync(${vModel})}>
    </ElFormInputNumber>`;
  }
  if (propertyTypeName === 'String' && propertyTypeMaxLength > 256) {
    return `<ElFormInput ${formItemAttrs.join(' ')}
        placeholder="请输入${label}"
        modelValue={$sync(${vModel})}
        type="textarea">
    </ElFormInput>`;
  }
  if (propertyTypeName === 'Date') {
    return `<ElFormDatePicker ${formItemAttrs.join(' ')}
        type="date"
        clearable={true}
        placeholder="请选择${label}"
        prefixIconName="Calendar"
        clearIconName="CircleClose"
        format="YYYY-MM-DD"
        valueFormat="YYYY-MM-DD"
        modelValue={$sync(${vModel})}>
    </ElFormDatePicker>`;
  }
  if (propertyTypeName === 'Time') {
    return `<ElFormTimePicker ${formItemAttrs.join(' ')}
        placeholder="请选择${label}"
        prefixIconName="Clock"
        clearIconName="CircleClose"
        modelValue={$sync(${vModel})}>
    </ElFormTimePicker>`;
  }
  if (propertyTypeName === 'DateTime') {
    return `<ElFormDatePicker ${formItemAttrs.join(' ')}
        type="datetime"
        clearable={true}
        placeholder="请选择${label}"
        prefixIconName="Clock"
        clearIconName="CircleClose"
        modelValue={$sync(${vModel})}>
    </ElFormDatePicker>`;
  }
  const namespaceArr = typeof propertyTypeNamespace === 'string' ? propertyTypeNamespace.split('.') : [];
  const type = namespaceArr.pop();
  if (type === 'enums') {
    const enumTypeAnnotationStr = `${propertyTypeNamespace}.${propertyTypeName}`;
    return `<ElFormSelect ${formItemAttrs.join(' ')}
        clearable={true}
        placeholder="请选择${label}"
        textField="text"
        valueField="item"
        dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}
        modelValue={$sync(${vModel})}>
    </ElFormSelect>`;
  }
  return `<ElFormInput ${formItemAttrs.join(' ')} placeholder="请输入${label}" modelValue={$sync(${vModel})}></ElFormInput>`;
}
