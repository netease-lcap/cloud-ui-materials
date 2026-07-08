import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程记录的表格
export function genFlProcessRecordTable(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // getProcInstRecords
    tableViewRecordRef: view.getViewElementUniqueName('table_view_record'), // 撤回重新提交到单选组
    proccessPredictionList: view.getVariableUniqueName('proccessPredictionList'), // 流程预测列表
    isUnfold: view.getVariableUniqueName('isUnfold'), // 预测节点是否展开
  };

  // 流程需要使用页面输入参数'taskId'，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.proccessPredictionList}: List<{ data: ${structureNamespace}.ProcInstRecord, type: String }>; //流程预测列表
    let ${nameGroup.isUnfold}: Boolean = false;

    function ${nameGroup.getRecordsEvent}() {
      let currentProccessInfo
      let PredictionInfo
      let tableData: List<{ data: ${structureNamespace}.ProcInstRecord, type: String }>
      let proInstRecordInfo
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
        ${nameGroup.proccessPredictionList} = nasl.util.ListTransform(PredictionInfo, (item) => ({ data: new ${structureNamespace}.ProcInstRecord({ nodeTitle: item.nodeName, nodeName: item.nodeTitle, recordUser: new ${structureNamespace}.ProcessUser({ userName: nasl.util.Join(nasl.util.ListTransform(item.predictedUsers, (item1) => item1.userName), ","), displayName: nasl.util.Join(nasl.util.ListTransform(item.predictedUsers, (item1) => (function match(_value) { if (_value === true) { return item1.displayName } else if (_value === false) { return item1.userName } else { } })(nasl.util.HasValue(item1.displayName))), ",") }), recordCreatedTime: null, nodeOperationComment: null, nodeOperation: null, nodeOperationDisplayText: null, procInstId: currentProccessInfo.procInstId }), type: "Prediction" }))
        result = tableData
      } else {
      }
      return result
    }//查询流程记录

    return ${genTemplate(nameGroup)}
  }`;
}

function genTemplate(nameGroup: Record<string, string>) {
  return `<ULinearLayout direction="vertical" gap="none">
    <UTableView
    ref="${nameGroup.tableViewRecordRef}"
    dataSource={${nameGroup.getRecordsEvent}()}
    pagination={false}
    showSizer={true}
    pageSize={20}
    pageNumber={1}
    dataSourceWatch={[]}>
      <UTableViewColumn
        slotTitle={
          <UText text="流程节点"></UText>
        }
        slotCell={
          (current) => <u-linear-layout direction="horizontal" wrap={true}>
            <UText
              _if={current.item.type != "ProcInstText"}
              text={(function match(_value) {
                if (_value === true) {
                  return current.item.data.nodeTitle
                } else if (_value === false) {
                  return '-'
                } else {
                }
              })(nasl.util.HasValue(current.item.data.nodeTitle))}>
            </UText>
            <UAnchor
              _if={current.item.type == "ProcInstText"}
              label="ProcInstText">
              <u-linear-layout
                direction="horizontal"
                wrap={true}
                onClick={function click() {
                  if (${nameGroup.isUnfold}) {
                    ${nameGroup.isUnfold} = false
                  } else {
                    ${nameGroup.isUnfold} = true
                  }
                }}
                style=" --custom-start: auto; cursor:pointer;">
                <IIco name="bottom-arrow" icotype="only" style="margin-right:8px;color:#3377FF;">
                  <UText text="图标"></UText>
                </IIco>
                <UText _if={!(${nameGroup.isUnfold})} text="预测节点" style="color:#3377FF;"></UText>
                <UText _if={${nameGroup.isUnfold}} text="隐藏预测节点" style="color:#3377FF;"></UText>
              </u-linear-layout>
            </UAnchor>
          </u-linear-layout>
        }
        slotExpander={
          (current) => <UTableViewExpander></UTableViewExpander>
        }>
      </UTableViewColumn>

      <UTableViewColumn
        slotTitle={
          <UText text="处理人"></UText>
        }
        slotCell={
          (current) => <UText
            _if={current.item.type != "ProcInstText"}
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
          ></UText>
        }
        slotExpander={
          (current) => <UTableViewExpander></UTableViewExpander>
        }>
      </UTableViewColumn>

      <UTableViewColumn
        slotTitle={
          <UText text="处理时间"></UText>
        }
        slotCell={
          (current) => <UText
            _if={current.item.type != "ProcInstText"}
            text={(function match(_value) {
              if (_value === true) {
                return nasl.util.FormatDateTime(current.item.data.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
              } else if (_value === false) {
                return '-'
              } else {
              }
            })(nasl.util.HasValue(current.item.data.recordCreatedTime))}
          ></UText>
        }
        slotExpander={
          (current) => <UTableViewExpander></UTableViewExpander>
        }>
      </UTableViewColumn>

      <UTableViewColumn
        slotTitle={
          <UText text="审批操作"></UText>
        }
        slotCell={
          (current) => <u-linear-layout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center">
            <UText
              _if={current.item.type != "ProcInstText"}
              style="padding-left:8px;padding-right:8px;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;padding-top:1px;padding-bottom:1px;width:auto;"
              overflow="ellipsis"
              widthStretch="false"
              display="inline"
              text={current.item.data.nodeOperationDisplayText}
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
          </u-linear-layout>
        }
        slotExpander={
          (current) => <UTableViewExpander></UTableViewExpander>
        }>
      </UTableViewColumn>

      <UTableViewColumn
          slotTitle={
            <UText text="审批意见"></UText>
          }
          slotCell={
            (current) => <UText
              _if={current.item.type != "ProcInstText"}
              text={(function match(_value) {
                if (_value === true) {
                  return current.item.data.nodeOperationComment
                } else if (_value === false) {
                  return '-'
                } else {
                }
              })(nasl.util.HasValue(current.item.data.nodeOperationComment))}
            ></UText>
          }
          slotExpander={
            (current) => <UTableViewExpander></UTableViewExpander>
          }>
        </UTableViewColumn>

    </UTableView>
    <UTableView
      _if={(${nameGroup.proccessPredictionList}.length > 0) && ${nameGroup.isUnfold}}
      pagination={false}
      pageSize={20}
      pageNumber={1}
      showHead={false}
      dataSourceWatch={[]}
      dataSource={${nameGroup.proccessPredictionList}}
      style="--table-view-row-hover-background:#F7F8FA;--table-view-td-background-color:#F7F8FA;">
      <UTableViewColumn
        slotExpander={(current) => <UTableViewExpander item={current.item}></UTableViewExpander>}
        slotTitle={<UText text="表格列"></UText>}
        slotCell={(current) => <>
          <UText
            text={(function match(_value) {
              if (_value === true) {
                return current.item.data.nodeName
              } else if (_value === false) {
                return '-'
              } else {
              }
            })(nasl.util.HasValue(current.item.data.nodeName))}
            style="margin-right:12px;">
          </UText>
          <UText
            text="预测"
            style="padding-left:8px;padding-right:8px;padding-top:2px;padding-bottom:2px;background-color:#F2F3F5;color:#999999;border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;">
          </UText>
        </>}>
      </UTableViewColumn>
      <UTableViewColumn
        slotExpander={(current) => <UTableViewExpander item={current.item}></UTableViewExpander>}
        slotTitle={<UText text="表格列"></UText>}
        slotCell={(current) => <UText
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
        </UText>}>
      </UTableViewColumn>
      <UTableViewColumn
        slotExpander={(current) => <UTableViewExpander item={current.item}></UTableViewExpander>}
        slotTitle={<UText text="表格列"></UText>}
        slotCell={(current) => <UText
          text={(function match(_value) {
            if (_value === true) {
              return nasl.util.FormatDateTime(current.item.data.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
            } else if (_value === false) {
              return '-'
            } else {
            }
          })(nasl.util.HasValue(current.item.data.recordCreatedTime))}>
        </UText>}>
      </UTableViewColumn>
      <UTableViewColumn
        slotExpander={(current) => <UTableViewExpander item={current.item}></UTableViewExpander>}
        slotTitle={<UText text="表格列"></UText>}
        slotCell={(current) => <UText text={current.item.data.nodeOperation}></UText>}>
      </UTableViewColumn>
      <UTableViewColumn
        slotExpander={(current) => <UTableViewExpander item={current.item}></UTableViewExpander>}
        slotTitle={<UText text="表格列"></UText>}
        slotCell={(current) => <UText
          text={(function match(_value) {
            if (_value === true) {
              return current.item.data.nodeOperationComment
            } else if (_value === false) {
              return '-'
            } else {
            }
          })(nasl.util.HasValue(current.item.data.nodeOperationComment))}>
        </UText>}>
      </UTableViewColumn>
    </UTableView>
  </ULinearLayout>`;
}
