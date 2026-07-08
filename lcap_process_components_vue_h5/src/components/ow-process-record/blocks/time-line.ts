import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程记录的时间线
export function genOwProcessRecordTimeline(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    dataLength: view.getVariableUniqueName('procInstRecordsDatalen'), // 流程记录数据长度
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // 查询流程记录
    isUnfold: view.getVariableUniqueName('isUnfold'), // 预测节点是否展开
  };

  // 流程需要使用页面输入参数'taskId'，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.dataLength}: Long = 0; //流程记录数据长度
    let ${nameGroup.isUnfold}: Boolean = false; //预测节点是否展开

    function ${nameGroup.getRecordsEvent}() {
      let proInstRecordInfo
      let currentProccessInfo
      let PredictionInfo
      let tableData: List<{ data: ${structureNamespace}.ProcInstRecord, type: String }>
      let result
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
        result = tableData
        ${nameGroup.dataLength} = tableData.length
      } else {
      }
      return result
    }//查询流程记录

    return ${genTemplate(nameGroup)}
  }`;
}

export function genTemplate(nameGroup: Record<string, string>) {
  return `<VanListView
    pageable=""
    vusionDisabledAddslot={true}
    pageSize={null}
    dataSource={${nameGroup.getRecordsEvent}()}
    hiddenempty={false}
    scrollTarget="self"
    dataSourceWatch={[]}
    style="border-color:#c06161;borderTopColor:#c06161;borderBottomColor:#c06161;borderLeftColor:#c06161;borderRightColor:#c04e4e;height:100%;--custom-start: auto; min-height: 26.66667vw;
overflow: scroll;
margin-top: 2.66667vw;
font-size: 3.73333vw;"
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
      (current) => <VanLinearLayout direction="horizontal" wrap={true} style="--custom-start: auto; padding: 0 4.26667vw;
font-size: 3.73333vw;">

        <VanLinearLayout
          _if={(current.item.type == "ProcInstText") && (!(${nameGroup.isUnfold}))}
          wrap={true} mode="flex" justify="start" alignment="center" gap="normal">
          <VanIconv name="time" icotype="only">
            <VanText text="图标"></VanText>
          </VanIconv>
          <VanLinearLayout
            direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center"
            onClick={function click() {
              ${nameGroup.isUnfold} = true
            }}>
            <VanIconv name="bottom-arrow" icotype="only">
              <VanText text="图标"></VanText>
            </VanIconv>
            <VanText text="预测节点"></VanText>
          </VanLinearLayout>
        </VanLinearLayout>

        <VanLinearLayout
          _if={(current.item.type == "History") || (current.item.type == "Current") || ${nameGroup.isUnfold}}
          direction="vertical" gap="none">
          <VanLinearLayout
            _if={current.item.type != "ProcInstText"}
            wrap={false} mode="flex" justify="start" alignment="center" gap="normal"
            style="--van-space-base:0px;">
            <VanIconv
              _if={(current.item.type == "History") || (current.item.type == "Current")}
              style="color:#f24957;--custom-start: auto; font-size: var(--van-step-icon-size);
width: 1.1em;
height: 1.1em;
vertical-align: -.15em;
fill: currentColor;
line-height: 1.1em;"
              name={
                (function match(_value) {
                  if (_value === true) {
                    return 'steps-process'
                  } else if (_value === false) {
                    return (function match(_value) {
                      if (_value === true) {
                        return 'steps-finish'
                      } else if (_value === false) {
                        return (function match(_value) {
                          if (_value === true) {
                            return 'steps-error'
                          } else if (_value === false) {
                            return 'steps-process'
                          } else {
                          }
                        })(current.item.data.nodeOperation == 'revert' || current.item.data.nodeOperation == 'reject')
                      } else {
                      }
                    })(current.item.data.nodeOperation == 'approve' || current.item.data.nodeOperation == 'submit' || current.item.data.nodeOperation == 'launch')
                  } else {
                  }
                })(current.item.data.nodeOperation != 'revert' && current.item.data.nodeOperation != 'reject' && current.item.data.nodeOperation != 'approve' && current.item.data.nodeOperation != 'launch' && current.item.data.nodeOperation != 'submit')
              }
              icotype="only"
              _color={
                (function match(_value) {
                  if (_value === true) {
                    return '#f24957'
                  } else if (_value === false) {
                    return '#337eff'
                  } else {
                  }
                })(current.item.data.nodeOperation == 'revert' || current.item.data.nodeOperation == 'reject')
              }>
              <VanText text="图标"></VanText>
            </VanIconv>
            <VanIconv
              _if={(current.item.type != "History") && (current.item.type != "Current")}
              name="time" icotype="only">
              <VanText text="图标"></VanText>
            </VanIconv>
            <VanText overflow="ellipsis" widthStretch="false"
              style="width:auto;text-align:left;--custom-start: auto; font-weight: 500;
color: #333;
font-size: 3.73333vw;
margin-left: calc( 2.4vw + 4.26667vw);
line-height: 1.2em;"
              text={
                (function match(_value) {
                  if (_value === true) {
                    return current.item.data.nodeTitle
                  } else if (_value === false) {
                    return '-'
                  } else {
                  }
                })(nasl.util.HasValue(current.item.data.nodeTitle))
              }>
            </VanText>
            <VanText
              _if={current.item.type == "Prediction"}
              text="预测">
            </VanText>
          </VanLinearLayout>

          <VanLinearLayout gap="normal" mode="flex" justify="end" alignment="start" wrap={false}
            style="borderLeftColor:#337eff;border-left-width:0px;border-style:solid;height:100%;--custom-start: auto; margin-left: 1.6vw;
display: flex;
align-items: stretch;">
            <VanLinearLayout
              _if={(${nameGroup.dataLength} != current.index + 1) && ((current.item.type == "History") || (current.item.type == "Current") || (current.item.type == "ProcInstText"))}
              direction="horizontal" wrap={true} gap="normal"
              style="width:0px;border-left-width:1px;border-style:solid;borderLeftColor:#337eff;border-top-width:0px;border-bottom-width:0px;border-right-width:0px;--van-space-base:0px;height:auto;">
            </VanLinearLayout>
            <VanLinearLayout
              _if={(${nameGroup.dataLength} != current.index + 1) && (current.item.type != "History") && (current.item.type != "Current") && (current.item.type != "ProcInstText")}
              direction="horizontal" wrap={true} gap="normal"
              style="width:0px;border-left-width:1px;border-style:solid;borderLeftColor:#A9AEB8;border-top-width:0px;border-bottom-width:0px;border-right-width:0px;--van-space-base:0px;height:auto;">
            </VanLinearLayout>

            <VanLinearLayout direction="horizontal" wrap={true}>
              <VanLinearLayout
                _if={current.item.type != "ProcInstText"}
                direction="horizontal" wrap={true} gap="normal"
                style="--van-space-base:0px;text-align:right;--custom-start: auto; width:calc( 100% - 1px );
padding-bottom: 5.33334vw;
padding-top:2.13333vw;
padding-left: calc(4vw + 4.26667vw);">
                <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" gap="normal" style="text-align:left;--van-space-base:0px;">
                  <VanText text="处理人" style="color:#999;text-align:left;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
                  <VanText
                    style="color:#333333;width:100%;text-align:left;--custom-start: auto; font-size: 100%;
line-height: 1.2em;"
                    overflow="ellipsis" widthStretch="true"
                    text={
                      (function match(_value) {
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
                      })(nasl.util.HasValue(current.item.data.recordUser.displayName))
                    }>
                  </VanText>
                </VanLinearLayout>

                <VanLinearLayout
                  _if={current.item.type != "Prediction"}
                  direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" gap="normal" style="text-align:left;--van-space-base:0px;--custom-start: auto; margin-top:2.13333vw;">
                  <VanText text="处理时间" style="color:#999;text-align:left;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
                  <VanText
                    style="color:#333333;width:100%;text-align:left;--custom-start: auto; font-size: 100%;
line-height: 1.2em;"
                    overflow="ellipsis" widthStretch="true"
                    text={
                      (function match(_value) {
                        if (_value === true) {
                          return nasl.util.FormatDateTime(current.item.data.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.data.recordCreatedTime))
                    }>
                  </VanText>
                </VanLinearLayout>

                <VanLinearLayout
                  _if={current.item.type != "Prediction"}
                  direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" gap="normal" style="text-align:left;--van-space-base:0px;--custom-start: auto; margin-top:2.13333vw;">
                  <VanText text="审批操作" style="color:#999;text-align:left;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
                  <VanText
                    style="color:#333333;width:auto;text-align:left;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;--custom-start: auto; font-size: 100%;
padding:0 2.13vw;
max-width:calc(100% - 22vw);"
                    text={current.item.data.nodeOperationDisplayText}
                    overflow="ellipsis" widthStretch="false"
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
                          return '#666666'
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
                          return '#F5F5F5'
                        }
                      })(current.item.data.nodeOperation)
                    }>
                  </VanText>
                </VanLinearLayout>

                <VanLinearLayout
                  _if={current.item.type != "Prediction"}
                  direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" gap="normal" style="text-align:left;--van-space-base:0px;--custom-start: auto; margin-top:2.13333vw;">
                  <VanText text="审批意见" style="color:#999;text-align:left;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
                  <VanText
                    style="color:#333333;width:100%;text-align:left;--custom-start: auto; font-size: 100%;
line-height: 1.2em;"
                    overflow="ellipsis" widthStretch="true"
                    text={
                      (function match(_value) {
                        if (_value === true) {
                          return current.item.data.nodeOperationComment
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.data.nodeOperationComment))
                    }>
                  </VanText>
                </VanLinearLayout>
              </VanLinearLayout>

              <VanLinearLayout
                _if={(current.item.type == "ProcInstText") && ${nameGroup.isUnfold}}
                direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center">
                <VanLinearLayout
                  direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center"
                  onClick={function click() {
                    ${nameGroup.isUnfold} = false
                  }}>
                  <VanIconv name="top-arrow" icotype="only">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                  <VanText text="隐藏预测节点"></VanText>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanLinearLayout>

          </VanLinearLayout>
        </VanLinearLayout>

      </VanLinearLayout>
    }>
  </VanListView>`;
}
