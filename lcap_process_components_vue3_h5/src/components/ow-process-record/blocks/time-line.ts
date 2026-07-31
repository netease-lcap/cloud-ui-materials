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
    proccessRecordData: view.getVariableUniqueName('proccessRecordData'), // 流程记录数据
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // 查询流程记录
    isUnfold: view.getVariableUniqueName('isUnfold'), // 预测节点是否展开
    currentHandler: view.getVariableUniqueName('currentHandler'), // 当前处理人
    createdEvent: view.getLogicUniqueName('created'), // 页面创建事件
  };

  // 流程需要使用页面输入参数'taskId'，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.dataLength}: Long = 0; //流程记录数据长度
    let ${nameGroup.isUnfold}: Boolean; //预测节点是否展开
    let ${nameGroup.proccessRecordData}: List<{ data: ${structureNamespace}.ProcInstRecord, type: String, pendingCalculation: Boolean }>; //流程记录数据
    let ${nameGroup.currentHandler}: String; //当前处理人

    function ${nameGroup.getRecordsEvent}() {
      let proInstRecordInfo
      let currentProccessInfo
      let PredictionInfo
      let tableData: List<{ data: ${structureNamespace}.ProcInstRecord, type: String, pendingCalculation: Boolean }>
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
        ${nameGroup.proccessRecordData} = tableData
        ${nameGroup.dataLength} = tableData.length
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
  return `<VanFlex mode="block">
    <VanList
      dataSource={${nameGroup.proccessRecordData}}
      isCell={false}
      modelValue={undefined}
      column={1}
      equalWidth={true}
      slotItem={(current) => <VanFlex mode="block" style="--custom-start: auto; padding: 0 4.26667vw;
font-size: 3.73333vw;">

        <VanFlex
          _if={(current.item.type == "ProcInstText") && (!(${nameGroup.isUnfold}))}
          justify="start" alignment="center"
          style="height:20px;">
          <VanIcon name="clock-o"></VanIcon>
          <VanFlex
            justify="start" alignment="center" gutter={10}
            onClick={function click(event) {
              ${nameGroup.isUnfold} = true
            }}>
            <VanIcon name="arrow-down" style="color:#3377ff;"></VanIcon>
            <VanText text="预测节点" style="width:auto;text-align:left;margin-left:0px;color:#3377ff;--custom-start: auto; font-weight:500;font-size:3.73333vw;line-height:1.2em;"></VanText>
          </VanFlex>
        </VanFlex>

        <VanFlex
          _if={(current.item.type == "History") || (current.item.type == "Current") || ${nameGroup.isUnfold}}
          mode="block" gutter={0}>
          <VanFlex gutter={0} mode="block">
            <VanFlex
              _if={current.item.type != "ProcInstText"}
              wrap={false} gutter={0} alignment="center">
              <VanIcon
                _if={(current.item.type != "ProcInstText") && (current.item.type != "Prediction")}
                name={(function match(_value) {
                  if (_value === true) {
                    return 'stop-circle-o'
                  } else if (_value === false) {
                    return (function match(_value) {
                      if (_value === true) {
                        return 'checked'
                      } else if (_value === false) {
                        return (function match(_value) {
                          if (_value === true) {
                            return 'clear'
                          } else if (_value === false) {
                            return 'stop-circle-o'
                          } else {
                          }
                        })((current.item.data.nodeOperation == 'revert') || (current.item.data.nodeOperation == 'reject'))
                      } else {
                      }
                    })((current.item.data.nodeOperation == 'approve') || (current.item.data.nodeOperation == 'submit') || (current.item.data.nodeOperation == 'launch') || (current.item.data.nodeOperation == 'end'))
                  } else {
                  }
                })((current.item.data.nodeOperation != 'revert') && (current.item.data.nodeOperation != 'reject') && (current.item.data.nodeOperation != 'approve') && (current.item.data.nodeOperation != 'launch') && (current.item.data.nodeOperation != 'submit') && (current.item.data.nodeOperation != 'end'))
                }
                _color={(function match(_value) {
                  if (_value === true) {
                    return '#f24957'
                  } else if (_value === false) {
                    return '#337eff'
                  } else {
                  }
                })((current.item.data.nodeOperation == 'revert') || (current.item.data.nodeOperation == 'reject'))}>
              </VanIcon>
              <VanIcon
                _if={(current.item.type != "History") && (current.item.type != "Current")}
                name="clock-o">
              </VanIcon>
              <VanText
                text={(function match(_value) {
                  if (_value === true) {
                    return current.item.data.nodeTitle
                  } else if (_value === false) {
                    return '-'
                  } else {
                  }
                })(nasl.util.HasValue(current.item.data.nodeTitle))}
                style="width:auto;text-align:left;--custom-start: auto; font-weight: 500;
color: #333;
font-size: 3.73333vw;
margin-left: calc( 2.4vw + 4.26667vw);
line-height: 1.2em;">
              </VanText>
              <VanText
                _if={current.item.type == "Prediction"}
                text="预测"
                style="width:auto;text-align:left;background-color:#F2F3F5;padding-left:8px;padding-right:8px;padding-top:2px;padding-bottom:2px;margin-left:10px;color:#999999;border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;--custom-start: auto; font-weight:500;font-size:3.73333vw;line-height:1.2em;">
              </VanText>
            </VanFlex>

            <VanFlex wrap={false} gutter={0} justify="start" alignment="start"
              style="--custom-start: auto; margin-left: 1.6vw;
align-items: stretch;">
              <VanFlex
                _if={(${nameGroup.dataLength} != current.index + 1) && ((current.item.type == "History") || (current.item.type == "Current") || (current.item.type == "ProcInstText"))}
                mode="block"
                style="width:0px;border-left-width:1px;border-style:solid;border-left-color:#4187ff;border-top-width:0px;border-bottom-width:0px;border-right-width:0px;">
              </VanFlex>
              <VanFlex
                _if={(${nameGroup.dataLength} != current.index + 1) && (current.item.type != "History") && (current.item.type != "Current") && (current.item.type != "ProcInstText")}
                mode="block"
                style="width:0px;border-left-width:1px;border-style:solid;border-left-color:#A9AEB8;border-top-width:0px;border-bottom-width:0px;border-right-width:0px;">
              </VanFlex>

              <VanFlex mode="block">
                <VanFlex
                  _if={current.item.type != "ProcInstText"}
                  mode="flex" direction="vertical" justify="start" alignment="stretch" wrap={false}
                  style="--custom-start: auto; width:calc( 100% - 1px );
padding-bottom: 5.33334vw;
padding-top:2.13333vw;
padding-left: calc(4vw + 4.26667vw);">
                  <VanFlex wrap={false} justify="start" alignment="center" gutter={0} style="--custom-start: auto;">
                    <VanText text="处理人" style="color:#999;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
                    <VanText
                      _if={!(current.item.pendingCalculation)}
                      style="color:#333;--custom-start: auto; font-size: 100%;
line-height: 1.2em;
flex: 1;"
                      onClick={function click(event) {
                        if (nasl.util.HasValue(current.item.data.recordUser.displayName)) {
                          if (nasl.util.Split(current.item.data.recordUser.displayName, ",", true).length > 3) {
                            ${nameGroup.currentHandler} = current.item.data.recordUser.displayName
                            $refs.dialog_1.open()
                          } else {
                          }
                        } else {
                          if (nasl.util.HasValue(current.item.data.recordUser.userName)) {
                            if (nasl.util.Split(current.item.data.recordUser.userName, ",", true).length > 3) {
                              ${nameGroup.currentHandler} = current.item.data.recordUser.userName
                              $refs.dialog_1.open()
                            } else {
                            }
                          } else {
                          }
                        }
                      }}
                      text={
                        (function match(_value) {
                          if (_value === true) {
                            return (function match(_value) {
                              if (_value === true) {
                                return nasl.util.Concat(nasl.util.Join(nasl.util.ListSlice(nasl.util.Split(current.item.data.recordUser.displayName, ",", true), 0, 3), ","), "...")
                              } else if (_value === false) {
                                return current.item.data.recordUser.displayName
                              } else {
                              }
                            })(nasl.util.Split(current.item.data.recordUser.displayName, ",", true).length > 3)
                          } else if (_value === false) {
                            return (function match(_value) {
                              if (_value === true) {
                                return (function match(_value) {
                                  if (_value === true) {
                                    return nasl.util.Concat(nasl.util.Join(nasl.util.ListSlice(nasl.util.Split(current.item.data.recordUser.userName, ",", true), 0, 3), ","), "...")
                                  } else if (_value === false) {
                                    return current.item.data.recordUser.userName
                                  } else {
                                  }
                                })(nasl.util.Split(current.item.data.recordUser.userName, ",", true).length > 3)
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
                    <VanText
                      _if={current.item.pendingCalculation}
                      text="待系统计算"
                      style="color:#333;--custom-start: auto; font-size: 100%;
line-height: 1.2em;
flex: 1;">
                    </VanText>
                  </VanFlex>

                  <VanFlex
                    _if={current.item.type != "Prediction"}
                    wrap={false} justify="start" alignment="center" gutter={0}>
                    <VanText text="处理时间" style="color:#999;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
                    <VanText
                      style="color:#333;--custom-start: auto; font-size: 100%;
line-height: 1.2em;
flex: 1;"
                      text={(function match(_value) {
                        if (_value === true) {
                          return nasl.util.FormatDateTime(current.item.data.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.data.recordCreatedTime))}>
                    </VanText>
                  </VanFlex>

                  <VanFlex
                    _if={current.item.type != "Prediction"}
                    wrap={false} justify="start" alignment="center" gutter={0}>
                    <VanText text="审批操作" style="color:#999;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
                    <VanText
                      text={current.item.data.nodeOperationDisplayText}
                      style="border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;--custom-start: auto; padding:0 2.13vw;
text-align:left;
font-size: 100%;
line-height:1.6;"
                      _color={(function match(_value) {
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
                      })(current.item.data.nodeOperation)}
                      _background-color={(function match(_value) {
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
                      })(current.item.data.nodeOperation)}>
                    </VanText>
                  </VanFlex>

                  <VanFlex
                    _if={current.item.type != "Prediction"}
                    wrap={false} justify="start" alignment="center" gutter={0}>
                    <VanText text="审批意见" style="color:#999;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
                    <VanText
                      style="color:#333;--custom-start: auto; font-size: 100%;
line-height: 1.2em;
flex: 1;"
                      text={(function match(_value) {
                        if (_value === true) {
                          return current.item.data.nodeOperationComment
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.data.nodeOperationComment))}>
                    </VanText>
                  </VanFlex>
                </VanFlex>

                <VanFlex
                  _if={(current.item.type == "ProcInstText") && ${nameGroup.isUnfold}}
                  style="padding-left:31px;padding-bottom:16px;">
                  <VanFlex
                    justify="start" alignment="center" gutter={10}
                    onClick={function click(event) {
                      ${nameGroup.isUnfold} = false
                    }}>
                    <VanIcon name="arrow-up" style="color:#3377ff;"></VanIcon>
                    <VanText text="隐藏预测节点" style="width:auto;text-align:left;margin-left:0px;color:#3377ff;--custom-start: auto; font-weight:500;font-size:3.73333vw;line-height:1.2em;"></VanText>
                  </VanFlex>
                </VanFlex>
              </VanFlex>
            </VanFlex>
          </VanFlex>
        </VanFlex>

      </VanFlex>}>
    </VanList>
    <VanDialog
      ref="dialog_1"
      onConfirm={function confirm() {
        $refs.dialog_1.close()
      }}>
      <VanFlex justify="center" alignment="start" style="padding-top:16px;padding-bottom:16px;padding-left:16px;padding-right:16px;">
        <VanText text={\`当前节点处理人为：\${${nameGroup.currentHandler}}\`}></VanText>
      </VanFlex>
    </VanDialog>
    </VanFlex>
  `;
}
