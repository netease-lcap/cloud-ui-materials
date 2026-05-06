export function view() {
    let delEntity2: app.dataSources.defaultDS.entities.Entity2;
    return (
      <VanLinearLayout direction="horizontal" wrap={true}>
        <VanTabs type="line" style="width: 100%">
          <VanTab slotTitle={
            <VanText text="表单信息"></VanText>
          }>
            <VanForm
              ref="form_1"
              id="dynamicRenderContainer"
              processPrefix="Process1"
            >
              <VanField
                drole="other"
                slotTitle={
                  <VanText text="创建时间"></VanText>
                }
                slotInput={
                  <VanLinearLayout
                    style="width:100%;"
                    direction="horizontal">
                    <VanDatetimePicker type="datetime" value={$sync(Process1.data.createdTime)} title="请选择创建时间" labelField="" inputAlign="left"></VanDatetimePicker>
                  </VanLinearLayout>
                }></VanField>
              <VanField
                drole="other"
                slotTitle={
                  <VanText text="更新时间"></VanText>
                }
                slotInput={
                  <VanLinearLayout
                    style="width:100%;"
                    direction="horizontal">
                    <VanDatetimePicker type="datetime" value={$sync(Process1.data.updatedTime)} title="请选择更新时间" labelField="" inputAlign="left"></VanDatetimePicker>
                  </VanLinearLayout>
                }></VanField>
              <VanField
                drole="other"
                slotTitle={
                  <VanText text="创建者"></VanText>
                }
                slotInput={
                  <VanLinearLayout
                    style="width:100%;"
                    direction="horizontal">
                    <VanFieldinput value={$sync(Process1.data.createdBy)} placeholder="请输入创建者"></VanFieldinput>
                  </VanLinearLayout>
                }></VanField>
              <VanField
                drole="other"
                slotTitle={
                  <VanText text="更新者"></VanText>
                }
                slotInput={
                  <VanLinearLayout
                    style="width:100%;"
                    direction="horizontal">
                    <VanFieldinput value={$sync(Process1.data.updatedBy)} placeholder="请输入更新者"></VanFieldinput>
                  </VanLinearLayout>
                }></VanField>
              <VanField
                drole="other"
                slotTitle={
                  <VanText text="name"></VanText>
                }
                slotInput={
                  <VanLinearLayout
                    style="width:100%;"
                    direction="horizontal">
                    <VanFieldinput value={$sync(Process1.data.name)} placeholder="请输入name"></VanFieldinput>
                  </VanLinearLayout>
                }></VanField>
              <VanField
                drole="other"
                slotTitle={
                  <VanText text="detail"></VanText>
                }
                slotInput={
                  <VanLinearLayout
                    style="width:100%;"
                    direction="horizontal">
                    <VanFieldinput value={$sync(Process1.data.detail)} placeholder="请输入detail"></VanFieldinput>
                  </VanLinearLayout>
                }></VanField>
              <VanField
                drole="other"
                labelLayout="block"
                slotTitle={
                  <VanText text="子表单Entity2"></VanText>
                }
                slotInput={
                  <VanLinearLayout direction="horizontal">
                    <VanLinearLayout direction="horizontal" wrap={true} gap="normal">
                      <VanButton
                        type="info"
                        size="small"
                        text="添加"
                        squareroud="square"
                        onClick={
                          function addInfo(event) {
                            nasl.util.Add(Process1.relationData, nasl.util.NewEntity<app.dataSources.defaultDS.entities.Entity2>({ id: undefined, createdTime: undefined, updatedTime: undefined, createdBy: undefined, updatedBy: undefined, supllierId: undefined, name: undefined, description: undefined }))
                            return;
                          }
                        }>
                      </VanButton>
                      <VanValidator rules={[]}>
                        <VanForComponents
                          colnum={1}
                          dataSource={$sync(Process1.relationData)}
                          dataSourceWatch={[]}
                          equalWidth={true}
                          style="width: 100%;"
                          slotItem={
                            (current) => <VanCollapse value={undefined}>
                              <VanCollapseItem isLink={true}
                                slotTitle={
                                  <VanLinearLayout justify="space-between" wrap={true}>
                                    <VanLinearLayout wrap={true}>
                                      <VanText text={`数据${current.index + 1}`}></VanText>
                                    </VanLinearLayout>
                                    <VanLinearLayout wrap={true}>
                                      <VanLink
                                        text="删除"
                                        onClick={
                                          function deleteInfo(event) {
                                            delEntity2 = current.item
                                            $refs.delEntity2Dialog_1.openModal()
                                            return;
                                          }
                                        }>
                                      </VanLink>
                                    </VanLinearLayout>
                                  </VanLinearLayout>
                                }
                                slotDefault={
                                  <VanForm>
                                    <VanField
                                      required={true}
                                      rules={[nasl.validation.required()]}
                                      drole="other"
                                      slotTitle={
                                        <VanText text="name"></VanText>
                                      }
                                      slotInput={
                                        <VanFieldinput value={$sync(current.item.name)} placeholder="请输入" clearable={true}></VanFieldinput>
                                      }></VanField>
                                    <VanField
                                      required={true}
                                      rules={[nasl.validation.required()]}
                                      drole="other"
                                      slotTitle={
                                        <VanText text="description"></VanText>
                                      }
                                      slotInput={
                                        <VanFieldinput value={$sync(current.item.description)} placeholder="请输入" clearable={true}></VanFieldinput>
                                      }></VanField>
                                  </VanForm>
                                }>
                              </VanCollapseItem>
                            </VanCollapse>
                          }>
                          <VanRow gutter="0" vusionDisabledCopy={true} vusionDisabledAddslot={true} vusionDisabledCut={true}>
                            <VanCol span={24} vusionDisabledCopy={true} vusionDisabledCut={true}></VanCol>
                          </VanRow>
                        </VanForComponents>
                      </VanValidator>
                    </VanLinearLayout>
                  </VanLinearLayout>
                }></VanField>
            </VanForm>
            <VanDialog
              ref="delEntity2Dialog_1"
              safeAreaInsetBottom={true}
              slotFooter={
                <VanLinearLayout type="flex" style="width: 100%;">
                  <VanButton
                    size="large"
                    nativeType="button"
                    style="-webkit-box-flex: 1;flex: 1;margin: 0;border:0;--custom-start: auto; font-size: 4.26667vw;"
                    text="取消"
                    onClick={
                      function deleteInfo(event) {
                        $refs.delEntity2Dialog_1.closeModal()
                      }
                    }>
                  </VanButton>
                  <VanButton
                    size="large"
                    nativeType="button"
                    style="-webkit-box-flex: 1;flex: 1;margin: 0;border:0;
                    color: var(--van-dialog-confirm-button-text-color);border-left: 1px solid var(--van-border-color);border-top-left-radius: 0;border-bottom-left-radius:0;--custom-start: auto; font-size: 4.26667vw;"
                    text="确认"
                    onClick={
                      function deleteInfo(event) {
                        nasl.util.Remove(Process1.relationData, delEntity2)
                        $refs.delEntity2Dialog_1.closeModal()
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
                      _color='#fff'
                      _background-color='#ffaf0f'
                      style="font-size:48px;border-top-left-radius:24px;border-bottom-left-radius:24px;border-top-right-radius:24px;border-bottom-right-radius:24px;">
                      <VanText text="图标"></VanText>
                    </VanIconv>
                  </VanCol>
                  <VanCol span={16} style="text-align: left;">
                    <VanText text="请确认是否删除？" display="block" style="text-align: left; font-size: 18px; font-weight: bold;"></VanText>
                    <VanText text="删除后将无法恢复，请谨慎操作" style="text-align: left; font-size: 14px;"></VanText>
                  </VanCol>
                </VanRow>
              </Div>
            </VanDialog>
          </VanTab>
          <VanTab slotTitle={
            <VanText text="流程信息"></VanText>
          }>
            <OwProcessInfo auto-gen-process-block="ow-process-info"></OwProcessInfo>
          </VanTab>
          <VanTab slotTitle={
            <VanText text="审批记录"></VanText>
          }>
            <OwProcessRecord auto-gen-process-block="ow-process-record-table"></OwProcessRecord>
          </VanTab>
        </VanTabs>
        <OwProcessButton auto-gen-process-block="ow-process-button" style="position: fixed; left: 0px; bottom: 0px; z-index: 10;">
        </OwProcessButton>
      </VanLinearLayout>)
  }
