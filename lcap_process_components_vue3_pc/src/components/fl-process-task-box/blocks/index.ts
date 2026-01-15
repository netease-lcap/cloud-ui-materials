import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成任务箱
export function genFlProcessTaskBox(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    // 局部变量
    timeIntervalVar: view.getVariableUniqueName('taskBoxInterval'), //
    configVar: view.getVariableUniqueName('taskBoxConfig'), // 任务箱配置
    // 页面逻辑
    getMyPendingTasksEvent: view.getLogicUniqueName('getMyPendingTasks'), // 查询我的待办任务
    createdEvent: view.getLogicUniqueName('created'), // 页面创建事件
    destroyedEvent: view.getLogicUniqueName('destroyed'), // 页面销毁事件

    url: view.getVariableUniqueName('url'), // 跳转页面url
  };

  return `export function view() {
    let ${nameGroup.timeIntervalVar}: Long = 30; //事件间隔(秒)
    let ${nameGroup.configVar}: { data: List<${structureNamespace}.MyPendingTask>, page: Long, size: Long, total: Long}; //任务箱配置

    function ${nameGroup.getMyPendingTasksEvent}() {
      let result;
      if (nasl.util.HasValue(${nameGroup.configVar}.page)) {
      } else {
        ${nameGroup.configVar}.page = 1
      }
      if (nasl.util.HasValue(${nameGroup.configVar}.size)) {
      } else {
        ${nameGroup.configVar}.size = 5
      }
      result = ${logicNamespace}.getMyPendingTasks(undefined, undefined, undefined, undefined, ${nameGroup.configVar}.page, ${nameGroup.configVar}.size, undefined)
      if (nasl.util.HasValue(result.list)) {
          ${nameGroup.configVar}.data = result.list
      } else {
      }
      ${nameGroup.configVar}.total = result.total
      return result
    }//查询我的待办

    const $lifecycles = {
      onCreated: [
        function ${nameGroup.createdEvent}() {
          ${nameGroup.getMyPendingTasksEvent}()
          if (${nameGroup.timeIntervalVar} < 3) {
            ${nameGroup.timeIntervalVar} = 3
          } else {
          }
          nasl.js.block(\`'use JSBlock' \n//设置定时器，定时刷新任务箱
window._processV2TaskBoxInterval = setInterval(function() {
    ${nameGroup.getMyPendingTasksEvent}();
}, state.${nameGroup.timeIntervalVar} *1000);\`);
        },
      ],
      onDestroyed: [
        function ${nameGroup.destroyedEvent}() {
          nasl.js.block(\`'use JSBlock' \n//清除任务箱定时器
const intervalId = window._processV2TaskBoxInterval;
if (intervalId !== null && typeof intervalId === 'number') {
    window.clearInterval(intervalId);
}\`);
        },
      ],
    }

    return ${genTemplate(nameGroup, logicNamespace)}
  }`;
}

function genTemplate(nameGroup: Record<string, string>, logicNamespace: string) {
  return `<ElPopover 
    trigger="click" 
    style="min-width:388px;" 
    onBefore-enter={
      function beforeenter() {
        ${nameGroup.getMyPendingTasksEvent}()
      }
    }
    slotReference={
      <ElFlex direction="horizontal" mode="flex" justify="center" alignment="center" style="width:58px;height:58px;text-align:center;">
        <ElBadge value={${nameGroup.configVar}.total} max={99} type="danger" style="font-size:14px; --custom-start: auto; --badge-box-shadow: 0 0 0 0 #fff;">
          <ElIcon name="Bell" style="font-size:22px;"></ElIcon>
        </ElBadge>
      </ElFlex>
    }>
      <ElFlex direction="horizontal" mode="block" gutter={16} style="min-width:348px;padding-top:2px;padding-left:8px;padding-right:8px;padding-bottom:2px; --custom-start: auto; max-width:calc(100vw - 24px);">
        <ElFlex direction="horizontal" mode="block" gutter={0} style="width:100%;padding-bottom:16px;color:#337eff; --custom-start: auto; font-size: 1.17em; font-weight: bold;">
          <ElText text="待处理任务 ("></ElText>
          <ElText text={${nameGroup.configVar}.total}></ElText>
          <ElText text=")"></ElText>
        </ElFlex>
        <ElFlex direction="horizontal" gutter={0} mode="flex" justify="end" alignment="start" style="width:100%;">
          <ElTable 
            _if={${nameGroup.configVar}.total > 0}
            dataSource={${nameGroup.configVar}.data}
            pagination={false}
            defaultPageSize={20}
            border={true}
            tableLayout="fixed"
            stripe={true}
            showHeader={false}
            highlightCurrentRow={false}
            rowKey="taskId"
            onRow-click={
              function rowclick(){
                let ${nameGroup.url};
                ${nameGroup.url} = ${logicNamespace}.getTaskDestinationUrl(event.row.taskId, undefined);
                nasl.js.block(\`'use JSBlock' \n// 拼接全量url\n${nameGroup.url} = window.location.origin + ${nameGroup.url};\`)
                nasl.ui.gotoLink(${nameGroup.url}, '_self');
              }
            }
            style="border-top-left-radius:4px;border-bottom-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px; --custom-start: auto; --list-view-item-background-selected:#f4f6f9;\n--list-view-item-color-selected:#333333;\n--list-view-item-background-hover:#f4f6f9;\n--list-view-item-padding: 0px;"
            >
              <ElTableColumn 
              resizable={false} 
              style="padding-top:0px;padding-bottom:0px;"
              slotHeader={
                <ElText text="表格列"></ElText>
              }
              slotDefault={
                (current) => <ElFlex direction="horizontal" gutter={0} mode="flex" justify="space-between" alignment="center" style="width:100%;">
                  <ElLink text={current.item.taskTitle} style=" --custom-start: auto;     display: inline-block;\nwhite-space: nowrap;\noverflow: hidden;\ntext-overflow: ellipsis;\nmax-width: calc(100vw - 200px);\nline-height: 1em;"></ElLink>
                  <ElText text={current.item.procInstStartTime} overflow="nowrap" widthStretch="false" heightStretch="false" style="width:120px;font-size:12px;color:#ccc;"></ElText>
                </ElFlex>
              }
            >
            </ElTableColumn>
          </ElTable>
          <ElPagination 
            layout="prev, pager, next"
            total={${nameGroup.configVar}.total}
            currentPage={$sync(${nameGroup.configVar}.page)}
            pageSize={$sync(${nameGroup.configVar}.size)}
            pagerCount={7}
            pageSizes={[10,20,50]}
            background={false}
            size="default"
            style="margin-top:16px;font-size:12px;"
            onChange={
              function change(event){
                ${nameGroup.configVar}.page = event.currentPage
                ${nameGroup.getMyPendingTasksEvent}()
              }
            }
          >
          </ElPagination>
        </ElFlex>
      </ElFlex>
    </ElPopover>`;
}
