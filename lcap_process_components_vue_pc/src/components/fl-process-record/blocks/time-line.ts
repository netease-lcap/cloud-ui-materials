import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程记录的时间线
export function genFlProcessRecordTimeline(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    // 局部变量
    procInstRecordsData: view.getVariableUniqueName('procInstRecordsData'), // 流程记录数据

    // 页面逻辑
    createdEvent: view.getLogicUniqueName('created'), // 页面创建事件
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // 查询流程记录

    // 新增变量
    isUnfold: view.getVariableUniqueName('isUnfold'), // 预测节点是否展开
  };

  // 流程需要使用页面输入参数'taskId'，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.procInstRecordsData}: List<{ data: ${structureNamespace}.ProcInstRecord, type: String }>; //流程记录数据
    let ${nameGroup.isUnfold}: Boolean = false; //预测节点是否展开

    function ${nameGroup.getRecordsEvent}() {
      let currentProccessInfo
      let PredictionInfo
      let tableData: List<{ data: ${structureNamespace}.ProcInstRecord, type: String }>
      let proInstRecordInfo
      if (nasl.util.HasValue(taskId)) {
        currentProccessInfo = ${logicNamespace}.getProcInstInfo(taskId)
        proInstRecordInfo = ${logicNamespace}.getProcInstRecords(taskId, 1, 1000)
        nasl.util.ListReverse(proInstRecordInfo.list)
        nasl.util.AddAll(tableData, nasl.util.ListTransform(proInstRecordInfo.list, (item) => ({ data: item, type: "History" })))
        nasl.util.AddAll(tableData, nasl.util.ListTransform(currentProccessInfo.procInstCurrNodes, (item) => ({ data: new ${structureNamespace}.ProcInstRecord({ nodeTitle: item.currNodeTitle, nodeName: item.currNodeName, recordUser: new ${structureNamespace}.ProcessUser({ userName: nasl.util.Join(nasl.util.ListTransform(item.currNodeParticipants, (item1) => item1.userName), ","), displayName: nasl.util.Join(nasl.util.ListTransform(item.currNodeParticipants, (item1) => (function match(_value) { if (_value === true) { return item1.displayName } else if (_value === false) { return item1.userName } else { } })(nasl.util.HasValue(item1.displayName))), ",") }), recordCreatedTime: null, nodeOperationComment: null, nodeOperation: null, nodeOperationDisplayText: "审批中", procInstId: currentProccessInfo.procInstId }), type: "Current" })))
        PredictionInfo = ${logicNamespace}.getProcInstPredictionListByInstId(currentProccessInfo.procInstId)
        if (PredictionInfo.length > 0) {
          nasl.util.Add(tableData, { data: new ${structureNamespace}.ProcInstRecord({ nodeTitle: null, nodeName: null, recordUser: null, recordCreatedTime: null, nodeOperationComment: null, nodeOperation: null, nodeOperationDisplayText: null, procInstId: currentProccessInfo.procInstId }), type: "ProcInstText" })
        } else {
        }
        nasl.util.AddAll(tableData, nasl.util.ListTransform(PredictionInfo, (item) => ({ data: new ${structureNamespace}.ProcInstRecord({ nodeTitle: item.nodeTitle, nodeName: item.nodeName, recordUser: new ${structureNamespace}.ProcessUser({ userName: nasl.util.Join(nasl.util.ListTransform(item.predictedUsers, (item1) => item1.userName), ","), displayName: nasl.util.Join(nasl.util.ListTransform(item.predictedUsers, (item1) => (function match(_value) { if (_value === true) { return item1.displayName } else if (_value === false) { return item1.userName } else { } })(nasl.util.HasValue(item1.displayName))), ",") }), recordCreatedTime: null, nodeOperationComment: null, nodeOperation: null, nodeOperationDisplayText: null, procInstId: currentProccessInfo.procInstId }), type: "Prediction" })))
        ${nameGroup.procInstRecordsData} = tableData
      } else {
      }
    }//查询流程记录

    const $lifecycles = {
      onCreated: [
        function ${nameGroup.createdEvent}() {
          ${nameGroup.getRecordsEvent}()
        },
      ],
    }

    return ${genTemplate(nameGroup)}
  }`;
}

export function genTemplate(nameGroup: Record<string, string>) {
  return `<ULinearLayout direction="horizontal" wrap={true} style="overflow:hidden;">
    <UListComponents
    colnum={1}
    dataSourceWatch={nasl.util.NewList([${nameGroup.procInstRecordsData}])}
    dataSource={${nameGroup.procInstRecordsData}}
    style="width:100%;"
    slotDefault={
      (current) => <>
        <ULinearLayout
          _if={(current.item.type == "ProcInstText") && (!(${nameGroup.isUnfold}))}
          wrap={true} mode="flex" gap="normal" justify="start" alignment="center"
          style="height:16px;--space-base:0px;--custom-start: auto; font-size:0;">
          <ULinearLayout
            _if={(current.item.type == "Current") || (current.item.type == "ProcInstText") || (current.item.type == "Prediction")}
            direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center"
            style="width:16px;height:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#ffffff;border-top-color:#ffffff;border-bottom-color:#ffffff;border-left-color:#ffffff;border-right-color:#ffffff;margin-right:10px; --custom-start: auto; border-radius: 100%;">
            <IIco name="time" icotype="only" widthStretch="false" heightStretch="false"
              style="font-size:14px;margin-left:0px; --custom-start: auto; line-height:1em;
              border-radius: 100%;">
            </IIco>
          </ULinearLayout>
          <ULinearLayout
            direction="horizontal" wrap={true}
            onClick={function click() {
              ${nameGroup.isUnfold} = true
            }}
            style=" --custom-start: auto; cursor:pointer;">
            <IIco name="bottom-arrow" icotype="only" style="color:#3377ff;">
              <UText text="图标"></UText>
            </IIco>
            <UText text="预测节点" style="font-size:14px;margin-left:10px;color:#3377ff; --custom-start: auto; line-height:14px;font-weight: 500;"></UText>
          </ULinearLayout>
        </ULinearLayout>

        <ULinearLayout
          _if={(current.item.type == "History") || (current.item.type == "Current") || ${nameGroup.isUnfold}}
          direction="horizontal" wrap={true}>
          <ULinearLayout
            _if={current.item.type != "ProcInstText"}
            wrap={true} mode="flex" gap="normal" justify="start" alignment="center"
            style="--space-base:0px;height:16px; --custom-start: auto; font-size:0;">
            <ULinearLayout
              _if={(current.item.data.nodeOperation != "revert") && (current.item.data.nodeOperation != "reject") && (current.item.data.nodeOperation != "approve") && (current.item.data.nodeOperation != "submit") && (current.item.type != "Prediction")}
              direction="horizontal" wrap={true}
              style="width:16px;height:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#337eff;--custom-start: auto; border-radius: 100%;">
            </ULinearLayout>
            <ULinearLayout
              _if={(current.item.data.nodeOperation == "approve") || (current.item.data.nodeOperation == "submit")}
              direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center"
              style="width:16px;height:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#337eff;background-color:#337eff;--custom-start: auto; border-radius: 100%;">
              <IIco name="correct" icotype="only" widthStretch="false" heightStretch="false"
                style="font-size:14px;color:#fff;">
              </IIco>
            </ULinearLayout>
            <ULinearLayout
              _if={(current.item.data.nodeOperation == "revert") || (current.item.data.nodeOperation == "reject")}
              direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center"
              style="width:16px;height:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#f24957;background-color:#f24957;--custom-start: auto; border-radius: 100%;">
              <IIco name="close" icotype="only" widthStretch="false" heightStretch="false"
                style="font-size:14px;color:#ffffff;background-color:#f24957;--custom-start: auto; line-height:1em;
                border-radius: 100%;"></IIco>
            </ULinearLayout>
            <ULinearLayout
              _if={(current.item.type != "History") && (current.item.type != "Current")}
              direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center"
              style="width:16px;height:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#ffffff;border-top-color:#ffffff;border-bottom-color:#ffffff;border-left-color:#ffffff;border-right-color:#ffffff; --custom-start: auto; border-radius: 100%;">
              <IIco name="time" icotype="only" widthStretch="false" heightStretch="false"
                style="font-size:14px; --custom-start: auto; line-height:1em;
                border-radius: 100%;">
              </IIco>
            </ULinearLayout>
            <UText text={current.item.data.nodeTitle} style="font-size:14px;margin-left:10px;--custom-start: auto; line-height:14px;font-weight: 500;"></UText>
            <UText
              _if={current.item.type == "Prediction"}
              text="预测"
              style="font-size:14px;padding-left:8px;padding-right:8px;padding-top:0px;padding-bottom:0px;color:#999999;margin-left:10px;background-color:#F2F3F5;border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;">
            </UText>
          </ULinearLayout>

          <ULinearLayout wrap={false} mode="flex" justify="start" alignment="start" gap="normal"
            style="margin-left:7px;border-style:solid;border-color:#337eff;--space-base:0px;border-top-width:0px;border-bottom-width:0px;border-right-width:0px;width:auto;border-left-width:0px;--custom-start: auto; display: flex;align-items: stretch;">
            <ULinearLayout
              _if={(${nameGroup.procInstRecordsData}.length != current.index + 1) && ((current.item.type == "History") || (current.item.type == "Current") || (current.item.type == "ProcInstText"))}
              direction="horizontal" wrap={true} widthStretch="false"
              style="width:0px;border-color:#337eff;borderTopColor:#337eff;borderBottomColor:#337eff;borderLeftColor:#337eff;borderRightColor:#337eff;border-left-width:1px;border-style:solid;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
            </ULinearLayout>
            <ULinearLayout
              _if={(${nameGroup.procInstRecordsData}.length != current.index + 1) && (current.item.type != "History") && (current.item.type != "Current") && (current.item.type != "ProcInstText")}
              direction="horizontal" wrap={true} widthStretch="false"
              style="width:0px;border-color:#A9AEB8;borderTopColor:#337eff;borderBottomColor:#337eff;borderLeftColor:#337eff;borderRightColor:#337eff;border-left-width:1px;border-style:solid;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;border-top-color:#A9AEB8;border-bottom-color:#A9AEB8;border-left-color:#A9AEB8;border-right-color:#A9AEB8;">
            </ULinearLayout>
            <ULinearLayout direction="horizontal" wrap={true} widthStretch="false">
              <ULinearLayout
                _if={current.item.type != "ProcInstText"}
                direction="horizontal" wrap={false} mode="flex" justify="start" alignment="start" widthStretch="false"
                style="padding-top:4px;padding-left:18px;padding-bottom:20px;width:100%;">
                <ULinearLayout direction="horizontal" wrap={false} style="margin-right:10px;min-width:9%;">
                  <ULinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" style="color:#999999;">
                    <UText text="处理人" overflow="nowrap"></UText>
                  </ULinearLayout>
                  <ULinearLayout
                    _if={current.item.type != "Prediction"}
                    direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" style="color:#999999;">
                    <UText text="处理时间" overflow="nowrap"></UText>
                  </ULinearLayout>
                  <ULinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" style="color:#999999;">
                    <UText _if={current.item.type != "Prediction"} text="审批操作" overflow="nowrap"></UText>
                  </ULinearLayout>
                  <ULinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" style="color:#999999;">
                    <UText _if={current.item.type != "Prediction"} text="审批意见" overflow="nowrap"></UText>
                  </ULinearLayout>
                </ULinearLayout>

                <ULinearLayout direction="horizontal" wrap={true} widthStretch="true" style="padding-right:0px;width:100%;max-width:90%;">
                  <ULinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="width:100%;">
                    <UText overflow="ellipsis" widthStretch="true"
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
                    </UText>
                  </ULinearLayout>
                  <ULinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="width:100%;">
                    <UText
                      _if={current.item.type != "Prediction"}
                      overflow="ellipsis" widthStretch="true"
                      text={(function match(_value) {
                        if (_value === true) {
                          return nasl.util.FormatDateTime(current.item.data.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.data.recordCreatedTime))}>
                    </UText>
                  </ULinearLayout>
                  <ULinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="width:100%;">
                    <UText
                      _if={current.item.type != "Prediction"}
                      style="padding-left:8px;padding-right:8px;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;padding-top:1px;padding-bottom:1px;width:auto;"
                      text={current.item.data.nodeOperationDisplayText}
                      overflow="ellipsis"
                      widthStretch="false"
                      display="inline"
                      $dynamicStyle={{
                        color: (function match(_value) {
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
                            return '#666666'
                          }
                        })(current.item.data.nodeOperation),
                        backgroundColor: (function match(_value) {
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
                            return '#F5F5F5'
                          }
                        })(current.item.data.nodeOperation),
                      }}>
                    </UText>
                  </ULinearLayout>
                  <ULinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="width:100%;">
                    <UText
                      _if={current.item.type != "Prediction"}
                      overflow="ellipsis" widthStretch="true"
                      text={(function match(_value) {
                        if (_value === true) {
                          return current.item.data.nodeOperationComment
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.data.nodeOperationComment))}>
                    </UText>
                  </ULinearLayout>
                </ULinearLayout>
              </ULinearLayout>

              <ULinearLayout
                _if={${nameGroup.isUnfold} && (current.item.type == "ProcInstText")}
                direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center"
                style="padding-left:18px;padding-bottom:16px;">
                <ULinearLayout
                  direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" gap="normal"
                  onClick={function click() {
                    ${nameGroup.isUnfold} = false
                  }}
                  style="--space-base:10px; --custom-start: auto; cursor:pointer;">
                  <IIco name="top-arrow" icotype="only" style="color:#3377ff;">
                    <UText text="图标"></UText>
                  </IIco>
                  <UText text="隐藏预测节点" style="color:#3377ff;"></UText>
                </ULinearLayout>
              </ULinearLayout>
            </ULinearLayout>
          </ULinearLayout>
        </ULinearLayout>
      </>
    }></UListComponents>
    <ULinearLayout direction="horizontal" mode="block" style="text-align:center;width:240px;">
      <UText style="color:#999999;" _if={!(nasl.util.HasValue(${nameGroup.procInstRecordsData}))} text="暂无流程记录"></UText>
    </ULinearLayout>
  </ULinearLayout>
  `;
}
