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
    procInstRecordsPageData: view.getVariableUniqueName('procInstRecordsPageData'), // 流程记录分页数据
    procInstRecordsData: view.getVariableUniqueName('procInstRecordsData'), // 流程记录数据

    // 页面逻辑
    createdEvent: view.getLogicUniqueName('created'), // 页面创建事件
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // 页面创建事件

    // 页面逻辑中的局部变量
    // getRecordsEvent
    procInstRecordsAddData: view.getVariableUniqueName('procInstRecordsAddData'),
  };

  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.procInstRecordsPageData}:{ page: Long, size: Long, total: Long }; //流程记录分页数据
    let ${nameGroup.procInstRecordsData}: List<${structureNamespace}.ProcInstRecord>; //流程记录数据
    function ${nameGroup.getRecordsEvent}() {
      let ${nameGroup.procInstRecordsAddData}
      if (nasl.util.HasValue(${nameGroup.procInstRecordsPageData}.page)) {
      } else {
          ${nameGroup.procInstRecordsPageData}.page = 1
      }
      if (nasl.util.HasValue(${nameGroup.procInstRecordsPageData}.size)) {
      } else {
          ${nameGroup.procInstRecordsPageData}.size = 20
      }
      if (nasl.util.HasValue(taskId)) {
        ${nameGroup.procInstRecordsAddData} = ${logicNamespace}.getProcInstRecords(taskId, ${nameGroup.procInstRecordsPageData}.page, ${
    nameGroup.procInstRecordsPageData
  }.size)
      } else {
      }
      if (nasl.util.HasValue(${nameGroup.procInstRecordsAddData})) {
        if (${nameGroup.procInstRecordsPageData}.page == 1) {
          ${nameGroup.procInstRecordsPageData}.total = ${nameGroup.procInstRecordsAddData}.total
        } else {
        }
        if (nasl.util.HasValue(${nameGroup.procInstRecordsAddData}.list)) {
          nasl.util.AddAll(${nameGroup.procInstRecordsData}, ${nameGroup.procInstRecordsAddData}.list)
        } else {
        }
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
    gutter={0}>
    <ElListComponents
      dataSource={${nameGroup.procInstRecordsData}}
      column={1}
      pagination="none"
      equalWidth={true}
      style="font-size:14px;"
      slotDefault={(current) => <ElFlex direction="horizontal" mode="block">
        <ElFlex
          direction="horizontal"
          mode="flex"
          justify="start"
          alignment="center"
          gutter={0}
          style="height:16px; --custom-start: auto; font-size:0;">
          <ElFlex
            _if={(current.item.nodeOperation != 'revert') && (current.item.nodeOperation != 'reject') && (current.item.nodeOperation != 'approve') && (current.item.nodeOperation != 'submit')}
            direction="horizontal"
            mode="block"
            heightStretch="false"
            widthStretch="false"
            gutter={0}
            style="height:16px;width:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#337eff;border-top-color:#337eff;border-bottom-color:#337eff;border-left-color:#337eff;border-right-color:#337eff; --custom-start: auto; border-radius: 100%;">
          </ElFlex>
          <ElFlex
            _if={(current.item.nodeOperation == 'approve') || (current.item.nodeOperation == 'submit')}
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
            _if={(current.item.nodeOperation == 'revert') || (current.item.nodeOperation == 'reject')}
            direction="horizontal"
            widthStretch="false"
            heightStretch="false"
            mode="flex"
            justify="center"
            alignment="center"
            gutter={0}
            style="background-color:#f24957;width:16px;height:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#f24957;border-top-color:#f24957;border-bottom-color:#f24957;border-left-color:#f24957;border-right-color:#f24957; --custom-start: auto; border-radius: 100%;">
            <ElIcon
              name="CloseBold"
              style="color:#ffffff;font-size:14px;background-color:#f24957; --custom-start: auto; line-height:1em;border-radius: 100%;">
            </ElIcon>
          </ElFlex>
          <ElText
            text={current.item.nodeTitle}
            style="margin-left:10px;font-size:14px; --custom-start: auto; line-height:14px;font-weight: 500;">
          </ElText>
        </ElFlex>
        <ElFlex
          direction="horizontal"
          mode="flex"
          justify="start"
          alignment="start"
          gutter={0}
          wrap={true}
          style="height:auto;margin-left:7px;width:auto; --custom-start: auto; display: flex;align-items: stretch;">
          <ElFlex
            _if={${nameGroup.procInstRecordsData}.length != current.index + 1}
            direction="horizontal"
            mode="block"
            widthStretch="false"
            gutter={0}
            style="width:0px;border-color:#337eff;border-top-color:#337eff;border-bottom-color:#337eff;border-left-color:#337eff;border-right-color:#337eff;">
          </ElFlex>
          <ElFlex
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
                direction="horizontal"
                mode="flex"
                justify="start"
                alignment="center"
                gutter={0}
                style="color:#999999;height:22.4px;">
                <ElText text="处理时间"></ElText>
              </ElFlex>
              <ElFlex
                direction="horizontal"
                mode="flex"
                justify="start"
                alignment="center"
                gutter={0}
                style="color:#999999;height:22.4px;">
                <ElText text="审批操作"></ElText>
              </ElFlex>
              <ElFlex
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
                  overflow="ellipsis">
                </ElText>
              </ElFlex>
              <ElFlex
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
                      return nasl.util.FormatDateTime(current.item.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.recordCreatedTime))}
                  overflow="ellipsis">
                </ElText>
              </ElFlex>
              <ElFlex
                direction="horizontal"
                mode="flex"
                justify="start"
                alignment="center"
                wrap={false}
                gutter={0}
                style="height:24.3px;width:100%;">
                <ElText
                  text={current.item.nodeOperationDisplayText}
                  overflow="ellipsis"
                  _color={(function match(_value) {
                    if (current.item.nodeOperation === 'end' || current.item.nodeOperation === 'terminate') {
                      return '#666666'
                    } else if (current.item.nodeOperation === 'revert' || current.item.nodeOperation === 'withdraw') {
                      return '#FF8024'
                    } else if (current.item.nodeOperation === 'reject') {
                      return '#F24957'
                    } else if (current.item.nodeOperation === 'approve') {
                      return '#26BD71'
                    } else if (current.item.nodeOperation === 'launch' || current.item.nodeOperation === 'submit' || current.item.nodeOperation === 'reassign' || current.item.nodeOperation === 'addSign' || current.item.nodeOperation === 'cc') {
                      return '#337EFF'
                    } else {
                      return '#666666'
                    }
                  })(current.item.nodeOperation)}
                  _background-color={(function match(_value) {
                    if (current.item.nodeOperation === 'end' || current.item.nodeOperation === 'terminate') {
                      return '#F5F5F5'
                    } else if (current.item.nodeOperation === 'revert' || current.item.nodeOperation === 'withdraw') {
                      return '#FFF2E9'
                    } else if (current.item.nodeOperation === 'reject') {
                      return '#FEEDEF'
                    } else if (current.item.nodeOperation === 'approve') {
                      return '#E9F8F0'
                    } else if (current.item.nodeOperation === 'launch' || current.item.nodeOperation === 'submit' || current.item.nodeOperation === 'reassign' || current.item.nodeOperation === 'addSign' || current.item.nodeOperation === 'cc') {
                      return '#EAF2FF'
                    } else {
                      return '#F5F5F5'
                    }
                  })(current.item.nodeOperation)}
                  style="padding-top:1px;padding-bottom:1px;padding-left:8px;padding-right:8px;border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;">
                </ElText>
              </ElFlex>
              <ElFlex
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
                      return current.item.nodeOperationComment
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.nodeOperationComment))}
                  overflow="ellipsis">
                </ElText>
              </ElFlex>
            </ElFlex>
          </ElFlex>
        </ElFlex>
      </ElFlex>
      }>
    </ElListComponents>
    <ElFlex
      direction="horizontal"
      mode="block"
      gutter={16}
      style="width:240px;font-size:14px;text-align:center;">
      <ElLink
        _if={${nameGroup.procInstRecordsPageData}.total > ${nameGroup.procInstRecordsData}.length}
        text="查看更多"
        type="primary"
        onClick={
          function click(){
            ${nameGroup.procInstRecordsPageData}.page = ${nameGroup.procInstRecordsPageData}.page + 1;
            ${nameGroup.getRecordsEvent}();
          }
        }>
      </ElLink>
      <ElText
        _if={!(nasl.util.HasValue(${nameGroup.procInstRecordsData}))}
        text="暂无流程记录"
        style="color:#999999;">
      </ElText>
    </ElFlex>
  </ElFlex>`;
}
