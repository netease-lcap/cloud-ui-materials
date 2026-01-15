import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程信息
export function genFlProcessButton(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    // 局部变量
    permissionButtonMapVar: view.getVariableUniqueName('processButtonMap'), // 流程按钮Map
    buttonItemVar: view.getVariableUniqueName('processButtonItem'), // 选中的流程按钮
    approvalPolicy: view.getVariableUniqueName('processButtonApprovalPolicy'), // 流程按钮加签方式
    buttonBody: view.getVariableUniqueName('processButtonBody'), // 流程按钮弹窗body，名称勿改！！！
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
    buttonModalRef: view.getViewElementUniqueName('button_modal'), // 流程按钮触发弹窗
    buttonBackModalRef: view.getViewElementUniqueName('button_backModal'), // 流程按钮触发弹窗_撤回
    radiosAddSignRef: view.getViewElementUniqueName('radios_addSign'), // 加签单选组
    formButtonModalRef: view.getViewElementUniqueName('form_buttonModal'), // 弹窗中的表单
    revertFlowRadioRef: view.getViewElementUniqueName('radios_revert_flow'), // 撤回流转到单选组
    revertReSubmitRadioRef: view.getViewElementUniqueName('radios_revert_resubmit'), // 撤回重新提交到单选组
    revertFormRef: view.getViewElementUniqueName('form_revert'), // 撤回表单
    buttonToastRef: view.getViewElementUniqueName('button_toast'), // 回退提示
  };

  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.permissionButtonMapVar}: Map<string, ${structureNamespace}.TaskOperationPermission>; //流程按钮Map
    let ${nameGroup.buttonItemVar}: ${structureNamespace}.TaskOperationPermission; //选中的流程按钮
    let ${nameGroup.approvalPolicy}: string; //流程按钮加签方式
    let ${
      nameGroup.buttonBody
    }: { task: String, comment: String, userForOperate: String, policyForAddSign: String, nodeId: String, afterComplete: String }; //流程按钮弹窗body，名称勿改！！！


    function ${nameGroup.getTaskOperationPermissionsEvent}() {
      let ${nameGroup.permissionDetailsVar}
      let ${nameGroup.dataVar}
      ${nameGroup.dataVar} = ${logicNamespace}.getTaskOperationPermissions(taskId)
      if (nasl.util.HasValue(${nameGroup.dataVar})) {
        ${nameGroup.permissionDetailsVar} = nasl.util.ListFilter(${
    nameGroup.dataVar
  }, (item: ${structureNamespace}.TaskOperationPermission) => item.operationEnabled)
        if (nasl.util.HasValue(${nameGroup.permissionDetailsVar})) {
            ${nameGroup.permissionButtonMapVar} = nasl.util.ListToMap(${
    nameGroup.permissionDetailsVar
  }, (item: ${structureNamespace}.TaskOperationPermission) => item.name, (item: ${structureNamespace}.TaskOperationPermission) => item)
            if (nasl.util.HasValue(nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'addSign'))) {
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

    function ${nameGroup.openButtonModalEvent}(name: string) {
      let ${nameGroup.hasFormVar}: Boolean; //流程表单是否存在
      let ${nameGroup.validVar}: Boolean; //表单校验是否通过

      nasl.util.Clear(${nameGroup.buttonBody}, 'deep');
      ${nameGroup.buttonItemVar} = nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, name);

      (function match(_value) {
        if (name === 'withdraw' || name === 'revert') {
          if (name == 'revert' && ${nameGroup.buttonItemVar}.afterComplete == 'runtimeSpecify') {
            ${nameGroup.buttonBody}.afterComplete = 'reExecute'
          } else {
          }
          $refs.${nameGroup.buttonBackModalRef}.open();
          return;
        } else {
          nasl.js.block(\`'use JSBlock' \n // 流程表单验证，通过脚本获取流程表单校验结果
if (window.__processDetailFromMixinFormVm__ && window.__processDetailFromMixinFormVm__.validated) {
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
              if (name == 'submit') {
                ${nameGroup.submitButtonEvent}(name)
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
          if (${nameGroup.buttonItemVar}.name == 'addSign') {
            ${nameGroup.buttonBody}.policyForAddSign = 'CurrentNode'
          } else {
          }
          $refs.${nameGroup.buttonModalRef}.open()
        }
      })(name)
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
    }//获取转派或加签人员

    function ${nameGroup.submitButtonEvent}(name: string) {
      (function match(_value) {
        if (name === 'revert') {
          ${logicNamespace}.revertTask(taskId, ${nameGroup.buttonBody}.nodeId, ${nameGroup.buttonBody}.afterComplete, ${nameGroup.buttonBody}.comment)
        } else if (name === 'withdraw') {
          ${logicNamespace}.withdrawTask(taskId)
        } else if (name === 'addSign') {
          ${logicNamespace}.addSignTask(taskId, ${nameGroup.buttonBody}.userForOperate, ${nameGroup.buttonBody}.policyForAddSign)
        } else if (name === 'reassign') {
          ${logicNamespace}.reassignTask(taskId, ${nameGroup.buttonBody}.userForOperate)
        } else {
          nasl.js.block(\`'use JSBlock' \nconst operate = name+'Task';
const body = {
    taskId: state.taskId,
};
//审批同意、提交表单等操作时获取流程表单数据，接口调用也可使用流程逻辑
if (window.__processDetailFromMixinFormData__) {
    body.data = window.__processDetailFromMixinFormData__;
}
if(name !== 'submit') {
    body.comment = state.${nameGroup.buttonBody}.comment;
}
const res = await window.$processV2.setTaskInstance({
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
          ${nameGroup.buttonBody}.nodeId = nasl.util.ListHead(result).nodeId
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
  return `<ElFlex
    _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar})}
    direction="horizontal"
    mode="flex"
    alignment="center"
    justify="center"
    gutter={16}
    style="padding-top:24px;padding-bottom:24px;position:relative;left:0;top:0;font-size:14px;">
    <ElFlex
      direction="horizontal"
      mode="flex"
      alignment="center"
      justify="center"
      gutter={0}
      style="position:relative;left:0;top:0;">
      <ElButton
        style="margin-right:16px;padding-left:24px;padding-right:24px;position:relative;left:0;top:0;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;min-width:78px;"
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'submit'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'submit').displayText}
        type="primary"
        plain={false}
        link={false}
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('submit')
          }
        }>
      </ElButton>

      <ElButton
        style="margin-right:16px;padding-left:24px;padding-right:24px;position:relative;left:0;top:0;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;min-width:78px;"
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'approve'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'approve').displayText}
        type="primary"
        plain={false}
        link={false}
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('approve')
          }
        }>
      </ElButton>

      <ElButton
        style="margin-right:16px;padding-left:24px;padding-right:24px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;min-width:78px;"
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'reject'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'reject').displayText}
        type=""
        plain={false}
        link={false}
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('reject')
          }
        }>
      </ElButton>

      <ElButton
        style="margin-right:16px;padding-left:24px;padding-right:24px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;min-width:78px;"
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'reassign'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'reassign').displayText}
        type=""
        plain={false}
        link={false}
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('reassign')
          }
        }>
      </ElButton>

      <ElButton
        style="margin-right:16px;padding-left:24px;padding-right:24px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;min-width:78px;"
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'addSign'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'addSign').displayText}
        type=""
        plain={false}
        link={false}
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('addSign')
          }
        }>
      </ElButton>

      <ElButton
        style="margin-right:16px;padding-left:24px;padding-right:24px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;min-width:78px;"
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'withdraw'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'withdraw').displayText}
        type=""
        plain={false}
        link={false}
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('withdraw')
          }
        }>
      </ElButton>

      <ElButton
        style="margin-right:16px;padding-left:24px;padding-right:24px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;min-width:78px;"
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'revert'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'revert').displayText}
        type=""
        plain={false}
        link={false}
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('revert')
          }
        }>
      </ElButton>
    </ElFlex>

    <ElDialog
      ref="${nameGroup.buttonModalRef}"
      style="width:629px;font-size:14px;"
      destroyOnClose={true}
      slotHeader={
        <ElText text={${nameGroup.buttonItemVar}.displayText} style="font-size:16px;"></ElText>
      }
      slotFooter={
        <ElFlex
          direction="horizontal"
          mode="block"
          >
          <ElButton
            text="取 消"
            autoInsertSpace={true}
            onClick={
              function click(){
                $refs.${nameGroup.buttonModalRef}.close()
              }
            }
            style="width:81.49px;min-width:78px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;">
          </ElButton>
          <ElButton
            text="提 交"
            autoInsertSpace={true}
            type="primary"
            onClick={
              function click(){
                if ($refs.${nameGroup.formButtonModalRef}.validated().valid) {
                  ${nameGroup.submitButtonEvent}(${nameGroup.buttonItemVar}.name)
                } else {
                }
              }
            }
            style="width:81.49px;min-width:78px;padding-left:24px;padding-right:24px;margin-right:0px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;">
          </ElButton>
        </ElFlex>
      }
      >
      <ElForm
        ref="${nameGroup.formButtonModalRef}"
        labelPosition="top"
        requireAsteriskPosition="right"
        style="margin-top:10px; --custom-start: auto; min-width:350px;"
        >
        <ElFormInput
          _if={(${nameGroup.buttonItemVar}.name != 'reassign') && (${nameGroup.buttonItemVar}.name != 'addSign')}
          modelValue={$sync(${nameGroup.buttonBody}.comment)}
          type="textarea"
          isRequired={${nameGroup.buttonItemVar}.commentRequired}
          rules={[nasl.validation.filled()]}
          labelWidth=""
          style="width:100%;margin-bottom:3px;"
          slotLabel={
            <ElText text="审批意见"></ElText>
          }>
        </ElFormInput>
        <ElFormRadioGroup
          ref="${nameGroup.radiosAddSignRef}"
          _if={${nameGroup.buttonItemVar}.name == 'addSign'}
          modelValue={$sync(${nameGroup.buttonBody}.policyForAddSign)}
          isRequired={true}
          rules={[nasl.validation.filled()]}
          column={
            (function match(_value) {
              if (_value === true) {
                return 3
              } else if (_value === false) {
                return 1
              } else {
              }
            })(${nameGroup.approvalPolicy} == 'simple')
          }
          style="width:100%;margin-bottom:10px;"
          slotLabel={
            <ElText text="加签方式"></ElText>
          }
          >
          <ElRadio
            value="CurrentNode"
            border={true}
            size="default"
            style="padding-bottom:20px;padding-left:16px;height:58px;padding-right:16px;margin-right:0px;"
            >
            <ElFlex
              direction="vertical"
              gutter={0}
              mode="flex"
              justify="start"
              alignment="start"
              style="position:relative;left:0;top:0;margin-top:8px;"
              >
              <ElText
                text="当前节点加签"
                size="small"
                heightStretch="false"
                style="height:22px;font-weight:bold;">
              </ElText>
              <ElText
                text="和被加签人一起审批"
                size="small"
                heightStretch="false"
                style="height:22px;margin-top:-5px;">
              </ElText>
            </ElFlex>
          </ElRadio>
          <ElRadio
            _if={${nameGroup.approvalPolicy} == 'simple'}
            value="PreviousNode"
            border={true}
            size="default"
            style="padding-bottom:20px;padding-left:16px;padding-right:16px;height:58px;margin-right:0px;margin-left:6px;"
            >
            <ElFlex
              direction="vertical"
              gutter={0}
              mode="flex"
              justify="start"
              alignment="start"
              style="position:relative;left:0;top:0;margin-top:8px;"
              >
              <ElText
                text="前加签"
                size="small"
                heightStretch="false"
                style="height:22px;font-weight:bold;">
              </ElText>
              <ElText
                text="被加签人先处理"
                size="small"
                heightStretch="false"
                style="height:22px;margin-top:-5px;">
              </ElText>
            </ElFlex>
          </ElRadio>
          <ElRadio
            _if={${nameGroup.approvalPolicy} == 'simple'}
            value="NextNode"
            border={true}
            size="default"
            style="padding-bottom:20px;padding-left:16px;padding-right:16px;height:58px;margin-left:6px;"
            >
            <ElFlex
              direction="vertical"
              gutter={0}
              mode="flex"
              justify="start"
              alignment="start"
              style="position:relative;left:0;top:0;margin-top:8px;"
              >
              <ElText
                text="后加签并通过"
                size="small"
                heightStretch="false"
                style="height:22px;font-weight:bold;">
              </ElText>
              <ElText
                text="被加签人后处理"
                size="small"
                heightStretch="false"
                style="height:22px;margin-top:-5px;">
              </ElText>
            </ElFlex>
          </ElRadio>
        </ElFormRadioGroup>
        <ElFormSelect
          _if={(${nameGroup.buttonItemVar}.name == 'reassign') || (${nameGroup.buttonItemVar}.name == 'addSign')}
          modelValue={$sync(${nameGroup.buttonBody}.userForOperate)}
          isRequired={true}
          rules={[nasl.validation.filled()]}
          dataSource={${nameGroup.getUserEvent}(${nameGroup.buttonItemVar}.name, 1, 999, $refs.$ce.filterText)}
          valueField="userName"
          filterable={true}
          optionSlot={true}
          style="width:100%;"
          slotLabel={
            <>
              <ElText
                _if={${nameGroup.buttonItemVar}.name == 'reassign'}
                text="请选择人员">
              </ElText>
              <ElText
                _if={${nameGroup.buttonItemVar}.name == 'addSign'}
                text="加签人员">
              </ElText>
            </>
          }
          slotItem={(current) => <ElText
            text={(function match(_value) {
              if (_value === true) {
                return current.item.displayName + '（' + current.item.userName + '）'
              } else if (_value === false) {
                return current.item.userName
              } else {
              }
            })(nasl.util.HasValue(current.item.displayName))}
          ></ElText>}
        ></ElFormSelect>
      </ElForm>
    </ElDialog>
    <ElDialog
      ref="${nameGroup.buttonBackModalRef}"
      top="15vh"
      modal={true}
      style="width:595px;min-width:400px;"
      destroyOnClose={true}
      slotHeader={
        <ElText text={${nameGroup.buttonItemVar}.displayText}></ElText>
      }
      slotFooter={
        <ElFlex
          direction="horizontal"
          mode="block"
          >
          <ElButton
            text="取 消"
            autoInsertSpace={true}
            onClick={
              function click(){
                $refs.${nameGroup.buttonBackModalRef}.close()
              }
            }
            style="width:81.49px;min-width:78px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;">
          </ElButton>
          <ElButton
            text="确 定"
            autoInsertSpace={true}
            type="primary"
            onClick={
              function click(){
                if (${nameGroup.buttonItemVar}.name == 'revert') {
                  if ($refs.${nameGroup.revertFormRef}.validated().valid) {
                  } else {
                    if (nasl.util.HasValue(${nameGroup.buttonBody}.nodeId)) {
                    } else {
                      $refs.${nameGroup.buttonToastRef}.open();
                    }
                    return;
                  }
                }
                ${nameGroup.submitButtonEvent}(${nameGroup.buttonItemVar}.name)
              }
            }
            style="width:81.49px;min-width:78px;padding-left:24px;padding-right:24px;margin-right:0px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;">
          </ElButton>
        </ElFlex>
      }
      >
      <ElFlex
        _if={${nameGroup.buttonItemVar}.name == 'withdraw'}
        direction="horizontal"
        mode="flex"
        justify="start"
        alignment="center"
        gutter={0}
        wrap={true}
        style="text-align:left;width:100%;"
        >
        <ElText text="请确认是否"></ElText>
        <ElText text={${nameGroup.buttonItemVar}.displayText}></ElText>
        <ElText text="流程？"></ElText>
      </ElFlex>
      <ElForm
        ref="${nameGroup.revertFormRef}"
        _if={${nameGroup.buttonItemVar}.name == 'revert'}
        requireAsteriskPosition="right"
        inline={false}
        labelPosition="top"
        style="min-width:350px;"
        >
        <ElFormRadioGroup
          ref="${nameGroup.revertFlowRadioRef}"
          modelValue={$sync(${nameGroup.buttonBody}.nodeId)}
          isRequired={true}
          type="default"
          direction="horizontal"
          rules={[nasl.validation.filled()]}
          dataSource={${nameGroup.getBackNodesEvent}()}
          valueField="nodeId"
          column={null}
          style="margin-bottom:24px;width:546px;"
          slotItem={
            (current) => <ElText text={current.item.nodeName}></ElText>
          }
          slotLabel={
            <ElText text="流转到" display="inline"></ElText>
          }>
        </ElFormRadioGroup>
        <ElFormRadioGroup
          ref="${nameGroup.revertReSubmitRadioRef}"
          _if={${nameGroup.buttonItemVar}.afterComplete == 'runtimeSpecify'}
          modelValue={$sync(${nameGroup.buttonBody}.afterComplete)}
          rules={[nasl.validation.filled()]}
          isRequired={true}
          style="margin-bottom:24px;"
          slotLabel={
            <ElText text="重新提交后" display="inline"></ElText>
          }
          >
          <ElRadio value="reExecute">
            <ElText text="按流程顺序审批"></ElText>
          </ElRadio>
          <ElRadio value="jumpToSource">
            <ElText text="直接回到当前节点审批"></ElText>
          </ElRadio>
        </ElFormRadioGroup>
        <ElFormInput
          placeholder="请输入"
          modelValue={$sync(${nameGroup.buttonBody}.comment)}
          type="textarea"
          size="default"
          showPrepend={false}
          rules={[nasl.validation.filled()]}
          isRequired={${nameGroup.buttonItemVar}.commentRequired}
          labelWidth=""
          trigger="blur"
          style="margin-top:4px;width:100%;"
          slotLabel={
            <ElText text="审批意见"></ElText>
          }>
        </ElFormInput>
      </ElForm>
    </ElDialog>
    
    <ElMessage
      ref="${nameGroup.buttonToastRef}"
      type="error"
      duration={2000}
      plain={false}
    >
      <ElText text="无可流转节点，请联系管理员"></ElText>
    </ElMessage>
  </ElFlex>`;
}
