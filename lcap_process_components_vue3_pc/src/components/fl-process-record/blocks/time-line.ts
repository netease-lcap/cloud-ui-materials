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
    let ${nameGroup.procInstRecordsData}: List<{ data: ${structureNamespace}.ProcInstRecord, type: String, pendingCalculation: Boolean }>; //流程记录数据
    let ${nameGroup.isUnfold}: Boolean = false; //预测节点是否展开

    function ${nameGroup.getRecordsEvent}() {
      let currentProccessInfo
      let PredictionInfo
      let tableData: List<{ data: ${structureNamespace}.ProcInstRecord, type: String, pendingCalculation: Boolean }>
      let proInstRecordInfo
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
  return `<ElFlex
    direction="horizontal"
    mode="block"
    gutter={0}
    style="background-color:#ffffff;overflow:hidden;">
        <ElListComponents
          dataSource={${nameGroup.procInstRecordsData}}
          column={1}
          pagination="none"
          equalWidth={true}
          style="font-size:14px;"
          slotDefault={(current) => <>
            <ElFlex
              _if={(current.item.type == "ProcInstText") && (!(${nameGroup.isUnfold}))}
              mode="flex"
              justify="start"
              alignment="center"
              wrap={false}
              gutter={10}>
              <ElFlex
                widthStretch="false"
                heightStretch="false"
                mode="flex"
                justify="center"
                alignment="center"
                style="width:16px;height:16px;">
                <ElIcon name="Clock" style="font-size:16px;"></ElIcon>
              </ElFlex>
              <ElFlex
                mode="flex"
                justify="start"
                alignment="center"
                gutter={10}
                wrap={false}
                onClick={function click(event) {
                  ${nameGroup.isUnfold} = true
                }}
                style=" --custom-start: auto; cursor:pointer;">
                <ElIcon name="ArrowDown" style="color:#3377ff;"></ElIcon>
                <ElText text="预测节点" style="color:#3377ff;"></ElText>
              </ElFlex>
            </ElFlex>

            <ElFlex
              _if={(current.item.type == "History") || (current.item.type == "Current") || ${nameGroup.isUnfold}}
              direction="horizontal"
              mode="block">
              <ElFlex
                _if={current.item.type != "ProcInstText"}
                direction="horizontal"
                mode="flex"
                justify="start"
                alignment="center"
                gutter={0}
                style="height:16px; --custom-start: auto; font-size:0;">
                <ElFlex
                  _if={(current.item.data.nodeOperation != 'revert') && (current.item.data.nodeOperation != 'reject') && (current.item.data.nodeOperation != 'approve') && (current.item.data.nodeOperation != 'submit') && (current.item.data.nodeOperation != 'launch') && (current.item.data.nodeOperation != 'end') && (current.item.type != 'Prediction')}
                  direction="horizontal"
                  mode="block"
                  heightStretch="false"
                  widthStretch="false"
                  gutter={0}
                  style="height:16px;width:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#337eff;border-top-color:#337eff;border-bottom-color:#337eff;border-left-color:#337eff;border-right-color:#337eff; --custom-start: auto; border-radius: 100%;">
                </ElFlex>
                <ElFlex
                  _if={(current.item.data.nodeOperation == 'approve') || (current.item.data.nodeOperation == 'submit') || (current.item.data.nodeOperation == 'launch') || (current.item.data.nodeOperation == 'end')}
                  direction="horizontal"
                  widthStretch="false"
                  heightStretch="false"
                  mode="flex"
                  justify="center"
                  alignment="center"
                  gutter={0}
                  style="background-color:#337eff;width:16px;height:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#337eff;border-top-color:#337eff;border-bottom-color:#337eff;border-left-color:#337eff;border-right-color:#337eff; --custom-start: auto; border-radius: 100%;">
                  <ElIcon name="Select" style="color:#fff;font-size:14px;"></ElIcon>
                </ElFlex>
                <ElFlex
                  _if={(current.item.data.nodeOperation == 'revert') || (current.item.data.nodeOperation == 'reject')}
                  direction="horizontal"
                  widthStretch="false"
                  heightStretch="false"
                  mode="flex"
                  justify="center"
                  alignment="center"
                  gutter={0}
                  style="background-color:#f24957;width:16px;height:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#f24957;border-top-color:#f24957;border-bottom-color:#f24957;border-left-color:#f24957;border-right-color:#f24957; --custom-start: auto; border-radius: 100%;">
                  <ElIcon name="CloseBold" style="color:#ffffff;font-size:14px;background-color:#f24957; --custom-start: auto; line-height:1em;border-radius: 100%;"></ElIcon>
                </ElFlex>
                <ElFlex
                  _if={(current.item.type != 'History') && (current.item.type != 'Current')}
                  direction="horizontal"
                  widthStretch="false"
                  heightStretch="false"
                  mode="flex"
                  justify="center"
                  alignment="center"
                  gutter={0}
                  style="width:16px;height:16px;border-top-width:0px;border-left-width:0px;border-right-width:0px;border-bottom-width:0px;border-style:solid; --custom-start: auto; border-radius: 100%;">
                  <ElIcon name="Clock" style="font-size:16px;"></ElIcon>
                </ElFlex>
                <ElText text={current.item.data.nodeTitle} style="margin-left:10px;font-size:14px; --custom-start: auto; line-height:14px;font-weight: 500;"></ElText>
                <ElText
                  _if={current.item.type == 'Prediction'}
                  text="预测"
                  style="font-size:14px;color:#999999;padding-left:8px;padding-right:8px;padding-top:2px;padding-bottom:2px;background-color:#F2F3F5;border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;margin-left:10px;">
                </ElText>
              </ElFlex>

              <ElFlex
                direction="horizontal"
                mode="flex"
                justify="start"
                alignment="start"
                gutter={0}
                wrap={false}
                style="height:auto;margin-left:7px;width:auto; --custom-start: auto; display: flex;align-items: stretch;">
                <ElFlex
                  _if={(${nameGroup.procInstRecordsData}.length != current.index + 1) && ((current.item.type == 'History') || (current.item.type == 'Current') || (current.item.type == 'ProcInstText'))}
                  direction="horizontal"
                  mode="block"
                  widthStretch="false"
                  gutter={0}
                  style="width:0px;border-color:#337eff;border-top-color:#337eff;border-bottom-color:#337eff;border-left-color:#337eff;border-right-color:#337eff;border-style:solid;border-left-width:1px;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
                </ElFlex>
                <ElFlex
                  _if={(${nameGroup.procInstRecordsData}.length != current.index + 1) && (current.item.type != 'History') && (current.item.type != 'Current') && (current.item.type != 'ProcInstText')}
                  direction="horizontal"
                  mode="block"
                  widthStretch="false"
                  gutter={0}
                  style="width:0px;border-color:#A9AEB8;border-top-color:#A9AEB8;border-bottom-color:#A9AEB8;border-left-color:#A9AEB8;border-right-color:#A9AEB8;border-style:solid;border-left-width:1px;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
                </ElFlex>
                <ElFlex mode="block">
                  <ElFlex
                    _if={current.item.type != 'ProcInstText'}
                    direction="horizontal"
                    mode="flex"
                    justify="start"
                    alignment="start"
                    wrap={false}
                    gutter={0}
                    widthStretch="false"
                    style="padding-top:4px;padding-left:18px;padding-bottom:20px;width:100%;">
                    <ElFlex
                      direction="horizontal"
                      mode="block"
                      gutter={0}
                      style="min-width:9%;margin-right:10px;">
                      <ElFlex
                        direction="horizontal"
                        mode="flex"
                        justify="start"
                        alignment="center"
                        gutter={0}
                        style="color:#999999;height:22.4px;">
                        <ElText text="处理人"></ElText>
                      </ElFlex>
                      <ElFlex
                        _if={current.item.type != 'Prediction'}
                        direction="horizontal"
                        mode="flex"
                        justify="start"
                        alignment="center"
                        gutter={0}
                        style="color:#999999;height:22.4px;">
                        <ElText text="处理时间"></ElText>
                      </ElFlex>
                      <ElFlex
                        _if={current.item.type != 'Prediction'}
                        direction="horizontal"
                        mode="flex"
                        justify="start"
                        alignment="center"
                        gutter={0}
                        style="color:#999999;height:22.4px;">
                        <ElText text="审批操作"></ElText>
                      </ElFlex>
                      <ElFlex
                        _if={current.item.type != 'Prediction'}
                        direction="horizontal"
                        mode="flex"
                        justify="start"
                        alignment="center"
                        gutter={0}
                        style="color:#999999;height:22.4px;">
                        <ElText text="审批意见"></ElText>
                      </ElFlex>
                    </ElFlex>
                    <ElFlex
                      direction="horizontal"
                      mode="block"
                      gutter={0}
                      widthStretch="false"
                      style="padding-right:10px;max-width:1283px;">
                       <ElFlex
                        direction="horizontal"
                        mode="flex"
                        justify="start"
                        alignment="center"
                        wrap={false}
                        gutter={0}
                        style="height:22.4px;width:100%;">
                        <ElText
                          _if={current.item.type != "Prediction"}
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
                          })(nasl.util.HasValue(current.item.data.recordUser.displayName))}
                          overflow="ellipsis">
                        </ElText>
                        <ElTooltip
                          content={(function match(_value) {
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
                          })(nasl.util.HasValue(current.item.data.recordUser.displayName))}
                          placement="top">
                          <ElText
                            _if={(current.item.type == "Prediction") && (!(current.item.pendingCalculation))}
                            text={(function match(_value) {
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
                            })(nasl.util.HasValue(current.item.data.recordUser.displayName))}
                            overflow="ellipsis">
                          </ElText>
                        </ElTooltip>
                        <ElText
                          _if={(current.item.type == "Prediction") && (current.item.pendingCalculation)}
                          text="待系统计算"
                          overflow="ellipsis">
                        </ElText>
                      </ElFlex>
                      <ElFlex
                        _if={current.item.type != 'Prediction'}
                        direction="horizontal"
                        mode="flex"
                        justify="start"
                        alignment="center"
                        wrap={false}
                        gutter={0}
                        style="height:22.4px;width:100%;">
                        <ElText
                          text={(function match(_value) {
                            if (_value === true) {
                              return nasl.util.FormatDateTime(current.item.data.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                            } else if (_value === false) {
                              return '-'
                            } else {
                            }
                          })(nasl.util.HasValue(current.item.data.recordCreatedTime))}
                          overflow="ellipsis">
                        </ElText>
                      </ElFlex>
                      <ElFlex
                        _if={current.item.type != 'Prediction'}
                        direction="horizontal"
                        mode="flex"
                        justify="start"
                        alignment="center"
                        wrap={false}
                        gutter={0}
                        style="height:24.3px;width:100%;">
                        <ElText
                          text={current.item.data.nodeOperationDisplayText}
                          overflow="ellipsis"
                          style="padding-top:1px;padding-bottom:1px;padding-left:8px;padding-right:8px;border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;"
                          _color={(function match(_value) {
                            if (current.item.data.nodeOperation === 'end' || current.item.data.nodeOperation === 'terminate') {
                              return '#666666'
                            } else if (current.item.data.nodeOperation === 'revert' || current.item.data.nodeOperation === 'withdraw') {
                              return '#FF8024'
                            } else if (current.item.data.nodeOperation === 'reject') {
                              return '#F24957'
                            } else if (current.item.data.nodeOperation === 'approve') {
                              return '#26BD71'
                            } else if (current.item.data.nodeOperation === 'launch' || current.item.data.nodeOperation === 'submit' || current.item.data.nodeOperation === 'reassign' || current.item.data.nodeOperation === 'addSign' || current.item.data.nodeOperation === 'cc') {
                              return '#337EFF'
                            } else {
                              return '#337EFF'
                            }
                          })(current.item.data.nodeOperation)}
                          _background-color={(function match(_value) {
                            if (current.item.data.nodeOperation === 'end' || current.item.data.nodeOperation === 'terminate') {
                              return '#F5F5F5'
                            } else if (current.item.data.nodeOperation === 'revert' || current.item.data.nodeOperation === 'withdraw') {
                              return '#FFF2E9'
                            } else if (current.item.data.nodeOperation === 'reject') {
                              return '#FEEDEF'
                            } else if (current.item.data.nodeOperation === 'approve') {
                              return '#E9F8F0'
                            } else if (current.item.data.nodeOperation === 'launch' || current.item.data.nodeOperation === 'submit' || current.item.data.nodeOperation === 'reassign' || current.item.data.nodeOperation === 'addSign' || current.item.data.nodeOperation === 'cc') {
                              return '#EAF2FF'
                            } else {
                              return '#EAF2FF'
                            }
                          })(current.item.data.nodeOperation)}>
                        </ElText>
                      </ElFlex>
                      <ElFlex
                        _if={current.item.type != 'Prediction'}
                        direction="horizontal"
                        mode="flex"
                        justify="start"
                        alignment="center"
                        wrap={false}
                        gutter={0}
                        style="height:22.4px;width:100%;">
                        <ElText
                          text={(function match(_value) {
                            if (_value === true) {
                              return current.item.data.nodeOperationComment
                            } else if (_value === false) {
                              return '-'
                            } else {
                            }
                          })(nasl.util.HasValue(current.item.data.nodeOperationComment))}
                          overflow="ellipsis">
                        </ElText>
                      </ElFlex>
                    </ElFlex>
                  </ElFlex>

                  <ElFlex
                    _if={${nameGroup.isUnfold} && (current.item.type == 'ProcInstText')}
                    mode="flex"
                    justify="start"
                    alignment="center"
                    wrap={false}
                    gutter={10}
                    style="padding-left:18px;padding-bottom:16px;">
                    <ElFlex
                      mode="flex"
                      justify="start"
                      alignment="center"
                      wrap={false}
                      gutter={10}
                      onClick={function click(event) {
                        ${nameGroup.isUnfold} = false
                      }}
                      style=" --custom-start: auto; cursor:pointer;">
                      <ElIcon name="ArrowUp" style="color:#3377ff;"></ElIcon>
                      <ElText text="隐藏预测节点" style="color:#3377ff;"></ElText>
                    </ElFlex>
                  </ElFlex>
                </ElFlex>
              </ElFlex>
            </ElFlex>
          </>}>
        </ElListComponents>
        <ElFlex
          direction="horizontal"
          mode="flex"
          justify="end"
          alignment="center"
          gutter={16}
          style="width:200px;font-size:14px;text-align:center;">
          <ElText
            _if={!(nasl.util.HasValue(${nameGroup.procInstRecordsData}))}
            text="暂无流程记录"
            style="color:#999999;">
          </ElText>
        </ElFlex>
  </ElFlex>`;
}
