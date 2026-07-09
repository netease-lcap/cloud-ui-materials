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
    proccessRecordData: view.getVariableUniqueName('proccessRecordData'), // 流程记录数据
    isUnfold: view.getVariableUniqueName('isUnfold'), // 预测节点是否展开
    createdEvent: view.getLogicUniqueName('created'), // 页面创建事件
  };

  // 流程需要使用页面输入参数'taskId'，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.isUnfold}: Boolean; //预测节点是否展开
    let ${nameGroup.proccessRecordData}: List<{ data: ${structureNamespace}.ProcInstRecord, type: String }>; //流程记录数据

    function ${nameGroup.getRecordsEvent}() {
      let proInstRecordInfo
      let currentProccessInfo
      let PredictionInfo
      let tableData: List<{ data: ${structureNamespace}.ProcInstRecord, type: String }>
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
        ${nameGroup.proccessRecordData} = tableData
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

function genTemplate(nameGroup: Record<string, string>) {
  return `<VanList
      dataSource={${nameGroup.proccessRecordData}}
      isCell={false}
      column={1}
      equalWidth={false}
      style="width:100%; --custom-start: auto; --van-list-text-line-height: 30px;"
      slotItem={(current) => <VanFlex mode="block" style="width:100%; --custom-start: auto; padding: 0 4.26667vw;">
        <VanFlex
          _if={(current.item.type != "ProcInstText") && ((current.item.type == "History") || (current.item.type == "Current") || ${nameGroup.isUnfold})}
          mode="block"
          style="width:100%;--custom-start: auto;border: .5px solid #E5E5E5;
box-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);
border-radius: 1.06667vw;
background: #fff;
padding: 3.2vw 4.26667vw;
font-size: 3.73333vw;
margin-bottom: 2.13333vw;">
          <VanFlex gutter={0} justify="start" alignment="center" wrap={false} widthStretch="false" style="margin-bottom:12px;">
            <VanFlex justify="start" alignment="center" style="width:18.66667vw;--custom-start: auto; margin-right: 2.13333vw;">
              <VanText text="流程节点：" style="color:#999;width:18.66667vw;text-align:right;--custom-start: auto;font-size:100%;"></VanText>
            </VanFlex>
            <VanText
              style="color:#333333;text-align:left; --custom-start: auto; 
font-size: 100%;"
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
              text="预测"
              style="color:#999999;text-align:left;margin-left:10px;padding-left:8px;padding-right:8px;padding-top:2px;padding-bottom:2px;background-color:#F2F3F5;border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px; --custom-start: auto; line-height:1.2em;">
            </VanText>
          </VanFlex>

          <VanFlex gutter={0} justify="start" alignment="center" widthStretch="false" style="margin-bottom:12px;">
            <VanFlex justify="start" alignment="center" style="width:18.66667vw;--custom-start: auto; margin-right: 2.13333vw;">
              <VanText text="处理人：" style="color:#999;width:18.66667vw;text-align:right;--custom-start: auto;font-size:100%;"></VanText>
            </VanFlex>
            <VanText
              style="color:#333333;text-align:left; --custom-start: auto; 
font-size: 100%;"
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
          </VanFlex>

          <VanFlex
            _if={current.item.type != "Prediction"}
            gutter={0} justify="start" alignment="center" style="margin-bottom:12px;">
            <VanFlex justify="start" alignment="center" style="width:18.66667vw;--custom-start: auto; margin-right: 2.13333vw;">
              <VanText text="处理时间：" style="color:#999;width:18.66667vw;text-align:right;--custom-start: auto;font-size:100%;"></VanText>
            </VanFlex>
            <VanText
              style="color:#333333;text-align:left; --custom-start: auto; 
font-size: 100%;"
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
            gutter={0} justify="start" alignment="center" wrap={false} style="margin-bottom:12px;">
            <VanFlex justify="start" alignment="center" style="width:18.66667vw;--custom-start: auto; margin-right: 2.13333vw;">
              <VanText text="审批操作：" style="color:#999;width:18.66667vw;text-align:right;--custom-start: auto;font-size:100%;"></VanText>
            </VanFlex>
            <VanText
              text={current.item.data.nodeOperationDisplayText}
              style="border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px; --custom-start: auto; max-width:calc( 100% - 22vw);
padding:0 2.13vw;
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
                  return '#666666'
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
                  return '#F5F5F5'
                }
              })(current.item.data.nodeOperation)}>
            </VanText>
          </VanFlex>

          <VanFlex
            _if={current.item.type != "Prediction"}
            gutter={0} justify="start" alignment="center" style="margin-bottom:12px;">
            <VanFlex justify="start" alignment="center" style="width:18.66667vw;--custom-start: auto; margin-right: 2.13333vw;">
              <VanText text="审批意见：" style="color:#999;width:18.66667vw;text-align:right;--custom-start: auto;font-size:100%;"></VanText>
            </VanFlex>
            <VanText
              style="color:#333333;text-align:left; --custom-start: auto; 
font-size: 100%;"
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
          _if={current.item.type == "ProcInstText"}
          justify="start" alignment="center" wrap={false} gutter={10}
          onClick={function click(event) {
            if (${nameGroup.isUnfold}) {
              ${nameGroup.isUnfold} = false
            } else {
              ${nameGroup.isUnfold} = true
            }
          }}
          style="width:100%;">
          <VanIcon name="arrow-down" style="color:#3377ff;"></VanIcon>
          <VanText _if={!(${nameGroup.isUnfold})} text="预测节点" style="color:#3377ff;"></VanText>
          <VanText _if={${nameGroup.isUnfold}} text="隐藏预测节点" style="color:#3377ff;"></VanText>
        </VanFlex>
      </VanFlex>}>
    </VanList>`;
}
