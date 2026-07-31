import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程记录的表格
export function genOwProcessRecordTable(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // 查询流程记录
    isUnfold: view.getVariableUniqueName('isUnfold'), // 预测节点是否展开
    currentHandler: view.getVariableUniqueName('currentHandler'), // 当前处理人
  };

  // 流程需要使用页面输入参数'taskId'，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.isUnfold}: Boolean = false;
    let ${nameGroup.currentHandler}: String; //当前处理人

    function ${nameGroup.getRecordsEvent}() {
      let proInstRecordInfo
      let currentProccessInfo
      let PredictionInfo
      let tableData: List<{ data: ${structureNamespace}.ProcInstRecord, type: String, pendingCalculation: Boolean }>
      let result
      if (nasl.util.HasValue(taskId)) {
        currentProccessInfo = ${logicNamespace}.getProcInstInfo(taskId)
        proInstRecordInfo = ${logicNamespace}.getProcInstRecords(taskId, 1, 1000)
        nasl.util.ListReverse(proInstRecordInfo.list)
        nasl.util.AddAll(tableData, nasl.util.ListTransform(proInstRecordInfo.list, (item) => ({ data: item, type: "History", pendingCalculation: false })))
        nasl.util.AddAll(tableData, nasl.util.ListTransform(currentProccessInfo.procInstCurrNodes, (item) => ({ data: new ${structureNamespace}.ProcInstRecord({ nodeTitle: item.currNodeTitle, nodeName: item.currNodeName, recordUser: new ${structureNamespace}.ProcessUser({ userName: nasl.util.Join(nasl.util.ListTransform(item.currNodeParticipants, (item1) => item1.userName), ","), displayName: nasl.util.Join(nasl.util.ListTransform(item.currNodeParticipants, (item1) => (function match(_value) { if (_value === true) { return item1.displayName } else if (_value === false) { return item1.userName } else { } })(nasl.util.HasValue(item1.displayName))), ",") }), recordCreatedTime: null, nodeOperationComment: null, nodeOperation: null, nodeOperationDisplayText: "审批中", procInstId: currentProccessInfo.procInstId }), type: "Current", pendingCalculation: false })))
        PredictionInfo = ${logicNamespace}.getProcInstPredictionListByInstId(currentProccessInfo.procInstId)
        if (PredictionInfo.length > 0) {
          nasl.util.Add(tableData, { data: new ${structureNamespace}.ProcInstRecord({ nodeTitle: null, nodeName: null, recordUser: null, recordCreatedTime: null, nodeOperationComment: null, nodeOperation: null, nodeOperationDisplayText: null, procInstId: currentProccessInfo.procInstId }), type: "ProcInstText", pendingCalculation: false })
        } else {
        }
        nasl.util.AddAll(tableData, nasl.util.ListTransform(PredictionInfo, (item) => ({ data: new ${structureNamespace}.ProcInstRecord({ nodeTitle: item.nodeTitle, nodeName: item.nodeName, recordUser: new ${structureNamespace}.ProcessUser({ userName: nasl.util.Join(nasl.util.ListTransform(item.predictedUsers, (item1) => item1.userName), ","), displayName: nasl.util.Join(nasl.util.ListTransform(item.predictedUsers, (item1) => (function match(_value) { if (_value === true) { return item1.displayName } else if (_value === false) { return item1.userName } else { } })(nasl.util.HasValue(item1.displayName))), ",") }), recordCreatedTime: null, nodeOperationComment: null, nodeOperation: null, nodeOperationDisplayText: null, procInstId: currentProccessInfo.procInstId }), type: "Prediction", pendingCalculation: item.pendingCalculation })))
        result = tableData
      } else {
      }
      return result
    }//查询流程记录

    return ${genTemplate(nameGroup)}
  }`;
}

function genTemplate(nameGroup: Record<string, string>) {
  return `<VanLinearLayout mode="block">
  <VanListView
    pageable=""
    vusionDisabledAddslot={true}
    pageSize={5}
    dataSource={${nameGroup.getRecordsEvent}()}
    hiddenempty={true}
    scrollTarget="parent"
    style="border-color:#c06161;borderTopColor:#c06161;borderBottomColor:#c06161;borderLeftColor:#c06161;borderRightColor:#c04e4e;height:auto;"
    slotNext={
      <VanText text="下一页"></VanText>
    }
    slotPrev={
      <VanText text="上一页"></VanText>
    }
    slotEmpty={
      <VanLinearLayout direction="horizontal" wrap={true} style="--custom-start: auto; padding: 2.93337vw  1.06667vw;">
        <VanText text="暂无数据"></VanText>
      </VanLinearLayout>
    }
    slotItem={
      (current) => <VanLinearLayout direction="horizontal" wrap={true} style="--custom-start: auto; padding: 0 4.26667vw;">
        <VanLinearLayout
          _if={(current.item.type != "ProcInstText") && ((current.item.type == "History") || (current.item.type == "Current") || ${nameGroup.isUnfold})}
          direction="horizontal" gap="normal" mode="block"
          style="--van-space-base:0px;--custom-start: auto; border: .5px solid #E5E5E5;
box-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);
border-radius: 1.06667vw;
background: #fff;
padding: 3.2vw 4.26667vw;
font-size: 3.73333vw;
margin-bottom: 2.13333vw;">
          <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" widthStretch="false" style="width:100%;">
            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="text-align:left;--custom-start: auto; width: 18.66667vw;
margin-right: 2.13333vw;">
              <VanText text="流程节点：" style="color:#999;text-align:right;--custom-start: auto; font-size: 100%;
width: 18.66667vw;"></VanText>
            </VanLinearLayout>
            <VanText
              style="color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"
              overflow="ellipsis" widthStretch="false"
              text={(function match(_value) {
                if (_value === true) {
                  return current.item.data.nodeTitle
                } else if (_value === false) {
                  return '-'
                } else {
                }
              })(nasl.util.HasValue(current.item.data.nodeTitle))}>
            </VanText>
            <VanText
              _if={current.item.type == "Prediction"}
              overflow="ellipsis" widthStretch="false"
              text="预测"
              style="color:#999999;text-align:left;margin-left:10px;padding-left:8px;padding-right:8px;padding-top:2px;padding-bottom:2px;background-color:#F2F3F5;border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px; --custom-start: auto; font-size: 100%;">
            </VanText>
          </VanLinearLayout>

          <VanLinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" widthStretch="false" style="width:100%;--custom-start: auto; margin-top: 2.13333vw;">
            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="text-align:left;--custom-start: auto; width: 18.66667vw;
margin-right: 2.13333vw;">
              <VanText text="处理人：" style="color:#999;text-align:right;--custom-start: auto; font-size: 100%;
width: 18.66667vw;"></VanText>
            </VanLinearLayout>
            <VanText
              _if={!(current.item.pendingCalculation)}
              onClick={function click(event) {
                if (nasl.util.HasValue(current.item.data.recordUser.displayName)) {
                  if (nasl.util.Split(current.item.data.recordUser.displayName, ",", true).length > 3) {
                    ${nameGroup.currentHandler} = current.item.data.recordUser.displayName
                    $refs.dialog_1.openModal()
                  } else {
                  }
                } else {
                  if (nasl.util.HasValue(current.item.data.recordUser.userName)) {
                    if (nasl.util.Split(current.item.data.recordUser.userName, ",", true).length > 3) {
                      ${nameGroup.currentHandler} = current.item.data.recordUser.userName
                      $refs.dialog_1.openModal()
                    } else {
                    }
                  } else {
                  }
                }
              }}
              style="color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"
              overflow="ellipsis" widthStretch="true"
              text={(function match(_value) {
                if (_value === true) {
                  return current.item.data.recordUser.displayName
                } else if (_value === false) {
                  return (function match(_value) {
                    if (_value === true) {
                      return current.item.data.recordUser.userName
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.data.recordUser.userName))
                } else {
                }
              })(nasl.util.HasValue(current.item.data.recordUser.displayName))}>
            </VanText>
            <VanText
              _if={current.item.pendingCalculation}
              overflow="ellipsis" widthStretch="false"
              text="待系统计算"
              style="color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;">
            </VanText>
          </VanLinearLayout>

          <VanLinearLayout
            _if={current.item.type != "Prediction"}
            direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" widthStretch="false" style="width:100%;--custom-start: auto; margin-top: 2.13333vw;">
            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="text-align:left;--custom-start: auto; width: 18.66667vw;
margin-right: 2.13333vw;">
              <VanText text="处理时间：" style="color:#999;text-align:right;--custom-start: auto; font-size: 100%;
width: 18.66667vw;"></VanText>
            </VanLinearLayout>
            <VanText
              style="color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"
              overflow="ellipsis" widthStretch="true"
              text={(function match(_value) {
                if (_value === true) {
                  return nasl.util.FormatDateTime(current.item.data.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                } else if (_value === false) {
                  return '-'
                } else {
                }
              })(nasl.util.HasValue(current.item.data.recordCreatedTime))}>
            </VanText>
          </VanLinearLayout>

          <VanLinearLayout
            _if={current.item.type != "Prediction"}
            direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" widthStretch="false" style="width:100%;--custom-start: auto; margin-top: 2.13333vw;">
            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="text-align:left;--custom-start: auto; width: 18.66667vw;
margin-right: 2.13333vw;">
              <VanText text="审批操作：" style="color:#999;text-align:right;--custom-start: auto; font-size: 100%;
width: 18.66667vw;"></VanText>
            </VanLinearLayout>
            <VanText
              style="color:#333333;width:auto;text-align:left;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;--custom-start: auto; font-size: 100%;
padding:0 2.13vw;
max-width:calc(100% - 22vw);"
              overflow="ellipsis"
              widthStretch="false"
              text={current.item.data.nodeOperationDisplayText}
              _color={
                (function match(_value) {
                  if (current.item.data.nodeOperation === 'launch' || current.item.data.nodeOperation === 'submit' || current.item.data.nodeOperation === 'reassign' || current.item.data.nodeOperation === 'addSign' || current.item.data.nodeOperation === 'cc') {
                    return '#337EFF'
                  } else if (current.item.data.nodeOperation === 'approve') {
                    return '#26BD71'
                  } else if (current.item.data.nodeOperation === 'reject') {
                    return '#F24957'
                  } else if (current.item.data.nodeOperation === 'revert' || current.item.data.nodeOperation === 'withdraw') {
                    return '#FF8024'
                  } else if (current.item.data.nodeOperation === 'end' || current.item.data.nodeOperation === 'terminate') {
                    return '#666666'
                  } else {
                    return '#337EFF'
                  }
                })(current.item.data.nodeOperation)
              }
              _background-color={
                (function match(_value) {
                  if (current.item.data.nodeOperation === 'launch' || current.item.data.nodeOperation === 'submit' || current.item.data.nodeOperation === 'reassign' || current.item.data.nodeOperation === 'addSign' || current.item.data.nodeOperation === 'cc') {
                    return '#EAF2FF'
                  } else if (current.item.data.nodeOperation === 'approve') {
                    return '#E9F8F0'
                  } else if (current.item.data.nodeOperation === 'reject') {
                    return '#FEEDEF'
                  } else if (current.item.data.nodeOperation === 'revert' || current.item.data.nodeOperation === 'withdraw') {
                    return '#FFF2E9'
                  } else if (current.item.data.nodeOperation === 'end' || current.item.data.nodeOperation === 'terminate') {
                    return '#F5F5F5'
                  } else {
                    return '#EAF2FF'
                  }
                })(current.item.data.nodeOperation)
              }>
            </VanText>
          </VanLinearLayout>

          <VanLinearLayout
            _if={current.item.type != "Prediction"}
            direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" widthStretch="false" style="width:100%;--custom-start: auto; margin-top: 2.13333vw;">
            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="text-align:left;--custom-start: auto; width: 18.66667vw;
margin-right: 2.13333vw;">
              <VanText text="审批意见：" style="color:#999;text-align:right;--custom-start: auto; font-size: 100%;
width: 18.66667vw;"></VanText>
            </VanLinearLayout>
            <VanText
              style="color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"
              overflow="ellipsis" widthStretch="true"
              text={(function match(_value) {
                if (_value === true) {
                  return current.item.data.nodeOperationComment
                } else if (_value === false) {
                  return '-'
                } else {
                }
              })(nasl.util.HasValue(current.item.data.nodeOperationComment))}>
            </VanText>
          </VanLinearLayout>

        </VanLinearLayout>

        <VanAnchor label="ProcInstText">
          <VanLinearLayout
            _if={current.item.type == "ProcInstText"}
            direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" gap="normal"
            onClick={function click() {
              if (${nameGroup.isUnfold}) {
                ${nameGroup.isUnfold} = false
              } else {
                ${nameGroup.isUnfold} = true
              }
            }}
            style="--van-space-base:10px; --custom-start: auto; cursor:pointer;">
            <VanIconv name="bottom-arrow" icotype="only" style="color:#3377ff;">
              <VanText text="图标"></VanText>
            </VanIconv>
            <VanText _if={!(${nameGroup.isUnfold})} text="预测节点" style="color:#3377ff;"></VanText>
            <VanText _if={${nameGroup.isUnfold}} text="隐藏预测节点" style="color:#3377ff;"></VanText>
          </VanLinearLayout>
        </VanAnchor>
      </VanLinearLayout>
    }>

  </VanListView>
  <VanDialog
    ref="dialog_1"
    safeAreaInsetBottom={true}
    slotFooter={() => <VanLinearLayout style="width: 100%;text-align:center;">
      <VanButton class="van-button van-button--default van-dialog__cancel" text="取消" onClick={function click(event) { $refs.dialog_1.closeModal() }}></VanButton>
      <VanButton class="van-button van-button--default van-dialog__confirm van-hairline--left" text="确认" onClick={function click(event) { $refs.dialog_1.closeModal() }}></VanButton>
    </VanLinearLayout>}>
    <VanLinearLayout style="min-height:100px;"><VanText text={\`当前节点处理人为：\${${nameGroup.currentHandler}}\`} overflow="break"></VanText></VanLinearLayout>
  </VanDialog>
</VanLinearLayout>`;
}
