import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程信息
export function genFlProcessMyProcess(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    // 局部变量
    tabValue: view.getVariableUniqueName('myProcessTabValue'), // 我的流程tab值
    filterVar: view.getVariableUniqueName('myProcessFilter'), // 我的流程筛选项
    // 页面逻辑
    reloadFilter: view.getLogicUniqueName('reloadFilter'), // 筛选项初始化
    getMyPendingTasks: view.getLogicUniqueName('getMyPendingTasks'), // 获取我的待办数据
    getMyCompletedTasks: view.getLogicUniqueName('getMyCompletedTasks'), // 获取我的已办数据
    getMyInitiatedTasks: view.getLogicUniqueName('getMyInitiatedTasks'), // 获取我的发起数据
    getMyCCTasks: view.getLogicUniqueName('getMyCCTasks'), // 获取抄送我的数据
    getProcInstInitiators: view.getLogicUniqueName('getProcInstInitiators'), // 获取发起人
    goToPage: view.getLogicUniqueName('goToPage'), // 跳转页面
    // 页面逻辑的局部变量
    // goToPage
    url: view.getVariableUniqueName('url'), // 跳转页面url
    // ref
    tableView1: view.getViewElementUniqueName('table_view_1'), // 我的待办表格
    tableView2: view.getViewElementUniqueName('table_view_1'), // 我的已办表格
    tableView3: view.getViewElementUniqueName('table_view_1'), // 我的发起表格
    tableView4: view.getViewElementUniqueName('table_view_1'), // 抄送我的表格
  };

  return `export function view() {
    let ${nameGroup.tabValue}: string = '待办'; //我的流程tab值
    let ${
      nameGroup.filterVar
    }: { procDefKey: string, procInstInitiator: string, procInstStartTimeAfter: DateTime, procInstStartTimeBefore: DateTime, viewed: Boolean }; //我的流程筛选项

    function ${nameGroup.reloadFilter}() {
      ${nameGroup.filterVar}.procDefKey = null;
      ${nameGroup.filterVar}.procInstInitiator = null;
      ${nameGroup.filterVar}.procInstStartTimeAfter = null;
      ${nameGroup.filterVar}.procInstStartTimeBefore = null;
      ${nameGroup.filterVar}.viewed = false;
    }//筛选项初始化

    function ${nameGroup.getMyPendingTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyPendingTasks(${nameGroup.filterVar}.procDefKey, ${nameGroup.filterVar}.procInstStartTimeAfter, ${
    nameGroup.filterVar
  }.procInstStartTimeBefore, ${nameGroup.filterVar}.procInstInitiator, page, size, undefined);
      return result;
    }//获取我的待办数据

    function ${nameGroup.getMyCompletedTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyCompletedTasks(${nameGroup.filterVar}.procDefKey, ${nameGroup.filterVar}.procInstStartTimeAfter, ${
    nameGroup.filterVar
  }.procInstStartTimeBefore, ${nameGroup.filterVar}.procInstInitiator, page, size, undefined)
      return result;
    }//获取我的已办数据

    function ${nameGroup.getMyInitiatedTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyInitiatedTasks(${nameGroup.filterVar}.procDefKey, ${nameGroup.filterVar}.procInstStartTimeAfter, ${
    nameGroup.filterVar
  }.procInstStartTimeBefore, undefined, page, size, undefined)
      return result;
    }//获取我的发起数据

    function ${nameGroup.getMyCCTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyCCTasks(${nameGroup.filterVar}.procDefKey, ${nameGroup.filterVar}.procInstStartTimeAfter, ${
    nameGroup.filterVar
  }.procInstStartTimeBefore, ${nameGroup.filterVar}.procInstInitiator, ${nameGroup.filterVar}.viewed, page, size, undefined)
      return result;
    }//获取抄送我的数据

    function ${nameGroup.getProcInstInitiators}(page: Long, size: Long, filterText: string) {
      let result;
      result = ${logicNamespace}.getProcInstInitiators(page, size, filterText);
      return result;
    }//获取发起人

    function ${nameGroup.goToPage}(itemTaskId: string) {
      let ${nameGroup.url};
      ${nameGroup.url} = ${logicNamespace}.getTaskDestinationUrl(itemTaskId, undefined);
      nasl.js.block(\`'use JSBlock' \n// 拼接全量url
${nameGroup.url} = window.location.origin + ${nameGroup.url};\`);
      nasl.ui.gotoLink(${nameGroup.url}, '_self')
    }//跳转页面

    return ${genTemplate(nameGroup, logicNamespace, structureNamespace)}
  }`;
}

function genTemplate(nameGroup: Record<string, string>, logicNamespace: string, structureNamespace: string) {
  return `<ElTabs
    style="font-size:14px;--el-tabs-header-height:50px; --custom-start: auto; header-width: 1200px;"
    modelValue={$sync(${nameGroup.tabValue})}
    tabPosition="top"
    stretch={false}
    onTab-click={
      function tabclick(){
        ${nameGroup.reloadFilter}()
      }
    }>
    <ElTabPane
      style="--el-tabs-header-height:40px;"
      name="待办" 
      slotLabel={
        <ElFlex direction="horizontal" mode="flex" justify="center" alignment="center" style="width:90px;">
          <ElText text="我的待办" size="default"></ElText>
        </ElFlex>
      }>
      <ElFlex direction="horizontal" mode="block" gutter={0}>
        <ElFlex direction="horizontal" mode="flex" justify="space-between" alignment="start" gutter={12} wrap={false} style="margin-bottom:15px;margin-top:3px;">
          <ElFlex direction="horizontal" mode="flex" justify="start"  alignment="center" gutter={0}>
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="流程" widthStretch="false" style="text-align:right;padding-right:20px;width:56px;"></ElText>
              <ElSelect
                modelValue={$sync(${nameGroup.filterVar}.procDefKey)}
                dataSource={${logicNamespace}.getProcDefInfos(undefined)}
                textField="procDefTitle"
                valueField="procDefKey"
                filterable={true}
                clearable={true}
                placeholder="请选择">
              </ElSelect>
            </ElFlex>
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="发起时间" widthStretch="false" style="text-align:right;padding-right:20px;width:62px;"></ElText>
              <ElDatePicker
                type="daterange"
                placeholder="请选择日期"
                startPlaceholder="开始日期"
                endPlaceholder="结束日期"
                range={true}
                startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
                endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
                rangeSeparator="-"
                format="YYYY-MM-DD"
                valueFormat="">
              </ElDatePicker>
            </ElFlex>
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="发起人" widthStretch="false" style="text-align:right;padding-right:20px;width:62px;"></ElText>
              <ElSelect
                modelValue={$sync(${nameGroup.filterVar}.procInstInitiator)}
                dataSource={${nameGroup.getProcInstInitiators}(1, 999, elements.$ce.filterText)}
                valueField="userName"
                filterable={true}
                clearable={true}
                placeholder="请选择"
                optionSlot={true}
                slotItem={(current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.displayName + '（' + current.item.userName + '）'
                    } else if (_value === false) {
                      return current.item.userName
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.displayName))}
                ></ElText>}>
              </ElSelect>
            </ElFlex>
          </ElFlex>
          <ElButton
            style="padding-left:24px;padding-right:24px;margin-right:0px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;min-width:78px;"
            type="primary" 
            text="查 询" 
            onClick={
              function click(){
                $refs.${nameGroup.tableView1}.reload()
              }
            }>
          </ElButton>
        </ElFlex>
        <ElFlex direction="horizontal" mode="block">
          <ElTable
            ref="${nameGroup.tableView1}"
            style="--el-table-header-bg-color:#f7f8fa;"
            dataSource={${nameGroup.getMyPendingTasks}(elements.$ce.currentPage, elements.$ce.pageSize)}
            sticky={false}
            tableLayout="fixed"
            border={false}
            pagination={true}
            defaultPageSize={20}
            showJumper={false}
            showHeader={true}
            size="default">
            <ElTableColumn
              slotHeader={
                <ElText text="流程标题"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procInstTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstTitle))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="流程类型"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procDefTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procDefTitle))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="当前节点"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item) => item.currNodeTitle), '，')
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstCurrNodes))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="发起人"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procInstInitiator.displayName
                    } else if (_value === false) {
                      return (function match(_value) {
                        if (_value === true) {
                          return current.item.procInstInitiator.userName
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstInitiator.userName))
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstInitiator.displayName))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="发起时间"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstStartTime))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="操作"></ElText>
              }
              slotDefault={
                (current) => <ElLink
                  text="审批"
                  type="primary"
                  onClick={
                    function click(){
                      ${nameGroup.goToPage}(current.item.taskId)
                    }
                  }></ElLink>
              }>
            </ElTableColumn>
          </ElTable>
        </ElFlex>
      </ElFlex>
    </ElTabPane>
    <ElTabPane
      name="已办" 
      slotLabel={
        <ElFlex direction="horizontal" mode="flex" justify="center" alignment="center" style="width:90px;">
          <ElText text="我的已办" size="default"></ElText>
        </ElFlex>
      }>
      <ElFlex direction="horizontal" mode="block" gutter={0}>
        <ElFlex direction="horizontal" mode="flex" justify="space-between" alignment="start" gutter={12} wrap={false} style="margin-bottom:15px;margin-top:3px;">
          <ElFlex direction="horizontal" mode="flex" justify="start" alignment="center" gutter={0}>
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="流程" widthStretch="false" style="text-align:right;padding-right:20px;width:56px;"></ElText>
              <ElSelect
                modelValue={$sync(${nameGroup.filterVar}.procDefKey)}
                dataSource={${logicNamespace}.getProcDefInfos(undefined)}
                textField="procDefTitle"
                valueField="procDefKey"
                filterable={true}
                clearable={true}
                placeholder="请选择">
              </ElSelect>
            </ElFlex>
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="发起时间" widthStretch="false" style="text-align:right;padding-right:20px;width:62px;"></ElText>
              <ElDatePicker
                type="daterange"
                placeholder="请选择日期"
                startPlaceholder="开始日期"
                endPlaceholder="结束日期"
                range={true}
                startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
                endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
                rangeSeparator="-"
                format="YYYY-MM-DD"
                valueFormat="">
              </ElDatePicker>
            </ElFlex>
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="发起人" widthStretch="false" style="text-align:right;padding-right:20px;width:62px;"></ElText>
              <ElSelect
                modelValue={$sync(${nameGroup.filterVar}.procInstInitiator)}
                dataSource={${nameGroup.getProcInstInitiators}(1, 999, elements.$ce.filterText)}
                valueField="userName"
                filterable={true}
                clearable={true}
                placeholder="请选择"
                optionSlot={true}
                slotItem={(current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.displayName + '（' + current.item.userName + '）'
                    } else if (_value === false) {
                      return current.item.userName
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.displayName))}
                ></ElText>}>
              </ElSelect>
            </ElFlex>
          </ElFlex>
          <ElButton
          style="padding-left:24px;padding-right:24px;margin-right:0px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;min-width:78px;"
          type="primary" 
          text="查 询" 
          onClick={
            function click(){
              $refs.${nameGroup.tableView2}.reload()
            }
          }>
          </ElButton>
        </ElFlex>
        <ElFlex direction="horizontal" mode="block" gutter={0}>
          <ElTable
            ref="${nameGroup.tableView2}"
            style="--el-table-header-bg-color:#f7f8fa;"
            dataSource={${nameGroup.getMyCompletedTasks}(elements.$ce.currentPage, elements.$ce.pageSize)}
            sticky={false}
            tableLayout="fixed"
            border={false}
            pagination={true}
            defaultPageSize={20}
            showJumper={false}
            showHeader={true}
            size="default">
            <ElTableColumn
              slotHeader={
                <ElText text="流程标题"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procInstTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstTitle))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="流程类型"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procDefTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procDefTitle))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="处理节点"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.nodeTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.nodeTitle))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="发起人"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procInstInitiator.displayName
                    } else if (_value === false) {
                      return (function match(_value) {
                        if (_value === true) {
                          return current.item.procInstInitiator.userName
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstInitiator.userName))
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstInitiator.displayName))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="发起时间"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstStartTime))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="操作"></ElText>
              }
              slotDefault={
                (current) => <ElLink
                  text="查看"
                  type="primary"
                  onClick={
                    function click(){
                      ${nameGroup.goToPage}(current.item.taskId)
                    }
                  }></ElLink>
              }>
            </ElTableColumn>
          </ElTable>
        </ElFlex>
      </ElFlex>
    </ElTabPane>
    <ElTabPane
      name="发起" 
      slotLabel={
        <ElFlex direction="horizontal" mode="flex" justify="center" alignment="center" style="width:90px;">
          <ElText text="我的发起" size="default"></ElText>
        </ElFlex>
      }>
      <ElFlex direction="horizontal" mode="block" gutter={0}>
        <ElFlex direction="horizontal" mode="flex" justify="space-between" alignment="start" gutter={12} wrap={false} style="margin-bottom:15px;margin-top:3px;">
          <ElFlex direction="horizontal" mode="flex" justify="start" alignment="center" gutter={0}>
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="流程" widthStretch="false" style="text-align:right;padding-right:20px;width:56px;"></ElText>
              <ElSelect
                modelValue={$sync(${nameGroup.filterVar}.procDefKey)}
                dataSource={${logicNamespace}.getProcDefInfos(undefined)}
                textField="procDefTitle"
                valueField="procDefKey"
                filterable={true}
                clearable={true}
                placeholder="请选择">
              </ElSelect>
            </ElFlex>
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="发起时间" widthStretch="false" style="text-align:right;padding-right:20px;width:62px;"></ElText>
              <ElDatePicker
                type="daterange"
                placeholder="请选择日期"
                startPlaceholder="开始日期"
                endPlaceholder="结束日期"
                range={true}
                startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
                endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
                rangeSeparator="-"
                format="YYYY-MM-DD"
                valueFormat="">
              </ElDatePicker>
            </ElFlex>
          </ElFlex>
          <ElButton
          style="padding-left:24px;padding-right:24px;margin-right:0px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;min-width:78px;"
          type="primary" 
          text="查 询" 
          onClick={
            function click(){
              $refs.${nameGroup.tableView3}.reload()
            }
          }>
          </ElButton>
        </ElFlex>
        <ElFlex direction="horizontal" mode="block" gutter={0}>
          <ElTable
            ref="${nameGroup.tableView3}"
            style="--el-table-header-bg-color:#f7f8fa;"
            dataSource={${nameGroup.getMyInitiatedTasks}(elements.$ce.currentPage, elements.$ce.pageSize)}
            sticky={false}
            tableLayout="fixed"
            border={false}
            pagination={true}
            defaultPageSize={20}
            showJumper={false}
            showHeader={true}
            size="default">
            <ElTableColumn
              slotHeader={
                <ElText text="流程标题"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procInstTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstTitle))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="流程类型"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procDefTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procDefTitle))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="当前节点"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item) => item.currNodeTitle), '，')
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstCurrNodes))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="当前处理人"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return nasl.util.Join(nasl.util.ListDistinct(nasl.util.ListTransform(nasl.util.ListFlatten(nasl.util.ListTransform(nasl.util.ListFilter(current.item.procInstCurrNodes, (item) => nasl.util.HasValue(item.currNodeParticipants)), (item) => item.currNodeParticipants)), (item: ${structureNamespace}.ProcessUser) => (function match(_value) {
                        if (_value === true) {
                          return item.displayName
                        } else if (_value === false) {
                          return item.userName
                        } else {
                        }
                      })(nasl.util.HasValue(item.displayName)))), '，')
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstCurrNodes, nasl.util.ListFilter(current.item.procInstCurrNodes, (item) => nasl.util.HasValue(item.currNodeParticipants))))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="发起人"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procInstInitiator.displayName
                    } else if (_value === false) {
                      return (function match(_value) {
                        if (_value === true) {
                          return current.item.procInstInitiator.userName
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstInitiator.userName))
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstInitiator.displayName))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="发起时间"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstStartTime))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="操作"></ElText>
              }
              slotDefault={
                (current) => <ElLink
                  text="查看"
                  type="primary"
                  onClick={
                    function click(){
                      ${nameGroup.goToPage}(current.item.taskId)
                    }
                  }></ElLink>
              }>
            </ElTableColumn>
          </ElTable>
        </ElFlex>
      </ElFlex>
    </ElTabPane>
    <ElTabPane
      style="border-top-right-radius:4px;border-bottom-right-radius:4px;"
      name="抄送" 
      slotLabel={
        <ElFlex direction="horizontal" mode="flex" justify="center" alignment="center" style="width:90px;">
          <ElText text="抄送我的" size="default"></ElText>
        </ElFlex>
      }>
      <ElFlex direction="horizontal" mode="block" gutter={0}>
        <ElFlex direction="horizontal" mode="flex" justify="space-between" alignment="start" gutter={12} wrap={false} style="margin-bottom:15px;margin-top:3px;">
          <ElFlex direction="horizontal" mode="flex" justify="start" alignment="center" gutter={0} widthStretch="false" style="flex: 1;">
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="流程" widthStretch="false" style="text-align:right;padding-right:20px;width:56px;"></ElText>
              <ElSelect
                modelValue={$sync(${nameGroup.filterVar}.procDefKey)}
                dataSource={${logicNamespace}.getProcDefInfos(undefined)}
                textField="procDefTitle"
                valueField="procDefKey"
                filterable={true}
                clearable={true}
                placeholder="请选择">
              </ElSelect>
            </ElFlex>
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="发起时间" widthStretch="false" style="text-align:right;padding-right:20px;width:62px;"></ElText>
              <ElDatePicker
                type="daterange"
                placeholder="请选择日期"
                startPlaceholder="开始日期"
                endPlaceholder="结束日期"
                range={true}
                startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
                endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
                rangeSeparator="-"
                format="YYYY-MM-DD"
                valueFormat="">
              </ElDatePicker>
            </ElFlex>
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="发起人" widthStretch="false" style="text-align:right;padding-right:20px;width:62px;"></ElText>
              <ElSelect
                modelValue={$sync(${nameGroup.filterVar}.procInstInitiator)}
                dataSource={${nameGroup.getProcInstInitiators}(1, 999, elements.$ce.filterText)}
                valueField="userName"
                filterable={true}
                clearable={true}
                placeholder="请选择"
                optionSlot={true}
                slotItem={(current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.displayName + '（' + current.item.userName + '）'
                    } else if (_value === false) {
                      return current.item.userName
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.displayName))}
                ></ElText>}>
              </ElSelect>
            </ElFlex>
            <ElFlex direction="horizontal" mode="flex" justify="end" alignment="center" gutter={0} style="margin-bottom:20px;margin-right:16px;position:relative;left:0;top:0;">
              <ElText text="查看状态" widthStretch="false" style="text-align:right;padding-right:20px;width:56px;"></ElText>
              <ElSelect
                modelValue={$sync(${nameGroup.filterVar}.viewed)}
                dataSource={nasl.util.NewList<{ name: String, value: Boolean }>([{ name: '未查看', value: false }, { name: '已查看', value: true }])}
                textField="name"
                valueField="value"
                filterable={false}
                clearable={true}
                placeholder="请选择">
              </ElSelect>
            </ElFlex>
          </ElFlex>
          <ElButton
          style="padding-left:24px;padding-right:24px;margin-right:0px;border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;min-width:78px;"
          type="primary" 
          text="查 询" 
          onClick={
            function click(){
              $refs.${nameGroup.tableView4}.reload()
            }
          }>
          </ElButton>
        </ElFlex>
        <ElFlex direction="horizontal" mode="block" gutter={0}>
          <ElTable
            ref="${nameGroup.tableView4}"
            style="--el-table-header-bg-color:#f7f8fa;"
            dataSource={${nameGroup.getMyCCTasks}(elements.$ce.currentPage, elements.$ce.pageSize)}
            sticky={false}
            tableLayout="fixed"
            border={false}
            pagination={true}
            defaultPageSize={20}
            showJumper={false}
            showHeader={true}
            size="default">
            <ElTableColumn
              slotHeader={
                <ElText text="流程标题"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procInstTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstTitle))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="流程类型"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procDefTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procDefTitle))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="当前节点"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item) => item.currNodeTitle), '，')
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstCurrNodes))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="当前处理人"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return nasl.util.Join(nasl.util.ListDistinct(nasl.util.ListTransform(nasl.util.ListFlatten(nasl.util.ListTransform(nasl.util.ListFilter(current.item.procInstCurrNodes, (item) => nasl.util.HasValue(item.currNodeParticipants)), (item) => item.currNodeParticipants)), (item: ${structureNamespace}.ProcessUser) => (function match(_value) {
                        if (_value === true) {
                          return item.displayName
                        } else if (_value === false) {
                          return item.userName
                        } else {
                        }
                      })(nasl.util.HasValue(item.displayName)))), '，')
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstCurrNodes, nasl.util.ListFilter(current.item.procInstCurrNodes, (item) => nasl.util.HasValue(item.currNodeParticipants))))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="发起人"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procInstInitiator.displayName
                    } else if (_value === false) {
                      return (function match(_value) {
                        if (_value === true) {
                          return current.item.procInstInitiator.userName
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstInitiator.userName))
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstInitiator.displayName))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="发起时间"></ElText>
              }
              slotDefault={
                (current) => <ElText
                  text={(function match(_value) {
                    if (_value === true) {
                      return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstStartTime))}
                ></ElText>
              }>
            </ElTableColumn>
            <ElTableColumn
              slotHeader={
                <ElText text="操作"></ElText>
              }
              slotDefault={
                (current) => <ElLink
                  text="查看"
                  type="primary"
                  onClick={
                    function click(){
                      ${logicNamespace}.viewCCTask(current.item.taskId)
                      ${nameGroup.goToPage}(current.item.taskId)
                    }
                  }></ElLink>
              }>
            </ElTableColumn>
          </ElTable>
        </ElFlex>
      </ElFlex>
    </ElTabPane>
  </ElTabs>`;
}
