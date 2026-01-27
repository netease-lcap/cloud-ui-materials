import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程信息
export function genOwProcessMyProcess(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    tabValueVar: view.getVariableUniqueName('myProcessTabValue'), // 我的流程tab值
    filterVar: view.getVariableUniqueName('myProcessFilter'), // 我的流程筛选项
    // 逻辑
    reloadFilter: view.getLogicUniqueName('reloadFilter'), // 筛选项初始化
    getProcDefInfos: view.getLogicUniqueName('getProcDefInfos'), // 查询流程定义名称列表
    getProcInstInitiators: view.getLogicUniqueName('getProcInstInitiators'), // 查询流程实例发起人列表
    getMyPendingTasks: view.getLogicUniqueName('getMyPendingTasks'), // 获取我的待办数据
    getMyCompletedTasks: view.getLogicUniqueName('getMyCompletedTasks'), // 获取我的已办数据
    getMyInitiatedTasks: view.getLogicUniqueName('getMyInitiatedTasks'), // 获取我的发起数据
    getMyCCTasks: view.getLogicUniqueName('getMyCCTasks'), // 获取抄送我的数据
    goToPage: view.getLogicUniqueName('goToPage'), // 跳转页面
    // 页面逻辑的局部变量
    // goToPage
    url: view.getVariableUniqueName('url'), // 跳转页面url

    // 组件名称
    listView1: view.getViewElementUniqueName('list_view_1'), // 我的待办表格
    listView2: view.getViewElementUniqueName('list_view_1'), // 我的已办表格
    listView3: view.getViewElementUniqueName('list_view_1'), // 我的发起表格
    listView4: view.getViewElementUniqueName('list_view_1'), // 抄送我的表格

    // 我的待办tab下的ref
    pickerson_proc1Ref: view.getViewElementUniqueName('pickerson_proc1'), // 流程pickerson
    pickerson_procInstInitiators1Ref: view.getViewElementUniqueName('pickerson_procInstInitiators1'), // 发起人pickerson
    datetime_procInstStartTime1Ref: view.getViewElementUniqueName('datetime_procInstStartTime1'), // 发起时间pickerson

    // 我的已办tab下的ref
    pickerson_proc2Ref: view.getViewElementUniqueName('pickerson_proc1'), // 流程pickerson
    pickerson_procInstInitiators2Ref: view.getViewElementUniqueName('pickerson_procInstInitiators1'), // 发起人pickerson
    datetime_procInstStartTime2Ref: view.getViewElementUniqueName('datetime_procInstStartTime1'), // 发起时间pickerson

    // 我的发起tab下的ref
    pickerson_proc3Ref: view.getViewElementUniqueName('pickerson_proc1'), // 流程pickerson
    datetime_procInstStartTime3Ref: view.getViewElementUniqueName('datetime_procInstStartTime1'), // 发起时间pickerson

    // 抄送我的tab下的ref
    pickerson_proc4Ref: view.getViewElementUniqueName('pickerson_proc1'), // 流程pickerson
    pickerson_procInstInitiators4Ref: view.getViewElementUniqueName('pickerson_procInstInitiators1'), // 发起人pickerson
    datetime_procInstStartTime4Ref: view.getViewElementUniqueName('datetime_procInstStartTime1'), // 发起时间pickerson
    pickerson_viewed4Ref: view.getViewElementUniqueName('pickerson_viewed1'), // 查看状态pickerson
  };

  return `export function view() {
    let ${nameGroup.tabValueVar}: string; //我的流程tab值
    let ${
      nameGroup.filterVar
    }: { procDefKey: List<string>, procInstInitiator: List<string>, procInstStartTimeAfter: DateTime, procInstStartTimeBefore: DateTime, viewed: List<Boolean> }; //我的流程筛选项

    function ${nameGroup.reloadFilter}() {
      ${nameGroup.filterVar}.procDefKey = null;
      ${nameGroup.filterVar}.procInstInitiator = null;
      ${nameGroup.filterVar}.procInstStartTimeAfter = null;
      ${nameGroup.filterVar}.procInstStartTimeBefore = null;
      ${nameGroup.filterVar}.viewed = null;

      (function match(_value) {
        if (${nameGroup.tabValueVar} === '待办') {
          $refs.${nameGroup.listView1}.reload()
        } else if (${nameGroup.tabValueVar} === '已办') {
          $refs.${nameGroup.listView2}.reload()
        } else if (${nameGroup.tabValueVar} === '发起') {
          $refs.${nameGroup.listView3}.reload()
        } else if (${nameGroup.tabValueVar} === '抄送') {
          $refs.${nameGroup.listView4}.reload()
        } else {
        }
      })(${nameGroup.tabValueVar});
    }//筛选项初始化

    function ${nameGroup.getProcDefInfos}() {
      let result;
      result = ${logicNamespace}.getProcDefInfos(undefined)
      return result;
    }//查询流程定义名称列表

    function ${nameGroup.getProcInstInitiators}(page: Long, size: Long, filterText: string) {
      let result;
      result = ${logicNamespace}.getProcInstInitiators(page, size, filterText)
      return result;
    }//查询流程实例发起人列表

    function ${nameGroup.getMyPendingTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyPendingTasks(nasl.util.ListHead(${nameGroup.filterVar}.procDefKey), ${nameGroup.filterVar}.procInstStartTimeAfter, ${nameGroup.filterVar}.procInstStartTimeBefore, nasl.util.ListHead(${nameGroup.filterVar}.procInstInitiator), page, size, undefined);
      return result;
    }//获取我的待办数据

    function ${nameGroup.getMyCompletedTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyCompletedTasks(nasl.util.ListHead(${nameGroup.filterVar}.procDefKey), ${nameGroup.filterVar}.procInstStartTimeAfter, ${nameGroup.filterVar}.procInstStartTimeBefore, nasl.util.ListHead(${nameGroup.filterVar}.procInstInitiator), page, size, undefined)
      return result;
    }//获取我的已办数据

    function ${nameGroup.getMyInitiatedTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyInitiatedTasks(nasl.util.ListHead(${nameGroup.filterVar}.procDefKey), ${nameGroup.filterVar}.procInstStartTimeAfter, ${nameGroup.filterVar}.procInstStartTimeBefore, undefined, page, size, undefined)
      return result;
    }//获取我的发起数据

    function ${nameGroup.getMyCCTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyCCTasks(nasl.util.ListHead(${nameGroup.filterVar}.procDefKey), ${nameGroup.filterVar}.procInstStartTimeAfter, ${nameGroup.filterVar}.procInstStartTimeBefore, nasl.util.ListHead(${nameGroup.filterVar}.procInstInitiator),  nasl.util.ListHead(${nameGroup.filterVar}.viewed), page, size, undefined)
      return result;
    }//获取抄送我的数据

    function ${nameGroup.goToPage}(itemTaskId: string) {
      let ${nameGroup.url};
      ${nameGroup.url} = ${logicNamespace}.getTaskDestinationUrl(itemTaskId, undefined);
      nasl.js.block(\`'use JSBlock' \n// 拼接全量url
${nameGroup.url} = window.location.origin + ${nameGroup.url};\`);
      nasl.ui.gotoLink(${nameGroup.url}, '_self')
    }//跳转页面

    return ${genTemplate(nameGroup)}
  }`;
}

function genTemplate(nameGroup: Record<string, string>) {
  return ` <VanTabs
      active={$sync(${nameGroup.tabValueVar})}
      onChange={
        function change(){
          ${nameGroup.reloadFilter}();
        }
      }>
      <VanTab name="待办"
        slotTitle={
          <VanText text="我的待办" style="font-weight: 500; --custom-start: auto; font-size: 3.6vw;"></VanText>
        }>
        <VanFlex mode="block" gutter={0}>
          <VanFlex style="width:0px;height:0px; --custom-start: auto; overflow:hidden;">
            <VanPicker
              ref="${nameGroup.pickerson_proc1Ref}"
              modelValue={$sync(${nameGroup.filterVar}.procDefKey)}
              dataSource={${nameGroup.getProcDefInfos}()}
              textField="procDefTitle"
              valueField="procDefKey"
              filterable={true}
              optionSlot={true}
              clearable={false}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView1}.reload()
                }
              }
              slotTitle={
                <VanText text="流程"></VanText>
              }
              slotItem={
                (current) => <VanFlex gutter={0} mode="flex" justify="center" alignment="center" style="width:100vw;text-align:center;position:relative;left:0;top:0;">
                  <VanText text={current.item.procDefTitle}></VanText>
                  <VanText
                    _if={nasl.util.ListHead(${nameGroup.filterVar}.procDefKey) == current.item.procDefKey}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;\ncursor: pointer;\nright: -1.6vw;"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.procDefKey = null;
                        $refs.${nameGroup.pickerson_proc1Ref}.close();
                        $refs.${nameGroup.pickerson_proc1Ref}.reload();
                        $refs.${nameGroup.listView1}.reload();
                      }
                    }
                  ></VanText>
                </VanFlex>
              }>
            </VanPicker>

            <VanPicker
              ref="${nameGroup.pickerson_procInstInitiators1Ref}"
              modelValue={$sync(${nameGroup.filterVar}.procInstInitiator)}
              dataSource={${nameGroup.getProcInstInitiators}(1, 999, elements.$ce.filterText)}
              valueField="userName"
              filterable={true}
              optionSlot={true}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView1}.reload()
                }
              }
              slotTitle={
                <VanText text="发起人"></VanText>
              }
              slotItem={
                (current) => <VanFlex gutter={0} mode="flex" justify="center" alignment="center" style="width:100vw;text-align:center;">
                  <VanText
                    text={(function match(_value) {
                      if (_value === true) {
                        return current.item.displayName + '（' + current.item.userName + '）'
                      } else if (_value === false) {
                        return current.item.userName
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.displayName))}></VanText>
                  <VanText
                    _if={nasl.util.ListHead(${nameGroup.filterVar}.procInstInitiator) == current.item.userName}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;\ncursor: pointer;\nright: -1.6vw;"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.procInstInitiator = null;
                        $refs.${nameGroup.pickerson_procInstInitiators1Ref}.close();
                        $refs.${nameGroup.pickerson_procInstInitiators1Ref}.reload();
                        $refs.${nameGroup.listView1}.reload();
                      }
                    }
                  ></VanText>
                </VanFlex>
              }>
            </VanPicker>

            <VanDatePicker
              ref="${nameGroup.datetime_procInstStartTime1Ref}"
              startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
              endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
              isRange={true}
              converter="date"
              onConfirm={
                function confirm(){
                  if (nasl.util.HasValue(${nameGroup.filterVar}.procInstStartTimeBefore)) {
                    ${nameGroup.filterVar}.procInstStartTimeBefore = nasl.util.Convert<nasl.core.DateTime>(nasl.util.FormatDateTime(${nameGroup.filterVar}.procInstStartTimeBefore, 'yyyy-MM-dd 23:59:59', 'global'))
                  } else {
                  }
                  $refs.${nameGroup.listView1}.reload()
                }
              }
              slotTitle={
                <VanText text="发起时间"></VanText>
              }
              slotLabel={
                <VanText text="发起时间"></VanText>
              }>
            </VanDatePicker>
          </VanFlex>
          <VanRow style=" --custom-start: auto; height:11.73333vw;">
            <VanCol span={8} style="height:auto;">
              <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                <VanFlex
                  justify="center"
                  alignment="center"
                  onClick={
                    function click(){
                      $refs.${nameGroup.pickerson_proc1Ref}.show()
                    }
                  }
                  style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                  <VanText text="流程" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                  <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                </VanFlex>
              </VanFlex>
            </VanCol>
            <VanCol span={8} style="height:auto;">
              <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                <VanFlex
                  justify="center"
                  alignment="center"
                  onClick={
                    function click(){
                      $refs.${nameGroup.pickerson_procInstInitiators1Ref}.show()
                    }
                  }
                  style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                  <VanText text="发起人" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                  <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                </VanFlex>
              </VanFlex>
            </VanCol>
            <VanCol span={8}>
              <VanFlex style="width:100%;height:100%;">
                <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                  <VanFlex
                    justify="center"
                    alignment="center"
                    onClick={
                      function click(){
                        $refs.${nameGroup.datetime_procInstStartTime1Ref}.open()
                      }
                    }
                    style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                    <VanText text="发起时间" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                    <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                  </VanFlex>
                </VanFlex>
              </VanFlex>
            </VanCol>
          </VanRow>

          <VanFlex gutter={16} mode="flex" justify="center" alignment="center" style="position:static;text-align:center;">
            <VanList
              ref="${nameGroup.listView1}"
              dataSource={${nameGroup.getMyPendingTasks}(1, 999)}
              widthStretch="false"
              style="margin-right:0px;text-align:center;width:100%; --custom-start: auto; --van-list-text-color: #333333;\n--van-list-text-line-height: 1.6;"
              slotItem={
                (current) => <VanFlex mode="block" gutter={0} onClick={
                    function click(){
                      ${nameGroup.goToPage}(current.item.taskId)
                    }
                  } 
                  style=" --custom-start: auto; margin: 4.26667vw;\npadding: 3.2vw 4.26667vw;\nborder: .5px solid #E5E5E5;\nbox-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);\nborder-radius: 1.06667vw;\nfont-size: 3.73333vw;">
                  <VanFlex wrap={false} justify="space-between" alignment="center" style="border-bottom-width:1px;border-style:solid;border-top-width:0px;border-left-width:0px;border-right-width:0px;border-bottom-color:#e7e7e7; --custom-start: auto; height: 8.2vw;\nfont-size: 3.73333vw;\nfont-weight: 500;\nline-height: 5.86667vw;">
                    <VanTextEllipsis
                      content={(function match(_value) {
                        if (_value === true) {
                          return current.item.procInstTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstTitle))}
                      style=" --custom-start: auto; flex: 1;"></VanTextEllipsis>
                    <VanIcon name="arrow" style="font-size:12px; --custom-start: auto; flex-shrink: 0;"></VanIcon>
                  </VanFlex>
                  <VanFlex mode="block" gutter={0}>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="流程类型：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return current.item.procDefTitle
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procDefTitle))}
                        style="text-align:right;text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="当前节点：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item: ${structureNamespace}.CurrNode) => item.currNodeTitle), '，')
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procInstCurrNodes))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="发起人：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
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
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="发起时间：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procInstStartTime))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                  </VanFlex>
                </VanFlex>
              }></VanList>
          </VanFlex>
        </VanFlex>
      </VanTab>

      <VanTab name="已办"
        slotTitle={
          <VanText text="我的已办" style="font-weight: 500; --custom-start: auto; font-size: 3.6vw;"></VanText>
        }>
        <VanFlex mode="block" gutter={0}>
          <VanFlex wrap={true} style="width:0px;height:0px; --custom-start: auto; overflow:hidden;">
            <VanPicker
              ref="${nameGroup.pickerson_proc2Ref}"
              modelValue={$sync(${nameGroup.filterVar}.procDefKey)}
              dataSource={${nameGroup.getProcDefInfos}()}
              textField="procDefTitle"
              valueField="procDefKey"
              filterable={true}
              optionSlot={true}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView2}.reload()
                }
              }
              slotTitle={
                <VanText text="流程"></VanText>
              }
              slotItem={
                (current) => <VanFlex gutter={0} mode="flex" justify="center" alignment="center" style="width:100vw;text-align:center;">
                  <VanText text={current.item.procDefTitle}></VanText>
                  <VanText
                    _if={nasl.util.ListHead(${nameGroup.filterVar}.procDefKey) == current.item.procDefKey}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;\ncursor: pointer;\nright: -1.6vw;"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.procDefKey = null;
                        $refs.${nameGroup.pickerson_proc2Ref}.close();
                        $refs.${nameGroup.pickerson_proc2Ref}.reload();
                        $refs.${nameGroup.listView2}.reload();
                      }
                    }
                  ></VanText>
                </VanFlex>
              }>
            </VanPicker>

            <VanPicker
              ref="${nameGroup.pickerson_procInstInitiators2Ref}"
              modelValue={$sync(${nameGroup.filterVar}.procInstInitiator)}
              dataSource={${nameGroup.getProcInstInitiators}(1, 999, elements.$ce.filterText)}
              valueField="userName"
              filterable={true}
              optionSlot={true}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView2}.reload()
                }
              }
              slotTitle={
                <VanText text="发起人"></VanText>
              }
              slotItem={
                (current) => <VanFlex gutter={0} mode="flex" justify="center" alignment="center" style="width:100vw;text-align:center;">
                  <VanText
                    text={(function match(_value) {
                      if (_value === true) {
                        return \`\${current.item.displayName}(\${current.item.userName})\`
                      } else if (_value === false) {
                        return current.item.userName
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.displayName))}></VanText>
                  <VanText
                    _if={nasl.util.ListHead(${nameGroup.filterVar}.procInstInitiator) == current.item.userName}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;\ncursor: pointer;\nright: -1.6vw;"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.procInstInitiator = null;
                        $refs.${nameGroup.pickerson_procInstInitiators2Ref}.close();
                        $refs.${nameGroup.pickerson_procInstInitiators2Ref}.reload();
                        $refs.${nameGroup.listView2}.reload();
                      }
                    }
                    ></VanText>
                </VanFlex>
              }>
            </VanPicker>

            <VanDatePicker
              ref="${nameGroup.datetime_procInstStartTime2Ref}"
              startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
              endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
              isRange={true}
              converter="date"
              onConfirm={
                function confirm(){
                  if (nasl.util.HasValue(${nameGroup.filterVar}.procInstStartTimeBefore)) {
                    ${nameGroup.filterVar}.procInstStartTimeBefore = nasl.util.Convert<nasl.core.DateTime>(nasl.util.FormatDateTime(${nameGroup.filterVar}.procInstStartTimeBefore, 'yyyy-MM-dd 23:59:59', 'global'))
                  } else {
                  }
                  $refs.${nameGroup.listView2}.reload()
                }
              }
              slotTitle={
                <VanText text="发起时间"></VanText>
              }
              slotLabel={
                <VanText text="发起时间"></VanText>
              }>
            </VanDatePicker>
          </VanFlex>
          <VanRow style=" --custom-start: auto; height:11.73333vw;">
            <VanCol span={8} style="height:auto;">
              <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                <VanFlex
                  justify="center"
                  alignment="center"
                  onClick={
                    function click(){
                      $refs.${nameGroup.pickerson_proc2Ref}.show()
                    }
                  }
                  style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                  <VanText text="流程" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                  <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                </VanFlex>
              </VanFlex>
            </VanCol>
            <VanCol span={8}>
              <VanFlex style="width:100%;height:100%;">
                <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                  <VanFlex
                    justify="center"
                    alignment="center"
                    onClick={
                      function click(){
                        $refs.${nameGroup.pickerson_procInstInitiators2Ref}.show()
                      }
                    }
                    style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                    <VanText text="发起人" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                    <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                  </VanFlex>
                </VanFlex>
              </VanFlex>
            </VanCol>
            <VanCol span={8}>
              <VanFlex style="width:100%;height:100%;">
                <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                  <VanFlex
                    justify="center"
                    alignment="center"
                    onClick={
                      function click(){
                        $refs.${nameGroup.datetime_procInstStartTime2Ref}.open()
                      }
                    }
                    style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                    <VanText text="发起时间" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                    <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                  </VanFlex>
                </VanFlex>
              </VanFlex>
            </VanCol>
          </VanRow>

          <VanFlex gutter={16} mode="flex" justify="center" alignment="center" style="position:static;text-align:center;">
            <VanList
              ref="${nameGroup.listView2}"
              dataSource={${nameGroup.getMyCompletedTasks}(1, 999)}
              widthStretch="false"
              style="margin-right:0px;text-align:center;width:100%; --custom-start: auto; --van-list-text-color: #333333;\n--van-list-text-line-height: 1.6;"
              slotItem={
                (current) => <VanFlex mode="block" gutter={0} onClick={
                  function click(){
                    ${nameGroup.goToPage}(current.item.taskId)
                  }
                } style=" --custom-start: auto; margin: 4.26667vw;\npadding: 3.2vw 4.26667vw;\nborder: .5px solid #E5E5E5;\nbox-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);\nborder-radius: 1.06667vw;\nfont-size: 3.73333vw;">
                  <VanFlex wrap={false} justify="space-between" alignment="center" style="border-bottom-width:1px;border-style:solid;border-top-width:0px;border-left-width:0px;border-right-width:0px;border-bottom-color:#e7e7e7; --custom-start: auto; height: 8.2vw;\nfont-size: 3.73333vw;\nfont-weight: 500;\nline-height: 5.86667vw;">
                    <VanTextEllipsis
                      content={(function match(_value) {
                        if (_value === true) {
                          return current.item.procInstTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstTitle))}
                      style=" --custom-start: auto; flex: 1;"></VanTextEllipsis>
                    <VanIcon name="arrow" style="font-size:12px; --custom-start: auto; flex-shrink: 0;"></VanIcon>
                  </VanFlex>
                  <VanFlex mode="block" gutter={0}>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="流程类型：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return current.item.procDefTitle
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procDefTitle))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="处理节点：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return current.item.nodeTitle
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.nodeTitle))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="发起人：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
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
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="发起时间：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procInstStartTime))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                  </VanFlex>
                </VanFlex>
              }></VanList>
          </VanFlex>
        </VanFlex>
      </VanTab>

      <VanTab name="发起"
        slotTitle={
          <VanText text="我发起的" style="font-weight: 500; --custom-start: auto; font-size: 3.6vw;"></VanText>
        }>
        <VanFlex mode="block" gutter={0}>
          <VanFlex wrap={true} style="width:0px;height:0px; --custom-start: auto; overflow:hidden;">
            <VanPicker
              ref="${nameGroup.pickerson_proc3Ref}"
              modelValue={$sync(${nameGroup.filterVar}.procDefKey)}
              dataSource={${nameGroup.getProcDefInfos}()}
              textField="procDefTitle"
              valueField="procDefKey"
              filterable={true}
              optionSlot={true}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView3}.reload()
                }
              }
              slotTitle={
                <VanText text="流程"></VanText>
              }
              slotItem={
                (current) => <VanFlex gutter={0} mode="flex" justify="center" alignment="center" style="width:100vw;text-align:center;">
                  <VanText text={current.item.procDefTitle}></VanText>
                  <VanText
                    _if={nasl.util.ListHead(${nameGroup.filterVar}.procDefKey) == current.item.procDefKey}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;\ncursor: pointer;\nright: -1.6vw;"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.procDefKey = null;
                        $refs.${nameGroup.pickerson_proc3Ref}.close();
                        $refs.${nameGroup.pickerson_proc3Ref}.reload();
                        $refs.${nameGroup.listView3}.reload();
                      }
                    }
                  ></VanText>
                </VanFlex>
              }>
            </VanPicker>

            <VanDatePicker
              ref="${nameGroup.datetime_procInstStartTime3Ref}"
              modelValue={undefined}
              startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
              endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
              isRange={true}
              converter="date"
              onConfirm={
                function confirm(){
                  if (nasl.util.HasValue(${nameGroup.filterVar}.procInstStartTimeBefore)) {
                    ${nameGroup.filterVar}.procInstStartTimeBefore = nasl.util.Convert<nasl.core.DateTime>(nasl.util.FormatDateTime(${nameGroup.filterVar}.procInstStartTimeBefore, 'yyyy-MM-dd 23:59:59', 'global'))
                  } else {
                  }
                  $refs.${nameGroup.listView3}.reload()
                }
              }
              slotTitle={
                <VanText text="发起时间"></VanText>
              }
              slotLabel={
                <VanText text="发起时间"></VanText>
              }>
            </VanDatePicker>
          </VanFlex>
          <VanRow style=" --custom-start: auto; height:11.73333vw;">
            <VanCol span={8} style="height:auto;">
              <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                <VanFlex
                  justify="center"
                  alignment="center"
                  onClick={
                    function click(){
                      $refs.${nameGroup.pickerson_proc3Ref}.show()
                    }
                  }
                  style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                  <VanText text="流程" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                  <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                </VanFlex>
              </VanFlex>
            </VanCol>
            <VanCol span={8}>
              <VanFlex style="width:100%;height:100%;">
                <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                  <VanFlex
                    justify="center"
                    alignment="center"
                    onClick={
                      function click(){
                        $refs.${nameGroup.datetime_procInstStartTime3Ref}.open()
                      }
                    }
                    style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                    <VanText text="发起时间" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                    <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                  </VanFlex>
                </VanFlex>
              </VanFlex>
            </VanCol>
          </VanRow>

          <VanFlex gutter={16} mode="flex" justify="center" alignment="center" style="position:static;text-align:center;">
            <VanList
              ref="${nameGroup.listView3}"
              dataSource={${nameGroup.getMyInitiatedTasks}(1, 999)}
              widthStretch="false"
              style="margin-right:0px;text-align:center;width:100%; --custom-start: auto; --van-list-text-color: #333333;\n--van-list-text-line-height: 1.6;"
              slotItem={
                (current) => <VanFlex mode="block" gutter={0} onClick={
                  function click(){
                    ${nameGroup.goToPage}(current.item.taskId)
                  }
                } style=" --custom-start: auto; margin: 4.26667vw;\npadding: 3.2vw 4.26667vw;\nborder: .5px solid #E5E5E5;\nbox-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);\nborder-radius: 1.06667vw;\nfont-size: 3.73333vw;">
                  <VanFlex wrap={false} justify="space-between" alignment="center" style="border-bottom-width:1px;border-style:solid;border-top-width:0px;border-left-width:0px;border-right-width:0px;border-bottom-color:#e7e7e7; --custom-start: auto; height: 8.2vw;\nfont-size: 3.73333vw;\nfont-weight: 500;\nline-height: 5.86667vw;">
                    <VanTextEllipsis
                      content={(function match(_value) {
                        if (_value === true) {
                          return current.item.procInstTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstTitle))}
                      style=" --custom-start: auto; flex: 1;"></VanTextEllipsis>
                    <VanIcon name="arrow" style="font-size:12px; --custom-start: auto; flex-shrink: 0;"></VanIcon>
                  </VanFlex>
                  <VanFlex mode="block" gutter={0}>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="流程类型：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return current.item.procDefTitle
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procDefTitle))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="当前节点：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item: ${structureNamespace}.CurrNode) => item.currNodeTitle), '，')
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procInstCurrNodes))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="当前处理人：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return nasl.util.Join(nasl.util.ListDistinct(nasl.util.ListTransform(nasl.util.ListFlatten(nasl.util.ListTransform(nasl.util.ListFilter(current.item.procInstCurrNodes, (item: ${structureNamespace}.CurrNode) => nasl.util.HasValue(item.currNodeParticipants)), (item: ${structureNamespace}.CurrNode) => item.currNodeParticipants)), (item: ${structureNamespace}.ProcessUser) => (function match(_value) {
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
                        })(nasl.util.HasValue(current.item.procInstCurrNodes, nasl.util.ListFilter(current.item.procInstCurrNodes, (item: ${structureNamespace}.CurrNode) => nasl.util.HasValue(item.currNodeParticipants))))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="发起人：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
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
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="发起时间：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procInstStartTime))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                  </VanFlex>
                </VanFlex>
              }></VanList>
          </VanFlex>
        </VanFlex>
      </VanTab>

      <VanTab name="抄送"
        slotTitle={
          <VanText text="我的抄送" style="font-weight: 500; --custom-start: auto; font-size: 3.6vw;"></VanText>
        }>
        <VanFlex mode="block" gutter={0}>
          <VanFlex wrap={true} style="width:0px;height:0px; --custom-start: auto; overflow:hidden;">
            <VanPicker
              ref="${nameGroup.pickerson_proc4Ref}"
              modelValue={$sync(${nameGroup.filterVar}.procDefKey)}
              dataSource={${nameGroup.getProcDefInfos}()}
              textField="procDefTitle"
              valueField="procDefKey"
              filterable={true}
              optionSlot={true}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView4}.reload()
                }
              }
              slotTitle={
                <VanText text="流程"></VanText>
              }
              slotItem={
                (current) => <VanFlex gutter={0} mode="flex" justify="center" alignment="center" style="width:100vw;text-align:center;">
                  <VanText text={current.item.procDefTitle}></VanText>
                  <VanText
                    _if={nasl.util.ListHead(${nameGroup.filterVar}.procDefKey) == current.item.procDefKey}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;\ncursor: pointer;\nright: -1.6vw;"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.procDefKey = null;
                        $refs.${nameGroup.pickerson_proc4Ref}.close();
                        $refs.${nameGroup.pickerson_proc4Ref}.reload();
                        $refs.${nameGroup.listView4}.reload();
                      }
                    }
                  ></VanText>
                </VanFlex>
              }>
            </VanPicker>

            <VanPicker
              ref="${nameGroup.pickerson_procInstInitiators4Ref}"
              modelValue={$sync(${nameGroup.filterVar}.procInstInitiator)}
              dataSource={${nameGroup.getProcInstInitiators}(1, 999, elements.$ce.filterText)}
              valueField="userName"
              filterable={true}
              optionSlot={true}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView4}.reload()
                }
              }
              slotTitle={
                <VanText text="发起人"></VanText>
              }
              slotItem={
                (current) => <VanFlex gutter={0} mode="flex" justify="center" alignment="center" style="width:100vw;text-align:center;">
                  <VanText
                    text={(function match(_value) {
                      if (_value === true) {
                        return \`\${current.item.displayName}(\${current.item.userName})\`
                      } else if (_value === false) {
                        return current.item.userName
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.displayName))}></VanText>
                  <VanText
                    _if={nasl.util.ListHead(${nameGroup.filterVar}.procInstInitiator) == current.item.userName}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;\ncursor: pointer;\nright: -1.6vw;"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.procInstInitiator = null;
                        $refs.${nameGroup.pickerson_procInstInitiators4Ref}.close();
                        $refs.${nameGroup.pickerson_procInstInitiators4Ref}.reload();
                        $refs.${nameGroup.listView4}.reload();
                      }
                    }
                  ></VanText>
                </VanFlex>
              }>
            </VanPicker>

            <VanDatePicker
              ref="${nameGroup.datetime_procInstStartTime4Ref}"
              modelValue={undefined}
              startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
              endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
              isRange={true}
              converter="date"
              onConfirm={
                function confirm(){
                  if (nasl.util.HasValue(${nameGroup.filterVar}.procInstStartTimeBefore)) {
                    ${nameGroup.filterVar}.procInstStartTimeBefore = nasl.util.Convert<nasl.core.DateTime>(nasl.util.FormatDateTime(${nameGroup.filterVar}.procInstStartTimeBefore, 'yyyy-MM-dd 23:59:59', 'global'))
                  } else {
                  }
                  $refs.${nameGroup.listView4}.reload()
                }
              }
              slotTitle={
                <VanText text="发起日期"></VanText>
              }
              slotLabel={
                <VanText text="标题"></VanText>
              }>
            </VanDatePicker>
            <VanPicker
              ref="${nameGroup.pickerson_viewed4Ref}"
              modelValue={$sync(${nameGroup.filterVar}.viewed)}
              dataSource={nasl.util.NewList<{ name: String, value: Boolean }>([{ name: '未查看', value: false }, { name: '已查看', value: true }])}
              textField="name"
              valueField="value"
              filterable={true}
              optionSlot={true}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView4}.reload()
                }
              }
              slotTitle={
                <VanText text="查看状态"></VanText>
              }
              slotItem={
                (current) => <VanFlex gutter={0} mode="flex" justify="center" alignment="center" style="width:100vw;text-align:center;">
                  <VanText text={current.item.name}></VanText>
                  <VanText
                    _if={nasl.util.ListHead(${nameGroup.filterVar}.viewed) == current.item.value}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;\ncursor: pointer;\nright: -1.6vw;"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.viewed = null;
                        $refs.${nameGroup.pickerson_viewed4Ref}.close();
                        $refs.${nameGroup.pickerson_viewed4Ref}.reload();
                        $refs.${nameGroup.listView4}.reload();
                      }
                    }
                  ></VanText>
                </VanFlex>
              }>
            </VanPicker>
          </VanFlex>
          <VanRow style="margin-right:0px; --custom-start: auto; height:11.73333vw;">
            <VanCol span={6} style="height:auto;">
              <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                <VanFlex
                  justify="center"
                  alignment="center"
                  gutter={0}
                  onClick={
                    function click(){
                      $refs.${nameGroup.pickerson_proc4Ref}.show()
                    }
                  }
                  style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                  <VanText text="流程" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                  <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                </VanFlex>
              </VanFlex>
            </VanCol>
            <VanCol span={6}>
              <VanFlex style="width:100%;height:100%;">
                <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                  <VanFlex
                    justify="center"
                    alignment="center"
                    gutter={0}
                    wrap={false}
                    onClick={
                      function click(){
                        $refs.${nameGroup.pickerson_procInstInitiators4Ref}.show()
                      }
                    }
                    style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                    <VanText text="发起人" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                    <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                  </VanFlex>
                </VanFlex>
              </VanFlex>
            </VanCol>
            <VanCol span={6}>
              <VanFlex style="width:100%;height:100%;">
                <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                  <VanFlex
                    justify="center"
                    alignment="center"
                    gutter={0}
                    wrap={false}
                    onClick={
                      function click(){
                        $refs.${nameGroup.datetime_procInstStartTime4Ref}.open()
                      }
                    }
                    style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                    <VanText text="发起时间" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                    <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                  </VanFlex>
                </VanFlex>
              </VanFlex>
            </VanCol>
            <VanCol span={6}>
              <VanFlex style="width:100%;height:100%;">
                <VanFlex justify="center" alignment="center" gutter={0} style="width:100%;height:100%;">
                  <VanFlex
                    justify="center"
                    alignment="center"
                    gutter={0}
                    wrap={false}
                    onClick={
                      function click(){
                        $refs.${nameGroup.pickerson_viewed4Ref}.show()
                      }
                    }
                    style="background-color:#f7f8fa;border-top-left-radius:12px;border-bottom-left-radius:12px;border-top-right-radius:12px;border-bottom-right-radius:12px; --custom-start: auto; padding: 1.53333vw 2.13333vw;\nborder-radius: 3.2vw;\ngap: 1.06667vw;">
                    <VanText text="查看状态" style=" --custom-start: auto; font-size: 3.2vw;"></VanText>
                    <VanIcon name="arrow-down" style="font-size:12px;"></VanIcon>
                  </VanFlex>
                </VanFlex>
              </VanFlex>
            </VanCol>
          </VanRow>

          <VanFlex gutter={16} mode="flex" justify="center" alignment="center" style="position:static;text-align:center;">
            <VanList
              ref="${nameGroup.listView4}"
              dataSource={${nameGroup.getMyCCTasks}(1, 999)}
              widthStretch="false"
              style="margin-right:0px;text-align:center;width:100%; --custom-start: auto; --van-list-text-color: #333333;\n--van-list-text-line-height: 1.6;"
              slotItem={
                (current) => <VanFlex mode="block" gutter={0} onClick={
                  function click(){
                    ${logicNamespace}.viewCCTask(current.item.taskId)
                    ${nameGroup.goToPage}(current.item.taskId)
                  }
                } style=" --custom-start: auto; margin: 4.26667vw;\npadding: 3.2vw 4.26667vw;\nborder: .5px solid #E5E5E5;\nbox-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);\nborder-radius: 1.06667vw;\nfont-size: 3.73333vw;">
                  <VanFlex wrap={false} justify="space-between" alignment="center" style="border-bottom-width:1px;border-style:solid;border-top-width:0px;border-left-width:0px;border-right-width:0px;border-bottom-color:#e7e7e7; --custom-start: auto; height: 8.2vw;\nfont-size: 3.73333vw;\nfont-weight: 500;\nline-height: 5.86667vw;">
                    <VanTextEllipsis
                      content={(function match(_value) {
                        if (_value === true) {
                          return current.item.procInstTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstTitle))}
                      style=" --custom-start: auto; flex: 1;"></VanTextEllipsis>
                    <VanIcon name="arrow" style="font-size:12px; --custom-start: auto; flex-shrink: 0;"></VanIcon>
                  </VanFlex>
                  <VanFlex mode="block" gutter={0}>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="流程类型：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return current.item.procDefTitle
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procDefTitle))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="当前节点：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item: ${structureNamespace}.CurrNode) => item.currNodeTitle), '，')
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procInstCurrNodes))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="当前处理人：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return nasl.util.Join(nasl.util.ListDistinct(nasl.util.ListTransform(nasl.util.ListFlatten(nasl.util.ListTransform(nasl.util.ListFilter(current.item.procInstCurrNodes, (item: ${structureNamespace}.CurrNode) => nasl.util.HasValue(item.currNodeParticipants)), (item: ${structureNamespace}.CurrNode) => item.currNodeParticipants)), (item: ${structureNamespace}.ProcessUser) => (function match(_value) {
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
                        })(nasl.util.HasValue(current.item.procInstCurrNodes, nasl.util.ListFilter(current.item.procInstCurrNodes, (item: ${structureNamespace}.CurrNode) => nasl.util.HasValue(item.currNodeParticipants))))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="发起人：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
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
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                    <VanFlex wrap={false} gutter={0} style=" --custom-start: auto; margin-top: 2.13333vw;\noverflow:hidden;">
                      <VanText text="发起时间：" style="color:#999; --custom-start: auto; flex-shrink: 0;\nfont-size: 100%;\nmargin-right: 2.13333vw;"></VanText>
                      <VanText
                        text={(function match(_value) {
                          if (_value === true) {
                            return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procInstStartTime))}
                        style="text-align:right; --custom-start: auto; flex: 1;\nfont-size: 100%;\nvertical-align: baseline;"></VanText>
                    </VanFlex>
                  </VanFlex>
                </VanFlex>
              }></VanList>
          </VanFlex>
        </VanFlex>
      </VanTab>
    </VanTabs>`;
}
