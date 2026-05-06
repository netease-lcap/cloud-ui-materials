import * as naslTypes from '@nasl/ast-mini';
import type { ProcessV2 } from '../index';
import {
  NameGroup,
  filterProperty,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  transEntityMetadataTypes,
} from './blocks/utils';

import { genQueryLogic } from './blocks/genCommonBlock';

// ----------------------------------------------------------------------------- utils -----------------------------------------------------------------------------
// 生成当前子表单的命名组
function genSubFormNameGroup(variableConfig: any, likeComponent: any, isApprovePage: boolean) {
  const { entity, name, processName, delInfoVarName } = variableConfig;
  const entityName = entity.name;
  return {
    headerTitle: `子表单${entityName}`, // 子表单标题
    addInfo: likeComponent.getLogicUniqueName('addInfo'), // 添加信息逻辑
    deleteInfo: likeComponent.getLogicUniqueName('deleteInfo'), // 删除信息逻辑
    delInfoVarName, // 子表单删除信息局部变量名
    delDialogName: likeComponent.getViewElementUniqueName(`del${entityName}Dialog`), // 删除弹窗节点名
    delIndexVarName: likeComponent.getVariableUniqueName(`del${entityName}Index`), // 删除索引变量名
    dataSourceVarName: isApprovePage // 子表单数据源局部变量名
      ? `${processName}.${name}` // (审批页面)
      : `${firstLowerCase(entityName)}List`, // (申请页面)
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
      return `${propertyName}: ${filterProperties.includes(propertyName) ? 'undefined' : withConnection ? `current.item.${propertyName}` : 'undefined'
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
              const viewElementSelect = likeComponent.getViewElementUniqueName('select');
              const selectNameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementSelect, false, relationEntity.name);
              selectNameGroup.viewElementSelect = viewElementSelect;
              // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
              const key = [entityName, property.name, relationEntity.name].join('-');
              selectNameGroupMap.set(key, selectNameGroup);
              const newLogic = genQueryLogic([relationEntity], selectNameGroup, false, false, module);
              newLogics.push(newLogic);
            }
          }
        }
      });

      // 生成子表单字段模板
      const formFieldsTemplate = properties.map((property: any) => {
        const label = (property.label || property.name).replace(/"/g, '&quot;');
        const required = property.required;
        const rules: Array<string> = [];
        if (property.rules && property.rules.length) {
          property.rules.forEach((rule) => {
            if (!rule.endsWith(')')) {
              rule += '()';
            }
            rules.push(`nasl.validation.${rule}`);
          });
        }
        if (required) rules.push('nasl.validation.required()');
        return `<VanField
          ${required ? 'required={true}' : ''}
          ${rules.length ? ` rules={[${rules.join(',')}]}` : ''}
          drole="other"
          slotInput={
            ${genSubFormPropertyEditableTemplate(entity, property, nameGroup, selectNameGroupMap)}
          }
          slotTitle={
            <VanText text="${label}"></VanText>
          }></VanField>`;
      }).join('\n');

      // 申请页面和审批页面都支持添加和删除
      {
        // 申请页面，支持添加和删除
        result += `<VanField
          drole="other"
          labelLayout="block"
          slotTitle={
            <VanText text="${subFormTitle}"></VanText>
          }
          slotInput={
            <VanLinearLayout direction="horizontal" style="width:100%;">
              <VanLinearLayout direction="horizontal" wrap={true} gap="normal">
                <VanButton
                  type="info"
                  size="small"
                  text="添加"
                  squareroud="square"
                  subFormBtnType="add"
                  onClick={
                    function ${nameGroup.addInfo}(event) {
                      nasl.util.Add(${nameGroup.dataSourceVarName}, nasl.util.NewEntity<${nameGroup.entityFullName}>({ ${genSubFormEntityNewComposite(
          entity,
          false
        )} }))
                      return;
                    }
                  }>
                </VanButton>
                <VanValidator rules={[]} style="width:100%;">
                  <VanForComponents
                    colnum={1}
                    style="width:100%;"
                    dataSource={$sync(${nameGroup.dataSourceVarName})}
                    dataSourceWatch={[]}
                    equalWidth={true}
                    slotItem={
                      (current) => <VanCollapse value={undefined}>
                        <VanCollapseItem isLink={true}
                          justify="space-between"
                          wrap={true}
                          slotTitle={
                            <VanLinearLayout justify="space-between" wrap={true}>
                              <VanLinearLayout wrap={true}>
                                <VanText text={\`数据\${current.index + 1}\`}></VanText>
                              </VanLinearLayout>
                              <VanLinearLayout wrap={true}>
                                <VanLink
                                  text="删除"
                                  subFormBtnType="delete"
                                  onClick={
                                    function ${nameGroup.deleteInfo}(event) {
                                      ${nameGroup.delInfoVarName} = current.item
                                      $refs.${nameGroup.delDialogName}.openModal()
                                      return;
                                    }
                                  }>
                                </VanLink>
                              </VanLinearLayout>
                            </VanLinearLayout>
                          }
                          slotDefault={
                            <VanForm>
                              ${formFieldsTemplate}
                            </VanForm>
                          }>
                        </VanCollapseItem>
                      </VanCollapse>
                    }
                    slotDefault={
                      (current) => <VanRow gutter="0" vusionDisabledCopy={true} vusionDisabledAddslot={true} vusionDisabledCut={true}>
                        <VanCol span={24} vusionDisabledCopy={true} vusionDisabledCut={true}></VanCol>
                      </VanRow>
                    }>
                  </VanForComponents>
                </VanValidator>
              </VanLinearLayout>
            </VanLinearLayout>
          }></VanField>
          <VanDialog
            ref="${nameGroup.delDialogName}"
            safeAreaInsetBottom={true}
            slotFooter={
              <VanLinearLayout type="flex" vusionDisabledCut={true} style="width:100%;">
                <VanButton
                  size="large" nativeType="button"
                  text="取消"
                  style="-webkit-box-flex: 1;flex: 1;margin: 0;border:0;--custom-start: auto; font-size: 4.26667vw;"
                  onClick={
                    function ${nameGroup.deleteInfo}(event) {
                      $refs.${nameGroup.delDialogName}.closeModal()
                    }
                  }>
                </VanButton>
                <VanButton
                  text="确认"
                  size="large" nativeType="button"
                  style="-webkit-box-flex: 1;flex: 1;margin: 0;border:0;
                  color: var(--van-dialog-confirm-button-text-color);border-left: 1px solid var(--van-border-color);border-top-left-radius: 0;border-bottom-left-radius:0;--custom-start: auto; font-size: 4.26667vw;"
                  onClick={
                    function ${nameGroup.deleteInfo}(event) {
                      nasl.util.Remove(${nameGroup.dataSourceVarName}, ${nameGroup.delInfoVarName})
                      $refs.${nameGroup.delDialogName}.closeModal()
                    }
                  }>
                </VanButton>
              </VanLinearLayout>
            }>
            <Div vusionSlotName="default" vusionDisabledCopy={true} vusionDisabledCut={true} env="alone" style="min-height:100px;padding: 24px;">
              <VanRow gutter="0">
                <VanCol span={8} mode="flex" justify="center" alignment="center">
                  <VanIconv
                    name="info"
                    icotype="only"
                    _background-color="#ffaf0f"
                    _color="#fff"
                    style="font-size:48px;border-top-left-radius:24px;border-bottom-left-radius:24px;border-top-right-radius:24px;border-bottom-right-radius:24px;">
                  <VanText text="图标"></VanText>
                </VanIconv>
              </VanCol>
              <VanCol span={16} style="text-align: left;">
                <VanText text="请确认是否删除？" display="block" style="font-size:18px;font-weight:bold;"></VanText>
                <VanText text="删除后将无法恢复，请谨慎操作" style="font-size: 14px;"></VanText>
              </VanCol>
            </VanRow>
            </Div>
          </VanDialog>`;
      }
    }
  });
  return result;
}

/**
 * property 列生成
 * @param {*} entity
 * @param {*} property
 * @param {*} nameGroup
 * @param {*} selectNameGroupMap
 * @returns
 */
// 与genCommonBlock中的genPropertyEditableTemplate不同点：
// 1.可能存在多个子表单，所以在检索属性的外健关联时，key由实体名+属性名+关联实体名组成
// 2.子表单中使用current.item作为vModelName
function genSubFormPropertyEditableTemplate(
  entity: naslTypes.Entity,
  property: naslTypes.EntityProperty,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>
) {
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
        const dataSourceValue = `app.logics.${selectNameGroup.logic}(elements.$ce.page, elements.$ce.size)`;
        return `<VanPickerson
                type="list"
                showToolbar={true}
                title="请选择${label}"
                placeholder="请选择${label}"
                value={$sync(${vModel})}
                dataSource={${dataSourceValue}}
                pageSize={50}
                textField="${lowerEntityName}.${displayedProperty.name}"
                valueField="${lowerEntityName}.${relationProperty.name}"
                notitleblock={true}
                pageable={true}
                inputAlign="left"
                remotePaging={true}
                slot-pannel-title={
                  <VanText text="请选择${label}"></VanText>
                }
                slot-picker-top={
                  <>
                    <VanPickerActionSlot targetMethod="cancel">
                      <VanIconv name="left-arrow" icotype="only"></VanIconv>
                    </VanPickerActionSlot>
                    <VanPickerActionSlot targetMethod="confirm">
                    </VanPickerActionSlot>
                  </>
                }
                slot-picker-bottom={
                  <>
                    <VanPickerActionSlot targetMethod="cancel">
                      <VanButton
                        type="info_secondary"
                        size="normal"
                        text="取消"
                        squareroud="round"
                      ></VanButton>
                    </VanPickerActionSlot>
                    <VanPickerActionSlot targetMethod="confirm">
                      <VanButton
                        type="info"
                        size="normal"
                        text="确认"
                        squareroud="round"
                      ></VanButton>
                    </VanPickerActionSlot>
                  </>
                }>
            </VanPickerson>`;
      }
      return '';
    }
    return '';
  }
  if (propertyTypeName === 'Boolean') {
    return `<VanSwitch value={$sync(${vModel})}></VanSwitch>`;
  }
  if (propertyTypeName === 'Integer' || propertyTypeName === 'Long') {
    return `<VanStepperNew value={$sync(${vModel})} placeholder="请输入${label}" showPlus={false} showMinus={false} align="left"></VanStepperNew>`;
  }
  if (propertyTypeName === 'Double') {
    return `<VanStepperNew value={$sync(${vModel})} placeholder="请输入${label}" showPlus={false} showMinus={false} align="left"></VanStepperNew>`;
  }
  if (propertyTypeName === 'Decimal') {
    return `<VanStepperNew value={$sync(${vModel})} placeholder="请输入${label}" showPlus={false} showMinus={false} align="left"></VanStepperNew>`;
  }
  if (propertyTypeName === 'String' && propertyTypeMaxLength > 256) {
    return `<VanFieldtextarea value={$sync(${vModel})} placeholder="请输入${label}"></VanFieldtextarea>`;
  }
  if (propertyTypeName === 'Date') {
    return `<VanCalendar value={$sync(${vModel})} title="选择日期" inputAlign="left"></VanCalendar>`;
  }
  if (propertyTypeName === 'Time') {
    return `<VanDatetimePicker type="time" value={$sync(${vModel})} title="请选择${label}" labelField="" inputAlign="left"></VanDatetimePicker>`;
  }
  if (propertyTypeName === 'DateTime') {
    return `<VanDatetimePicker type="datetime" value={$sync(${vModel})} title="请选择${label}" labelField="" inputAlign="left"></VanDatetimePicker>`;
  }
  const namespaceArr = propertyTypeNamespace.split('.');
  const type = namespaceArr.pop();
  if (type === 'enums') {
    const enumTypeAnnotationStr = `${propertyTypeNamespace}.${propertyTypeName}`;
    return `<VanPickerson
                type="list"
                showToolbar={true}
                title="请选择${label}"
                placeholder="请选择${label}"
                value={$sync(${vModel})}
                dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}
                pageSize={50}
                notitleblock={true}
                slot-pannel-title={
                  <VanText text="请选择${label}"></VanText>
                }
                slot-picker-top={
                  <>
                    <VanPickerActionSlot targetMethod="cancel">
                      <VanIconv name="left-arrow" icotype="only"></VanIconv>
                    </VanPickerActionSlot>
                    <VanPickerActionSlot targetMethod="confirm">
                    </VanPickerActionSlot>
                  </>
                }
                slot-picker-bottom={
                  <>
                    <VanPickerActionSlot targetMethod="cancel">
                      <VanButton
                        type="info_secondary"
                        size="normal"
                        text="取消"
                        squareroud="round"
                      ></VanButton>
                    </VanPickerActionSlot>
                    <VanPickerActionSlot targetMethod="confirm">
                      <VanButton
                        type="info"
                        size="normal"
                        text="确认"
                        squareroud="round"
                      ></VanButton>
                    </VanPickerActionSlot>
                  </>
                }>
            </VanPickerson>`;
  }
  return `<VanFieldinput value={$sync(${vModel})} placeholder="请输入" clearable={true}></VanFieldinput>`;
}
