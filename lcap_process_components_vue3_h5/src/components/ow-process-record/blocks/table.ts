import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程记录的表格
export function genOwProcessRecordTable(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // 页面创建事件
  };

  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    function ${nameGroup.getRecordsEvent}(page: Long, size: Long) {
      let result;
      if (nasl.util.HasValue(taskId)) {
        result = ${logicNamespace}.getProcInstRecords(taskId, page, size)
      } else {
      }
      return result;
    }//查询流程记录

    return ${genTemplate(nameGroup)}
  }`;
}

function genTemplate(nameGroup: Record<string, string>) {
  return `<VanList
    style="--custom-start: auto; --van-list-text-line-height: 30px;"
    dataSource={${nameGroup.getRecordsEvent}(1, 999)}
    isCell={false}
    slotItem={(current) => <VanFlex mode="block" style="--custom-start: auto; padding: 0 4.26667vw;">
      <VanFlex style="width:100%;--custom-start: auto;border: .5px solid #E5E5E5;\nbox-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);\nborder-radius: 1.06667vw;\nbackground: #fff;\npadding: 3.2vw 4.26667vw;\nfont-size: 3.73333vw;\nmargin-bottom: 2.13333vw;">
        <VanFlex gutter={0} justify="start" alignment="center" style="width:100%;">
          <VanFlex justify="start" alignment="center" style="width:18.66667vw;--custom-start: auto; margin-right: 2.13333vw;">
            <VanText text="流程节点：" style="color:#999;width:18.66667vw;text-align:right;--custom-start: auto;font-size:100%;"></VanText>
          </VanFlex>
          <VanText
            text={(function match(_value) {
              if (_value === true) {
                return current.item.nodeTitle
              } else if (_value === false) {
                return '-'
              } else {
              }
            })(nasl.util.HasValue(current.item.nodeTitle))}
            style="color:#333333;text-align:left;--custom-start: auto; flex: 1;\nfont-size: 100%;">
          </VanText>
        </VanFlex>
        <VanFlex gutter={0} justify="start" alignment="center" style="width:100%;">
          <VanFlex justify="start" alignment="center" style="width:18.66667vw;--custom-start: auto; margin-right: 2.13333vw;">
            <VanText text="处理人：" style="color:#999;width:18.66667vw;text-align:right;--custom-start: auto;font-size:100%;"></VanText>
          </VanFlex>
          <VanText
            text={(function match(_value) {
              if (_value === true) {
                return current.item.recordUser.displayName
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
            style="color:#333333;text-align:left;--custom-start: auto; flex: 1;\nfont-size: 100%;">
          </VanText>
        </VanFlex>
        <VanFlex gutter={0} justify="start" alignment="center" style="width:100%;">
          <VanFlex justify="start" alignment="center" style="width:18.66667vw;--custom-start: auto; margin-right: 2.13333vw;">
            <VanText text="处理时间：" style="color:#999;width:18.66667vw;text-align:right;--custom-start: auto;font-size:100%;"></VanText>
          </VanFlex>
          <VanText
            text={(function match(_value) {
              if (_value === true) {
                return nasl.util.FormatDateTime(current.item.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
              } else if (_value === false) {
                return '-'
              } else {
              }
            })(nasl.util.HasValue(current.item.recordCreatedTime))}
            style="color:#333333;text-align:left;--custom-start: auto; flex: 1;\nfont-size: 100%;">
          </VanText>
        </VanFlex>
        <VanFlex gutter={0} justify="start" alignment="center" wrap={false} style="width:100%;">
          <VanFlex justify="start" alignment="center" style="width:18.66667vw;--custom-start: auto; margin-right: 2.13333vw;">
            <VanText text="审批操作：" style="color:#999;width:18.66667vw;text-align:right;--custom-start: auto;font-size:100%;"></VanText>
          </VanFlex>
          <VanText
            text={current.item.nodeOperationDisplayText}
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
            style="border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;--custom-start: auto;max-width:calc(100% - 22vw);\npadding:0 2.13vw;\ntext-align:left;\nfont-size: 100%;\nline-height:1.6;"
          >
          </VanText>
        </VanFlex>
        <VanFlex gutter={0} justify="start" alignment="center" style="width:100%;">
          <VanFlex justify="start" alignment="center" style="width:18.66667vw;--custom-start: auto; margin-right: 2.13333vw;">
            <VanText text="审批意见：" style="color:#999;width:18.66667vw;text-align:right;--custom-start: auto;font-size:100%;"></VanText>
          </VanFlex>
          <VanText
            text={(function match(_value) {
              if (_value === true) {
                return current.item.nodeOperationComment
              } else if (_value === false) {
                return '-'
              } else {
              }
            })(nasl.util.HasValue(current.item.nodeOperationComment))}
            style="color:#333333;text-align:left;--custom-start: auto; flex: 1;\nfont-size: 100%;">
          </VanText>
        </VanFlex>
      </VanFlex>
    </VanFlex>}>
  </VanList>`;
}
