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
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // 页面创建事件
  };

  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.dataLength}: Long = 0; //流程记录数据长度
    function ${nameGroup.getRecordsEvent}(page: Long, size: Long) {
      let result;
      if (nasl.util.HasValue(taskId)) {
        result = ${logicNamespace}.getProcInstRecords(taskId, page, size)
        ${nameGroup.dataLength} = result.list.length
      } else {
      }
      return result;
    }//查询流程记录

    return ${genTemplate(nameGroup)}
  }`;
}

export function genTemplate(nameGroup: Record<string, string>) {
  return `<VanList
    dataSource={${nameGroup.getRecordsEvent}(1, 999)}
    isCell={false}
    slotItem={(current) => <VanFlex mode="block" gutter={0} style="--custom-start: auto; padding: 0 4.26667vw;\nfont-size: 3.73333vw;">
      <VanFlex gutter={0} mode="block" style="--custom-start: auto; padding-left: 7vw;\npadding-right:  4.26667vw;">
        <VanFlex wrap={false} gutter={0} alignment="center">
          <VanIcon
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
                    })((current.item.nodeOperation == 'revert') || (current.item.nodeOperation == 'reject'))
                  } else {
                  }
                })((current.item.nodeOperation == 'approve') || (current.item.nodeOperation == 'submit') || (current.item.nodeOperation == 'launch'))
              } else {
              }
            })((current.item.nodeOperation == 'revert') && (current.item.nodeOperation == 'reject') && (current.item.nodeOperation == 'approve') && (current.item.nodeOperation == 'launch') && (current.item.nodeOperation == 'submit'))}
            _color={(function match(_value) {
              if (_value === true) {
                return '#f24957'
              } else if (_value === false) {
                return '#337eff'
              } else {
              }
            })((current.item.nodeOperation == 'revert') || (current.item.nodeOperation == 'reject'))}>
          </VanIcon>
          <VanText
            style="width:auto;text-align:left;--custom-start: auto; font-weight: 500;\ncolor: #333;\nfont-size: 3.73333vw;\nmargin-left: calc( 2.4vw + 4.26667vw);\nline-height: 1.2em;"
            text={(function match(_value) {
              if (_value === true) {
                return current.item.nodeTitle
              } else if (_value === false) {
                return '-'
              } else {
              }
            })(nasl.util.HasValue(current.item.nodeTitle))}>
          </VanText>
        </VanFlex>
        <VanFlex wrap={false} gutter={0} justify="end" alignment="start" style="--custom-start: auto; margin-left: 1.6vw;\nalign-items: stretch;">
          <VanFlex mode="block"
            _if={${nameGroup.dataLength} != current.index + 1}
            style="width:0px;border-top-width:0px;border-left-width:1px;border-right-width:0px;border-bottom-width:0px;border-style:solid;border-left-color:#4187ff;0">
          </VanFlex>
          <VanFlex mode="flex" direction="vertical" justify="start" alignment="stretch" wrap={false} style="--custom-start: auto; width:calc( 100% - 1px );\npadding-bottom: 5.33334vw;\npadding-top:2.13333vw;\npadding-left: calc(4vw + 4.26667vw);">
            <VanFlex wrap={false} justify="start" alignment="center" style="--custom-start: auto;\n">
              <VanText text="处理人" style="color:#999; --custom-start: auto; font-size: 100%;\nwidth: 18.66667vw;\nmargin-right: 2.13333vw;\nline-height: 1.2em;"></VanText>
              <VanText
                text={(function match(_value) {
                  if (_value === true) {
                    return current.item.recordUser.userName
                  } else if (_value === false) {
                    return (function match(_value) {
                      if (_value === true) {
                        return current.item.recordUser.userName
                      } else if (_value === false) {
                        return '-'
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.recordUser.userName))
                  } else {
                  }
                })(nasl.util.HasValue(current.item.recordUser.displayName))}
                style="color:#333; --custom-start: auto; font-size: 100%;\nline-height: 1.2em;\nflex: 1;">
              </VanText>
            </VanFlex>
            <VanFlex wrap={false} justify="start" alignment="center">
              <VanText text="处理时间" style="color:#999; --custom-start: auto; font-size: 100%;\nwidth: 18.66667vw;\nmargin-right: 2.13333vw;\nline-height: 1.2em;"></VanText>
              <VanText
                text={(function match(_value) {
                  if (_value === true) {
                    return nasl.util.FormatDateTime(current.item.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                  } else if (_value === false) {
                    return '-'
                  } else {
                  }
                })(nasl.util.HasValue(current.item.recordCreatedTime))}
                style="color:#333; --custom-start: auto; font-size: 100%;\nline-height: 1.2em;\nflex: 1;">
              </VanText>
            </VanFlex>
            <VanFlex wrap={false} justify="start" alignment="center">
              <VanText text="审批操作" style="color:#999; --custom-start: auto; font-size: 100%;\nwidth: 18.66667vw;\nmargin-right: 2.13333vw;\nline-height: 1.2em;"></VanText>
              <VanText
                text={current.item.nodeOperationDisplayText}
                _color={(function match(_value) {
                  if (current.item.nodeOperation === 'launch' || current.item.nodeOperation === 'submit' || current.item.nodeOperation === 'reassign' || current.item.nodeOperation === 'addSign' || current.item.nodeOperation === 'cc') {
                    return '#337EFF'
                  } else if (current.item.nodeOperation === 'approve') {
                    return '#26BD71'
                  } else if (current.item.nodeOperation === 'reject') {
                    return '#F24957'
                  } else if (current.item.nodeOperation === 'revert' || current.item.nodeOperation === 'withdraw') {
                    return '#FF8024'
                  } else if (current.item.nodeOperation === 'end' || current.item.nodeOperation === 'terminate') {
                    return '#666666'
                  } else {
                    return '#666666'
                  }
                })(current.item.nodeOperation)}
                _background-color={(function match(_value) {
                  if (current.item.nodeOperation === 'launch' || current.item.nodeOperation === 'submit' || current.item.nodeOperation === 'reassign' || current.item.nodeOperation === 'addSign' || current.item.nodeOperation === 'cc') {
                    return '#EAF2FF'
                  } else if (current.item.nodeOperation === 'approve') {
                    return '#E9F8F0'
                  } else if (current.item.nodeOperation === 'reject') {
                    return '#FEEDEF'
                  } else if (current.item.nodeOperation === 'revert' || current.item.nodeOperation === 'withdraw') {
                    return '#FFF2E9'
                  } else if (current.item.nodeOperation === 'end' || current.item.nodeOperation === 'terminate') {
                    return '#F5F5F5'
                  } else {
                    return '#F5F5F5'
                  }
                })(current.item.nodeOperation)}
                style="border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;--custom-start: auto; padding:0 2.13vw;\ntext-align:left;\nfont-size: 100%;\nline-height:1.6;">
              </VanText>
            </VanFlex>
            <VanFlex wrap={false} justify="start" alignment="center">
              <VanText text="审批意见" style="color:#999; --custom-start: auto; font-size: 100%;\nwidth: 18.66667vw;\nmargin-right: 2.13333vw;\nline-height: 1.2em;"></VanText>
              <VanText
                text={(function match(_value) {
                  if (_value === true) {
                    return current.item.nodeOperationComment
                  } else if (_value === false) {
                    return '-'
                  } else {
                  }
                })(nasl.util.HasValue(current.item.nodeOperationComment))}
                style="color:#333; --custom-start: auto; font-size: 100%;\nline-height: 1.2em;\nflex: 1;">
              </VanText>
            </VanFlex>
          </VanFlex>
        </VanFlex>
      </VanFlex>
    </VanFlex>}>
  </VanList>`;
}
