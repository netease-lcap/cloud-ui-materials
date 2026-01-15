import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程信息
export function genOwProcessButton(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    // permissionButtonMapVar: view.getVariableUniqueName('permissionButtonMap'), // 流程按钮Map
    // 局部变量
    permissionButtonListVar: view.getVariableUniqueName('processButtonList'), // 流程按钮list
    buttonItemVar: view.getVariableUniqueName('processButtonItem'), // 选中的流程按钮
    approvalPolicy: view.getVariableUniqueName('processButtonApprovalPolicy'), // 加签方式
    buttonBodyVar: view.getVariableUniqueName('processButtonBody'), // 流程弹窗body，名称勿改！！！
    // 页面逻辑
    getTaskOperationPermissionsEvent: view.getLogicUniqueName('getTaskOperationPermissions'), // 获取任务操作权限
    getSignOptionsEvent: view.getLogicUniqueName('getSignOptions'), // 获取加签方式
    openButtonModalEvent: view.getLogicUniqueName('openButtonModal'), // 流程按钮触发弹窗
    getUserEvent: view.getLogicUniqueName('getUser'), // 获取转派人员或加签人员
    submitButtonEvent: view.getLogicUniqueName('submitButton'), // 流程按钮提交
    getBackNodesEvent: view.getLogicUniqueName('getBackNodes'), // 获取可回退节点
    createdEvent: view.getLogicUniqueName('created'), // 页面创建事件
    // 页面逻辑下的局部变量
    // 获取任务操作权限
    permissionDetailsVar: view.getVariableUniqueName('permissionDetails'),
    dataVar: view.getVariableUniqueName('data'),
    // 获取任务操作权限
    taskInstVar: view.getVariableUniqueName('taskInst'),
    // 流程按钮触发弹窗
    hasFormVar: view.getVariableUniqueName('hasForm'), // 流程表单是否存在
    validVar: view.getVariableUniqueName('valid'), // 表单校验是否通过
    // ref
    buttonDialogRef: view.getViewElementUniqueName('button_dialog'), // 流程按钮弹窗
    buttonPopupRef: view.getViewElementUniqueName('button_popup'), // 流程弹窗
    buttonBackDialogRef: view.getViewElementUniqueName('button_backDialog'), // 流程按钮触发弹窗_撤回
    formButtonDialogRef: view.getViewElementUniqueName('form_buttonDialog'), // 弹窗中的表单
    formButtonPopupRef: view.getViewElementUniqueName('form_buttonPopup'), // 抽屉中的表单
    addSignRadioRef: view.getViewElementUniqueName('radio_group_addSign'), // 加签单选组
    revertFlowRadioRef: view.getViewElementUniqueName('radio_group_revert_flow'), // 撤回流转到单选组
    revertReSubmitRadioRef: view.getViewElementUniqueName('radio_group_revert_resubmit'), // 撤回重新提交到单选组
    buttonToastRef: view.getViewElementUniqueName('button_toast'), // 回退提示
    // 节点属性
    popoverPlacement: node.staticStyle?.startsWith?.('position: fixed;') ? 'top-start' : 'bottom-start',
  };

  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.permissionButtonListVar}: List<${structureNamespace}.TaskOperationPermission>; //流程按钮list
    let ${nameGroup.buttonItemVar}: ${structureNamespace}.TaskOperationPermission; //选中的流程按钮
    let ${nameGroup.approvalPolicy}: string; //流程按钮加签方式
    let ${
      nameGroup.buttonBodyVar
    }: { task: String, comment: String, userForOperate: List<String>, policyForAddSign: String, nodeId: String, afterComplete: String }; //流程按钮弹窗body，名称勿改！！！

    function ${nameGroup.getTaskOperationPermissionsEvent}() {
      let ${nameGroup.permissionDetailsVar}
      let ${nameGroup.dataVar}
      ${nameGroup.dataVar} = ${logicNamespace}.getTaskOperationPermissions(taskId)
      if (nasl.util.HasValue(${nameGroup.dataVar})) {
        ${nameGroup.permissionDetailsVar} = nasl.util.ListFilter(${
    nameGroup.dataVar
  }, (item: ${structureNamespace}.TaskOperationPermission) => item.operationEnabled)
        if (nasl.util.HasValue(${nameGroup.permissionDetailsVar})) {
          ${nameGroup.permissionButtonListVar} = ${nameGroup.permissionDetailsVar}
          if (nasl.util.HasValue(nasl.util.ListFind(${
            nameGroup.permissionButtonListVar
          },(item: ${structureNamespace}.TaskOperationPermission) => item.name == 'addSign'))) {
            ${nameGroup.approvalPolicy} = ${nameGroup.getSignOptionsEvent}()
          } else {
          }
        } else {
        }
      } else {
      }
    }//获取任务操作权限

    function ${nameGroup.getSignOptionsEvent}() {
      let ${nameGroup.taskInstVar}
      let result
      ${nameGroup.taskInstVar} = ${logicNamespace}.getTaskInfo(taskId)
      if (nasl.util.HasValue(${nameGroup.taskInstVar}, ${nameGroup.taskInstVar}.approvalPolicy)) {
          if (nasl.util.Contains(nasl.util.NewList<string>(['simple', 'parallel', 'sequence']), ${nameGroup.taskInstVar}.approvalPolicy)) {
              result = ${nameGroup.taskInstVar}.approvalPolicy
          } else {
          }
      } else {
      }
      return result
    }//获取加签方式

    function ${nameGroup.openButtonModalEvent}(index: Long) {
      let ${nameGroup.hasFormVar}: Boolean; //流程表单是否存在
      let ${nameGroup.validVar}: Boolean; //表单校验是否通过

      nasl.util.Clear(${nameGroup.buttonBodyVar}, 'deep');
      
      ${nameGroup.buttonItemVar} = nasl.util.Get(${nameGroup.permissionButtonListVar}, index);

      (function match(_value) {
        if (${nameGroup.buttonItemVar}.name === 'withdraw') {
          $refs.${nameGroup.buttonBackDialogRef}.open()
          return;
        } else {
          nasl.js.block(\`'use JSBlock' \n
//流程表单验证，通过脚本获取流程表单校验结果
if (window.__processDetailFromMixinFormVm__ && window.__processDetailFromMixinFormVm__.validate) {
    ${nameGroup.hasFormVar} = true;
    const validateResult = await window.__processDetailFromMixinFormVm__.validated();
    if (validateResult.valid) {
        ${nameGroup.validVar} = true;
    }
} else{
    ${nameGroup.hasFormVar} = false;
}\`)
          if (${nameGroup.hasFormVar}) {
            if (${nameGroup.validVar}) {
              /* 如果为submit按钮，直接走提交事件 */
              if (${nameGroup.buttonItemVar}.name == 'submit') {
                ${nameGroup.submitButtonEvent}('submit')
                return;
              } else {
              }
            } else {
              return;
            }
          } else {
            /* 无流程表单直接弹窗！ */
          }
          /* 加签单选组初始化 */
          if (${nameGroup.buttonItemVar}.name == 'addSign' || ${nameGroup.buttonItemVar}.name == 'revert') {
            if (${nameGroup.buttonItemVar}.name == 'addSign') {
              ${nameGroup.buttonBodyVar}.policyForAddSign = 'CurrentNode'
            } else {
            }
            if (${nameGroup.buttonItemVar}.name == 'revert' && ${nameGroup.buttonItemVar}.afterComplete == 'runtimeSpecify') {
              ${nameGroup.buttonBodyVar}.afterComplete = 'reExecute'
            } else {
            }
            nasl.util.Clear(${nameGroup.buttonBodyVar}.userForOperate, 'shallow');
            $refs.${nameGroup.buttonPopupRef}.open();
            return;
          } else {
          }
          nasl.util.Clear(${nameGroup.buttonBodyVar}.userForOperate, 'shallow');
          $refs.${nameGroup.buttonDialogRef}.open()
        }
      })(${nameGroup.buttonItemVar}.name)
    }//流程按钮触发弹窗

    function ${nameGroup.getUserEvent}(name: string, page: Long, size: Long, filterText: string) {
      let result
      (function match(_value) {
        if (name === 'reassign') {
          result = ${logicNamespace}.getUsersForReassign(taskId, page, size, filterText)
        } else if (name === 'addSign') {
          result = ${logicNamespace}.getUsersForAddSign(taskId, page, size, filterText)
        } else {
        }
      })(name)
      return result
    }//获取转派人员或加签人员

    function ${nameGroup.submitButtonEvent}(name: string) {
      (function match(_value) {
        if (name === 'revert') {
          ${logicNamespace}.revertTask(taskId, ${nameGroup.buttonBodyVar}.nodeId, ${nameGroup.buttonBodyVar}.afterComplete, ${nameGroup.buttonBodyVar}.comment)
        } else if (name === 'withdraw') {
          ${logicNamespace}.withdrawTask(taskId)
        } else if (name === 'addSign') {
          ${logicNamespace}.addSignTask(taskId, nasl.util.ListHead(${nameGroup.buttonBodyVar}.userForOperate), ${nameGroup.buttonBodyVar}.policyForAddSign)
        } else if (name === 'reassign') {
          ${logicNamespace}.reassignTask(taskId, nasl.util.ListHead(${nameGroup.buttonBodyVar}.userForOperate))
        } else {
          nasl.js.block(\`'use JSBlock' \n
const operate = name+'Task';
const body = {
    taskId: this.taskId,
};
//审批同意、提交表单等操作时获取流程表单数据，接口调用也可使用流程逻辑
if (window.__processDetailFromMixinFormData__) {
    body.data = window.__processDetailFromMixinFormData__;
}
if(name !== 'submit') {
    body.comment = this.${nameGroup.buttonBodyVar}.comment;
}
const res = await this.$processV2.setTaskInstance({
    path: {
        operate,
    },
    body,
});\`)
        }
      })(name)
      nasl.js.block(\`'use JSBlock' \n//刷新页面
window.location.reload();\`)
    }//流程按钮提交

    function ${nameGroup.getBackNodesEvent}() {
      let result;
      result = ${logicNamespace}.getBackNodes(taskId)
      if (nasl.util.HasValue(result)) {
          ${nameGroup.buttonBodyVar}.nodeId = nasl.util.ListHead(result).nodeId
      } else {
      }
      return result;
    }//获取可回退节点

    const $lifecycles = {
      onCreated: [
        function ${nameGroup.createdEvent}() {
          ${nameGroup.getTaskOperationPermissionsEvent}()
        }
      ]
    }

    return ${genTemplate(nameGroup, logicNamespace)}
  }`;
}

function genTemplate(nameGroup: Record<string, string>, logicNamespace: string) {
  return `<VanFlex gutter={0} wrap={false} justify="space-between" alignment="center" style="width:100%;height:auto;--custom-start: auto; padding: 2.13333vw 4.26667vw;">
    <VanPopoverCombination
        _if={${nameGroup.permissionButtonListVar}.length > 2}
        style=" --custom-start: auto; --van-popover-action-width: auto;"
        placement="${nameGroup.popoverPlacement}"
        dataSource={nasl.util.ListSlice(${nameGroup.permissionButtonListVar}, 2, ${nameGroup.permissionButtonListVar}.length)}
        slotReference={
          <VanText text="更多" style="--custom-start: auto; font-size: 3.73333vw;\nmargin-right: 4.26667vw;"></VanText>
        }
        slotAction={
          (current) => <VanText 
            style="margin-left:20px;margin-right:20px; --custom-start: auto; font-size: 3.73333vw;"
            text={current.action.displayText} 
            onClick={
              function click(){
                ${nameGroup.openButtonModalEvent}(current.index + 2)
              }
            }
          ></VanText>
        }>
      </VanPopoverCombination>
    <VanFlex wrap={false} justify="space-between" alignment="center" widthStretch="true" style=" --custom-start: auto; gap: 3.2vw;">
      <VanButton
        _if={${nameGroup.permissionButtonListVar}.length >= 2}
        text={nasl.util.Get(${nameGroup.permissionButtonListVar}, 1).displayText}
        round={true}
        style="width:100%; --custom-start: auto; height: 9.6vw;\npadding: 0 13.06667vw;\nfont-size: 3.73333vw;\nwhite-space: nowrap;\noverflow: hidden;\ntext-overflow: ellipsis;\nmax-width: calc(calc(80vw - 20px) / 2);"
        onClick={
          function click(){
            ${nameGroup.openButtonModalEvent}(1)
          }
        }>
      </VanButton>
      <VanButton
        _if={${nameGroup.permissionButtonListVar}.length >= 1}
        text={nasl.util.Get(${nameGroup.permissionButtonListVar}, 0).displayText}
        round={true}
        type="primary"
        style="width:100%; --custom-start: auto; height: 9.6vw;\npadding: 0 13.06667vw;\nfont-size: 3.73333vw;\nwhite-space: nowrap;\noverflow: hidden;\ntext-overflow: ellipsis;\nmax-width: calc(calc(80vw - 20px) / 2);"
        onClick={
          function click(){
            ${nameGroup.openButtonModalEvent}(0)
          }
        }>
      </VanButton>
    </VanFlex>

    <VanDialog
      ref="${nameGroup.buttonDialogRef}"
      style="padding-top:24px;padding-left:24px;padding-right:24px;padding-bottom:0px; --custom-start: auto; --van-dialog-header-padding-top: 0;"
      showCancelButton={true}
      destroyOnClose={true}
      closeOnClickOverlay={true}
      onCancel={
        function cancel(){
          $refs.${nameGroup.buttonDialogRef}.close()
        }
      }
      onConfirm={
        function confirm(){
          if ($refs.${nameGroup.formButtonDialogRef}.validated().valid) {
            ${nameGroup.submitButtonEvent}(${nameGroup.buttonItemVar}.name)
          } else {
          }
        }
      }
      slotTitle={
        <VanText
          style="--custom-start: auto; font-size: 3.2vw;\nfont-weight: 500;\nline-height: 6.4vw;"
          text={${nameGroup.buttonItemVar}.displayText}
        ></VanText>
      }>
        <VanFlex mode="block" gutter={0}>
          <VanForm ref="${nameGroup.formButtonDialogRef}" style="margin-bottom: 14px;">
            <VanFormField
              _if={${nameGroup.buttonItemVar}.name != 'reassign' && ${nameGroup.buttonItemVar}.name != 'addSign' && ${nameGroup.buttonItemVar}.commentRequired}
              style=" --custom-start: auto; border-radius: 1.06667vw;\nborder: 1px solid #DADEE8;\nmin-height:25vw;"
              placeholder="请输入审批意见"
              modelValue={$sync(${nameGroup.buttonBodyVar}.comment)}
              required={true}
              rules={[nasl.validation.filled()]}
              type="textarea"
              labelAlign="top"
              slotLabel={
                <VanText text="审批意见"></VanText>
              }>
            </VanFormField>
            <VanFormField
              _if={${nameGroup.buttonItemVar}.name != 'reassign' && ${nameGroup.buttonItemVar}.name != 'addSign' && !(${nameGroup.buttonItemVar}.commentRequired)}
              style=" --custom-start: auto; border-radius: 1.06667vw;\nborder: 1px solid #DADEE8;\nmin-height:25vw;"
              placeholder="请输入审批意见"
              modelValue={$sync(${nameGroup.buttonBodyVar}.comment)}
              type="textarea"
              labelAlign="top"
              slotLabel={
                <VanText text="审批意见"></VanText>
              }>
            </VanFormField>
            <VanFormPicker
              _if={${nameGroup.buttonItemVar}.name == 'reassign'}
              modelValue={$sync(${nameGroup.buttonBodyVar}.userForOperate)}
              dataSource={${nameGroup.getUserEvent}(${nameGroup.buttonItemVar}.name, 1, 999, elements.$ce.filterText)}
              placeholder="请选择转交人"
              valueField="userName"
              filterable={true}
              optionSlot={true}
              colon={false}
              required={true}
              rules={[nasl.validation.filled()]}
              slotTitle={
                <VanText text="转交人"></VanText>
              }
              slotLabel={
                <VanText text="转交人"></VanText>
              }
              slotItem={
                (current) => <VanTextEllipsis content={(function match(_value) {
                    if (_value === true) {
                      return current.item.displayName + '（' + current.item.userName + '）'
                    } else if (_value === false) {
                      return current.item.userName
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.displayName))}
                  style="font-size:16px;">
                </VanTextEllipsis>
              }>
            </VanFormPicker>
          </VanForm>
        </VanFlex>
    </VanDialog>
    <VanDialog
      ref="${nameGroup.buttonBackDialogRef}"
      style="padding-top:24px;padding-left:24px;padding-right:24px;padding-bottom:0px; --custom-start: auto; --van-dialog-header-padding-top: 0;"
      showCancelButton={true}
      destroyOnClose={true}
      closeOnClickOverlay={true}
      onCancel={
        function cancel(){
          $refs.${nameGroup.buttonBackDialogRef}.close()
        }
      }
      onConfirm={
        function confirm(){
          ${nameGroup.submitButtonEvent}(${nameGroup.buttonItemVar}.name)
        }
      }
      slotTitle={
        <VanText
          style="--custom-start: auto; font-size: 3.2vw;\nfont-weight: 500;\nline-height: 6.4vw;"
          text={${nameGroup.buttonItemVar}.displayText}
        ></VanText>
      }>
        <VanFlex wrap={true} justify="center" alignment="center" style=" --custom-start: auto; padding-top: 3.46666vw;\npadding-bottom: 5.46666vw;">
          <VanText text={'请确定是否' + ${nameGroup.buttonItemVar}.displayText + '流程？'}></VanText>
        </VanFlex>
    </VanDialog>

    <VanPopup
      ref="${nameGroup.buttonPopupRef}"
      style="width:100%;padding-top:0px;padding-left:0px;padding-right:0px;padding-bottom:0px;"
      position="bottom"
      round={true}
      closeable={true}>
      <VanFlex style="border-style:solid;border-bottom-color:#d9d9d9;border-top-width:0px;border-left-width:0px;border-right-width:0px;border-bottom-width:1px; --custom-start: auto; font-size: 4.26667vw;\nfont-weight: 500;\npadding: 4.2vw 4.26667vw;">
        <VanText text={${nameGroup.buttonItemVar}.displayText}></VanText>
      </VanFlex>

      <VanFlex style=" --custom-start: auto; max-height: 60vh;\noverflow: auto;">
        <VanForm ref="${nameGroup.formButtonPopupRef}" style="width:100%; --custom-start: auto; font-size: 4.26667vw;\nmargin-top: 4.46667vw;">
          <VanFormRadioGroup 
            ref="${nameGroup.addSignRadioRef}"
            style="width:100%;"
            _if={${nameGroup.buttonItemVar}.name == 'addSign'}
            modelValue={$sync(${nameGroup.buttonBodyVar}.policyForAddSign)}
            required={true}
            labelAlign="top"
            rules={[nasl.validation.filled()]}
            slotLabel={
              <VanText text="加签方式" style="--custom-start: auto; font-size: 3.7333vw;"></VanText>
            }>
            <VanRadio 
              name="CurrentNode"
              labelPosition="right"
              checkedColor="#1989fa"
              style="text-align:left;border-top-left-radius:6px;border-bottom-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;background-color:#F7F8FA;min-width:72px; --custom-start: auto; padding: 3.2vw 4.26667vw;\nflex-direction: row-reverse;\njustify-content: space-between;\nmargin-bottom: 2.1vw;"
            >
              <VanFlex mode="block">
                <VanText text="当前节点加签" style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;\ndisplay: block;"></VanText>
                <VanText text="和被加签人一起审批" style="color:#999999;--custom-start: auto; font-size: 3.7333vw;"></VanText>
              </VanFlex>
            </VanRadio>

            <VanRadio 
              _if={${nameGroup.approvalPolicy} == 'simple'}
              name="PreviousNode"
              labelPosition="right"
              checkedColor="#1989fa"
              style="text-align:left;border-top-left-radius:6px;border-bottom-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;background-color:#F7F8FA;min-width:72px; --custom-start: auto; padding: 3.2vw 4.26667vw;\nflex-direction: row-reverse;\njustify-content: space-between;\nmargin-bottom: 2.1vw;"
            >
              <VanFlex mode="block">
                <VanText text="前加签" style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;\ndisplay: block;"></VanText>
                <VanText text="被加签人先处理" style="color:#999999;--custom-start: auto; font-size: 3.7333vw;"></VanText>
              </VanFlex>
            </VanRadio>

            <VanRadio
              _if={${nameGroup.approvalPolicy} == 'simple'}
              name="NextNode"
              labelPosition="right"
              checkedColor="#1989fa"
              style="text-align:left;border-top-left-radius:6px;border-bottom-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;background-color:#F7F8FA;min-width:72px; --custom-start: auto; padding: 3.2vw 4.26667vw;\nflex-direction: row-reverse;\njustify-content: space-between;\nmargin-bottom: 2.1vw;"
            >
              <VanFlex mode="block">
                <VanText text="后加签并通过" style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;\ndisplay: block;"></VanText>
                <VanText text="被加签人后处理" style="color:#999999;--custom-start: auto; font-size: 3.7333vw;"></VanText>
              </VanFlex>
            </VanRadio>
          </VanFormRadioGroup>

          <VanFormPicker
            _if={${nameGroup.buttonItemVar}.name == 'addSign'}
            style="width:100%;"
            modelValue={$sync(${nameGroup.buttonBodyVar}.userForOperate)}
            dataSource={${nameGroup.getUserEvent}(${nameGroup.buttonItemVar}.name, 1, 999, elements.$ce.filterText)}
            placeholder="请选择"
            valueField="userName"
            required={true}
            rules={[nasl.validation.filled()]}
            filterable={true}
            optionSlot={true}
            slotTitle={
              <VanText text="加签人员"></VanText>
            }
            slotLabel={
              <VanText text="加签人员"></VanText>
            }
            slotItem={
              (current) => <VanTextEllipsis content={(function match(_value) {
                  if (_value === true) {
                    return current.item.displayName + '（' + current.item.userName + '）'
                  } else if (_value === false) {
                    return current.item.userName
                  } else {
                  }
                })(nasl.util.HasValue(current.item.displayName))}
                style="font-size:16px;">
              </VanTextEllipsis>
            }
          ></VanFormPicker>

          <VanFormRadioGroup
            ref="${nameGroup.revertFlowRadioRef}"
            style="width:100%;"
            _if={${nameGroup.buttonItemVar}.name == 'revert'}
            dataSource={${logicNamespace}.getBackNodes(taskId)}
            modelValue={$sync(${nameGroup.buttonBodyVar}.nodeId)}
            textField="nodeName"
            valueField="nodeId"
            labelAlign="top"
            direction="vertical"
            required={true}
            rules={[nasl.validation.filled()]}
            filterable={true}
            optionSlot={true}
            slotLabel={
              <VanText text="流转到"></VanText>
            }
            slotItem={
              (current) => <VanText style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;" text={current.item.nodeName}></VanText>
            }
          ></VanFormRadioGroup>

          <VanFormRadioGroup 
            ref="${nameGroup.revertReSubmitRadioRef}"
            style="width:100%;"
            _if={${nameGroup.buttonItemVar}.afterComplete == 'runtimeSpecify'}
            modelValue={$sync(${nameGroup.buttonBodyVar}.afterComplete)}
            required={true}
            labelAlign="top"
            rules={[nasl.validation.filled()]}
            slotLabel={
              <VanText text="重新提交后" style="--custom-start: auto; font-size: 3.7333vw;"></VanText>
            }>
            <VanRadio 
              name="reExecute"
              labelPosition="right"
              checkedColor="#1989fa"
              style="text-align:left;border-top-left-radius:6px;border-top-right-radius:6px;background-color:#F7F8FA;--custom-start: auto; padding: 3.2vw 4.26667vw;\nflex-direction: row-reverse;\njustify-content: space-between;"
            >
              <VanText text="按流程顺序审批" style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;"></VanText>
            </VanRadio>

            <VanRadio 
              name="jumpToSource"
              labelPosition="right"
              checkedColor="#1989fa"
              style="text-align:left;border-bottom-left-radius:6px;border-bottom-right-radius:6px;background-color:#F7F8FA;--custom-start: auto; padding: 3.2vw 4.26667vw;\nflex-direction: row-reverse;\njustify-content: space-between;"
            >
              <VanText text="直接回到当前节点审批" style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;"></VanText>
            </VanRadio>
          </VanFormRadioGroup>
          <VanFormField
            style="width:100%;background-color:#F7F8FA; --custom-start: auto; padding: 8px;\nborder-radius: 6px;\nmin-height:25vw;"
            _if={${nameGroup.buttonItemVar}.name == 'revert' && ${nameGroup.buttonItemVar}.commentRequired}
            placeholder="请输入审批意见"
            modelValue={$sync(${nameGroup.buttonBodyVar}.comment)}
            required={true}
            rules={[nasl.validation.filled()]}
            type="textarea"
            labelAlign="top"
            slotLabel={
              <VanText text="审批意见"></VanText>
            }>
          </VanFormField>
          <VanFormField
            style="width:100%;background-color:#F7F8FA; --custom-start: auto; padding: 8px;\nborder-radius: 6px;\nmin-height:25vw;"
            _if={${nameGroup.buttonItemVar}.name == 'revert' && !(${nameGroup.buttonItemVar}.commentRequired)}
            placeholder="请输入审批意见"
            modelValue={$sync(${nameGroup.buttonBodyVar}.comment)}
            type="textarea"
            labelAlign="top"
            slotLabel={
              <VanText text="审批意见"></VanText>
            }>
          </VanFormField>
        </VanForm>
      </VanFlex>
      <VanFlex justify="center" alignment="center" style=" --custom-start: auto; padding: 8px 0;">
        <VanButton 
          style=" --custom-start: auto; height: 9.6vw;\npadding: 0 13.06667vw;\nfont-size: 3.73333vw;"
          text="取消"
          round={true}
          onClick={
            function click(){
              $refs.${nameGroup.buttonPopupRef}.close()
            }
          }>
        </VanButton>
        <VanButton 
          style=" --custom-start: auto; height: 9.6vw;\npadding: 0 13.06667vw;\nfont-size: 3.73333vw;"
          text="确定"
          type="primary"
          round={true}
          onClick={
            function click(){
              if ($refs.${nameGroup.formButtonPopupRef}.validated().valid) {
                ${nameGroup.submitButtonEvent}(${nameGroup.buttonItemVar}.name)
              } else {
                if (nasl.util.HasValue(${nameGroup.buttonBodyVar}.nodeId)) {
                } else {
                  $refs.${nameGroup.buttonToastRef}.open();
                  nasl.js.block(\`'use JSBlock' \n
//提高弹出消息的显示层级
const elements = document.querySelectorAll('.van-toast-group');
elements.forEach(element => {
  element.style.zIndex = '9999';
});
\`);
                  }
                }
              }
          }>
        </VanButton> 
      </VanFlex>
    </VanPopup>
    
    <VanToast
      ref="${nameGroup.buttonToastRef}"
      icon="close"
      type="fail"
      slotMessage={
        <VanText text="无可流转节点，请联系管理员"></VanText>
      }
    ></VanToast>
  </VanFlex>`;
}
