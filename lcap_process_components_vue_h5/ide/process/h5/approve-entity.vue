<template>
  <van-linear-layout ref="vanLinearLayout1" class="l-root-h5" type="root" gap="none">
    <van-linear-layout ref="linear_layout_7" direction="horizontal" :wrap="true">
      <van-tabs ref="tabs_1" class="cw-style-width" type="line" style="--cw-style-width:100%;width:100%;">
        <van-tab ref="tab_1">
          <template #title>
            <van-text ref="text_200" text="表单信息"></van-text>
          </template>
          <div id="dynamicRenderContainer"></div>
          <van-form ref="form_1" id="dynamicRenderContainer" processPrefix="Process1" v-if="false">
            <van-field ref="field_1" drole="other">
              <template #title>
                <van-text ref="text_201" text="创建时间"></van-text>
              </template>
              <template #input>
                <van-linear-layout ref="linear_layout_1" class="cw-style-width" direction="horizontal"
                  style="--cw-style-width:100%;width:100%;">
                  <van-datetime-picker ref="datetime_picker_1" type="datetime" :value.sync="Process1.data.createdTime"
                    title="请选择创建时间" labelField="" inputAlign="left"></van-datetime-picker>
                </van-linear-layout>
              </template>
            </van-field>
            <van-field ref="field_2" drole="other">
              <template #title>
                <van-text ref="text_202" text="更新时间"></van-text>
              </template>
              <template #input>
                <van-linear-layout ref="linear_layout_2" class="cw-style-width" direction="horizontal"
                  style="--cw-style-width:100%;width:100%;">
                  <van-datetime-picker ref="datetime_picker_2" type="datetime" :value.sync="Process1.data.updatedTime"
                    title="请选择更新时间" labelField="" inputAlign="left"></van-datetime-picker>
                </van-linear-layout>
              </template>
            </van-field>
            <van-field ref="field_3" drole="other">
              <template #title>
                <van-text ref="text_203" text="创建者"></van-text>
              </template>
              <template #input>
                <van-linear-layout ref="linear_layout_3" class="cw-style-width" direction="horizontal"
                  style="--cw-style-width:100%;width:100%;">
                  <van-fieldinput ref="fieldinput_1" :value.sync="Process1.data.createdBy"
                    placeholder="请输入创建者"></van-fieldinput>
                </van-linear-layout>
              </template>
            </van-field>
            <van-field ref="field_4" drole="other">
              <template #title>
                <van-text ref="text_204" text="更新者"></van-text>
              </template>
              <template #input>
                <van-linear-layout ref="linear_layout_4" class="cw-style-width" direction="horizontal"
                  style="--cw-style-width:100%;width:100%;">
                  <van-fieldinput ref="fieldinput_2" :value.sync="Process1.data.updatedBy"
                    placeholder="请输入更新者"></van-fieldinput>
                </van-linear-layout>
              </template>
            </van-field>
            <van-field ref="field_5" drole="other">
              <template #title>
                <van-text ref="text_205" text="name"></van-text>
              </template>
              <template #input>
                <van-linear-layout ref="linear_layout_5" class="cw-style-width" direction="horizontal"
                  style="--cw-style-width:100%;width:100%;">
                  <van-fieldinput ref="fieldinput_3" :value.sync="Process1.data.name"
                    placeholder="请输入name"></van-fieldinput>
                </van-linear-layout>
              </template>
            </van-field>
            <van-field ref="field_6" drole="other">
              <template #title>
                <van-text ref="text_206" text="detail"></van-text>
              </template>
              <template #input>
                <van-linear-layout ref="linear_layout_6" class="cw-style-width" direction="horizontal"
                  style="--cw-style-width:100%;width:100%;">
                  <van-fieldinput ref="fieldinput_4" :value.sync="Process1.data.detail"
                    placeholder="请输入detail"></van-fieldinput>
                </van-linear-layout>
              </template>
            </van-field>
            <van-field ref="field_16" drole="other" labelLayout="block">
              <template #title>
                <van-text ref="text_268" text="子表单"></van-text>
              </template>
              <template #input>
                <van-linear-layout ref="linear_layout_57" class="cw-style-width" direction="horizontal"
                  style="--cw-style-width:100%;width:100%;">
                  <van-linear-layout ref="linear_layout_58" class="cw-style-width" direction="horizontal" :wrap="true"
                    gap="normal" style="--cw-style-width:100%;--van-space-base:0px;width:100%;">
                    <van-button ref="button_13" type="info" size="small" text="添加" squareroud="square"
                      @click="button_13_click($event)"></van-button>
                    <van-validator ref="validator_1" class="cw-style-width" :rules="[]"
                      style="--cw-style-width:100%;width:100%;">
                      <van-for-components ref="for_components_2" class="cw-style-width" :colnum="1"
                        :dataSource="(Process1 || {}).relationData" v-dependencies.reload="[]" :equalWidth="true"
                        style="--cw-style-width:100%;width:100%;">
                        <template #item="current">
                          <van-collapse :ref="`collapse_3_${(current || {}).__nodeKey || (current || {}).index}`">
                            <van-collapse-item
                              :ref="`collapse_item_10_${(current || {}).__nodeKey || (current || {}).index}`">
                              <template #title>
                                <van-linear-layout
                                  :ref="`linear_layout_120_${(current || {}).__nodeKey || (current || {}).index}`"
                                  justify="space-between" :wrap="true">
                                  <van-linear-layout
                                    :ref="`linear_layout_121_${(current || {}).__nodeKey || (current || {}).index}`"
                                    :wrap="true">
                                    <van-text :ref="`text_177_${(current || {}).__nodeKey || (current || {}).index}`"
                                      :text="$utils['ToString']('nasl.core.String', $utils['ToString']('nasl.core.String', `数据`) + $utils['ToString']('nasl.core.Long', $global.add((current || {}).index, 1)))"></van-text>
                                  </van-linear-layout>
                                  <van-linear-layout
                                    :ref="`linear_layout_122_${(current || {}).__nodeKey || (current || {}).index}`"
                                    :wrap="true">
                                    <van-link :ref="`link_3_${(current || {}).__nodeKey || (current || {}).index}`"
                                      text="删除" @click="link_3_click($event, current)"></van-link>
                                  </van-linear-layout>
                                </van-linear-layout>
                              </template>
                              <van-form :ref="`form_4_${(current || {}).__nodeKey || (current || {}).index}`">
                                <van-field :ref="`field_29_${(current || {}).__nodeKey || (current || {}).index}`"
                                  :required="true" drole="other">
                                  <template #input>
                                    <van-fieldinput
                                      :ref="`fieldinput_10_${(current || {}).__nodeKey || (current || {}).index}`"
                                      placeholder="请输入" :clearable="true"
                                      :value.sync="current.item.name"></van-fieldinput>
                                  </template>
                                  <template #title>
                                    <van-text :ref="`text_178_${(current || {}).__nodeKey || (current || {}).index}`"
                                      text="名称"></van-text>
                                  </template>
                                </van-field>
                                <van-field :ref="`field_30_${(current || {}).__nodeKey || (current || {}).index}`"
                                  name="radio" drole="other">
                                  <template #input>
                                    <van-fieldinput
                                      :ref="`fieldinput_11_${(current || {}).__nodeKey || (current || {}).index}`"
                                      placeholder="请输入" :value.sync="current.item.description"></van-fieldinput>
                                  </template>
                                  <template #title>
                                    <van-text :ref="`text_181_${(current || {}).__nodeKey || (current || {}).index}`"
                                      text="单选框"></van-text>
                                  </template>
                                </van-field>
                              </van-form>
                            </van-collapse-item>
                          </van-collapse>
                        </template>
                        <template #default="current">
                          <van-row :ref="`row_3_${(current || {}).__nodeKey || (current || {}).index}`" gutter="0"
                            :vusion-disabled-copy="current" :vusion-disabled-addslot="current"
                            :vusion-disabled-cut="current">
                            <van-col :ref="`col_3_${(current || {}).__nodeKey || (current || {}).index}`" :span="24"
                              :vusion-disabled-copy="current" :vusion-disabled-cut="current"></van-col>
                          </van-row>
                        </template>
                      </van-for-components>
                    </van-validator>
                  </van-linear-layout>
                </van-linear-layout>
              </template>
            </van-field>
          </van-form>
        </van-tab>
        <van-tab ref="tab_2">
          <template #title>
            <van-text ref="text_207" text="流程信息"></van-text>
          </template>
          <ow-process-info ref="ow_process_info_1">
            <van-linear-layout ref="linear_layout_19" direction="horizontal" :wrap="true"
              style="--custom-start: auto; padding: 0 4.26667vw;">
              <van-linear-layout ref="linear_layout_18" class="cw-style-text-align" direction="horizontal" gap="normal"
                mode="block"
                style="--cw-style-text-align:left;--van-space-base:0px;text-align:left;--custom-start: auto; border: .5px solid #E5E5E5; box-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06); border-radius: 1.06667vw; background: #fff; padding: 3.2vw 4.26667vw; font-size: 3.73333vw;">
                <van-linear-layout ref="linear_layout_9" class="cw-style-width" direction="horizontal" :wrap="false"
                  mode="flex" justify="start" alignment="center" style="--cw-style-width:100%;width:100%;">
                  <van-linear-layout ref="linear_layout_8" direction="horizontal" :wrap="true" mode="flex" justify="end"
                    alignment="center" style="--custom-start: auto; width: 18.66667vw; margin-right: 2.13333vw;">
                    <van-text ref="text_209" class="cw-style-text-align cw-style-color" text="发起人："
                      style="--cw-style-text-align:right;--cw-style-color:#999;color:#999;text-align:right;--custom-start: auto; font-size: 100%; width: 18.66667vw;"></van-text>
                  </van-linear-layout>
                  <van-text ref="text_210" class="cw-style-width cw-style-color" overflow="ellipsis" widthStretch="true"
                    :text="$utils['ToString']('nasl.core.String', genviewMatchExpression_1jnb9uh1())"
                    style="--cw-style-width:100%;--cw-style-color:#333333;color:#333333;width:100%;--custom-start: auto; font-size: 100%;"></van-text>
                </van-linear-layout>
                <van-linear-layout ref="linear_layout_11" class="cw-style-width" direction="horizontal" :wrap="false"
                  mode="flex" justify="start" alignment="center"
                  style="--cw-style-width:100%;width:100%;--custom-start: auto; margin-top: 2.13333vw;">
                  <van-linear-layout ref="linear_layout_10" direction="horizontal" :wrap="true" mode="flex"
                    justify="end" alignment="center"
                    style="--custom-start: auto; width: 18.66667vw; margin-right: 2.13333vw;">
                    <van-text ref="text_211" class="cw-style-text-align cw-style-color" text="发起时间："
                      style="--cw-style-text-align:right;--cw-style-color:#999;color:#999;text-align:right;--custom-start: auto; font-size: 100%; width: 18.66667vw;"></van-text>
                  </van-linear-layout>
                  <van-text ref="text_212" class="cw-style-width cw-style-color" overflow="ellipsis" widthStretch="true"
                    :text="$utils['ToString']('nasl.core.String', genviewMatchExpression_0ot5tjv1())"
                    style="--cw-style-width:100%;--cw-style-color:#333333;color:#333333;width:100%;--custom-start: auto; font-size: 100%;"></van-text>
                </van-linear-layout>
                <van-linear-layout ref="linear_layout_13" class="cw-style-width" direction="horizontal" :wrap="false"
                  mode="flex" justify="start" alignment="center"
                  style="--cw-style-width:100%;width:100%;--custom-start: auto; margin-top: 2.13333vw;">
                  <van-linear-layout ref="linear_layout_12" direction="horizontal" :wrap="true" mode="flex"
                    justify="end" alignment="center"
                    style="--custom-start: auto; width: 18.66667vw; margin-right: 2.13333vw;">
                    <van-text ref="text_213" class="cw-style-text-align cw-style-color" text="当前状态："
                      style="--cw-style-text-align:right;--cw-style-color:#999;color:#999;text-align:right;--custom-start: auto; font-size: 100%; width: 18.66667vw;"></van-text>
                  </van-linear-layout>
                  <van-text ref="text_214"
                    class="cw-style-background-color cw-style-padding-left cw-style-padding cw-style-padding-right cw-style-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                    :text="$utils['ToString']('nasl.core.String', genviewMatchExpression_1n2m88k0())"
                    overflow="ellipsis" widthStretch="false"
                    :style="{ 'color': genviewMatchExpression_10ghqfr0(), '--cw-style-color': genviewMatchExpression_10ghqfr0(), 'background-color': genviewMatchExpression_1fiwit20() }"
                    style="--cw-style-padding-left:8px;--cw-style-padding-right:8px;--cw-style-border-top-left-radius:4px;--cw-style-border-top-right-radius:4px;--cw-style-border-bottom-left-radius:4px;--cw-style-border-bottom-right-radius:4px;color:#333333;padding-left:8px;padding-right:8px;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;--custom-start: auto; font-size: 100%; padding:0 2.13vw; max-width:calc(100% - 22vw);"></van-text>
                </van-linear-layout>
                <van-linear-layout ref="linear_layout_15" class="cw-style-width" direction="horizontal" :wrap="false"
                  mode="flex" justify="start" alignment="center"
                  style="--cw-style-width:100%;width:100%;--custom-start: auto; margin-top: 2.13333vw;">
                  <van-linear-layout ref="linear_layout_14" direction="horizontal" :wrap="true" mode="flex"
                    justify="end" alignment="center"
                    style="--custom-start: auto; width: 18.66667vw; margin-right: 2.13333vw;">
                    <van-text ref="text_215" class="cw-style-text-align cw-style-color" text="当前节点："
                      style="--cw-style-text-align:right;--cw-style-color:#999;color:#999;text-align:right;--custom-start: auto; font-size: 100%; width: 18.66667vw;"></van-text>
                  </van-linear-layout>
                  <van-text ref="text_216" class="cw-style-width cw-style-color" overflow="ellipsis" widthStretch="true"
                    :text="$utils['ToString']('nasl.core.String', genviewMatchExpression_1s10vyl1())"
                    style="--cw-style-width:100%;--cw-style-color:#333333;color:#333333;width:100%;--custom-start: auto; font-size: 100%;"></van-text>
                </van-linear-layout>
                <van-linear-layout ref="linear_layout_17" class="cw-style-width" direction="horizontal" :wrap="false"
                  mode="flex" justify="start" alignment="center"
                  style="--cw-style-width:100%;width:100%;--custom-start: auto; margin-top: 2.13333vw;">
                  <van-linear-layout ref="linear_layout_16" direction="horizontal" :wrap="true" mode="flex"
                    justify="end" alignment="center"
                    style="--custom-start: auto; width: 18.66667vw; margin-right: 2.13333vw;">
                    <van-text ref="text_217" class="cw-style-text-align cw-style-color" text="参与人："
                      style="--cw-style-text-align:right;--cw-style-color:#999;color:#999;text-align:right;--custom-start: auto; font-size: 100%; width: 18.66667vw;"></van-text>
                  </van-linear-layout>
                  <van-text ref="text_218" class="cw-style-width cw-style-color" overflow="ellipsis" widthStretch="true"
                    :text="$utils['ToString']('nasl.core.String', genviewMatchExpression_14lzsjm0())"
                    style="--cw-style-width:100%;--cw-style-color:#333333;color:#333333;width:100%;--custom-start: auto; font-size: 100%;"></van-text>
                </van-linear-layout>
              </van-linear-layout>
            </van-linear-layout>
          </ow-process-info>
        </van-tab>
        <van-tab ref="tab_3">
          <template #title>
            <van-text ref="text_208" text="审批记录"></van-text>
          </template>
          <ow-process-record ref="ow_process_record_1">
            <van-list-view ref="list_view_1" class="cw-style-height cw-style-border-color"
              @sync:state="(key, val) => onSyncState('list_view_1', key, val)" pageable="auto-more"
              :vusionDisabledAddslot="true" :pageSize="5" :dataSource="__list_view_1_handleDataSourceLoad()"
              :hiddenempty="true" scrollTarget="parent"
              style="--cw-style-height:auto;--cw-style-border-color:#c06161;border-color:#c06161;height:auto;">
              <template #next>
                <van-text ref="text_219" text="下一页"></van-text>
              </template>
              <template #prev>
                <van-text ref="text_220" text="上一页"></van-text>
              </template>
              <template #empty>
                <van-linear-layout ref="linear_layout_20" direction="horizontal" :wrap="true"
                  style="--custom-start: auto; padding: 2.93337vw 1.06667vw;">
                  <van-text ref="text_221" text="暂无数据"></van-text>
                </van-linear-layout>
              </template>
              <template #item="current">
                <van-linear-layout :ref="`linear_layout_32_${(current || {}).__nodeKey || (current || {}).index}`"
                  direction="horizontal" :wrap="true" style="--custom-start: auto; padding: 0 4.26667vw;">
                  <van-linear-layout :ref="`linear_layout_31_${(current || {}).__nodeKey || (current || {}).index}`"
                    direction="horizontal" gap="normal" mode="block"
                    style="--van-space-base:0px;--custom-start: auto; border: .5px solid #E5E5E5; box-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06); border-radius: 1.06667vw; background: #fff; padding: 3.2vw 4.26667vw; font-size: 3.73333vw; margin-bottom: 2.13333vw;">
                    <van-linear-layout :ref="`linear_layout_22_${(current || {}).__nodeKey || (current || {}).index}`"
                      class="cw-style-width" direction="horizontal" :wrap="true" mode="flex" justify="start"
                      alignment="center" widthStretch="false" style="--cw-style-width:100%;width:100%;">
                      <van-linear-layout :ref="`linear_layout_21_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-text-align" direction="horizontal" :wrap="false" mode="flex" justify="start"
                        alignment="center"
                        style="--cw-style-text-align:left;text-align:left;--custom-start: auto; width: 18.66667vw; margin-right: 2.13333vw;">
                        <van-text :ref="`text_222_${(current || {}).__nodeKey || (current || {}).index}`"
                          class="cw-style-text-align cw-style-color" text="流程节点："
                          style="--cw-style-text-align:right;--cw-style-color:#999;color:#999;text-align:right;--custom-start: auto; font-size: 100%; width: 18.66667vw;"></van-text>
                      </van-linear-layout>
                      <van-text :ref="`text_223_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-width cw-style-text-align cw-style-color" overflow="ellipsis"
                        widthStretch="true"
                        :text="$utils['ToString']('nasl.core.String', genviewMatchExpression_1xwgono0(current))"
                        style="--cw-style-width:auto;--cw-style-text-align:left;--cw-style-color:#333333;color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"></van-text>
                    </van-linear-layout>
                    <van-linear-layout :ref="`linear_layout_24_${(current || {}).__nodeKey || (current || {}).index}`"
                      class="cw-style-width" direction="horizontal" :wrap="true" mode="flex" justify="start"
                      alignment="center" widthStretch="false"
                      style="--cw-style-width:100%;width:100%;--custom-start: auto; margin-top: 2.13333vw;">
                      <van-linear-layout :ref="`linear_layout_23_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-text-align" direction="horizontal" :wrap="false" mode="flex" justify="start"
                        alignment="center"
                        style="--cw-style-text-align:left;text-align:left;--custom-start: auto; width: 18.66667vw; margin-right: 2.13333vw;">
                        <van-text :ref="`text_224_${(current || {}).__nodeKey || (current || {}).index}`"
                          class="cw-style-text-align cw-style-color" text="处理人："
                          style="--cw-style-text-align:right;--cw-style-color:#999;color:#999;text-align:right;--custom-start: auto; font-size: 100%; width: 18.66667vw;"></van-text>
                      </van-linear-layout>
                      <van-text :ref="`text_225_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-width cw-style-text-align cw-style-color" overflow="ellipsis"
                        widthStretch="true"
                        :text="$utils['ToString']('nasl.core.String', genviewMatchExpression_1eyebos0(current))"
                        style="--cw-style-width:auto;--cw-style-text-align:left;--cw-style-color:#333333;color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"></van-text>
                    </van-linear-layout>
                    <van-linear-layout :ref="`linear_layout_26_${(current || {}).__nodeKey || (current || {}).index}`"
                      class="cw-style-width" direction="horizontal" :wrap="true" mode="flex" justify="start"
                      alignment="center" widthStretch="false"
                      style="--cw-style-width:100%;width:100%;--custom-start: auto; margin-top: 2.13333vw;">
                      <van-linear-layout :ref="`linear_layout_25_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-text-align" direction="horizontal" :wrap="false" mode="flex" justify="start"
                        alignment="center"
                        style="--cw-style-text-align:left;text-align:left;--custom-start: auto; width: 18.66667vw; margin-right: 2.13333vw;">
                        <van-text :ref="`text_226_${(current || {}).__nodeKey || (current || {}).index}`"
                          class="cw-style-text-align cw-style-color" text="处理时间："
                          style="--cw-style-text-align:right;--cw-style-color:#999;color:#999;text-align:right;--custom-start: auto; font-size: 100%; width: 18.66667vw;"></van-text>
                      </van-linear-layout>
                      <van-text :ref="`text_227_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-width cw-style-text-align cw-style-color" overflow="ellipsis"
                        widthStretch="true"
                        :text="$utils['ToString']('nasl.core.String', genviewMatchExpression_1f7qyv91(current))"
                        style="--cw-style-width:auto;--cw-style-text-align:left;--cw-style-color:#333333;color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"></van-text>
                    </van-linear-layout>
                    <van-linear-layout :ref="`linear_layout_28_${(current || {}).__nodeKey || (current || {}).index}`"
                      class="cw-style-width" direction="horizontal" :wrap="true" mode="flex" justify="start"
                      alignment="center" widthStretch="false"
                      style="--cw-style-width:100%;width:100%;--custom-start: auto; margin-top: 2.13333vw;">
                      <van-linear-layout :ref="`linear_layout_27_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-text-align" direction="horizontal" :wrap="false" mode="flex" justify="start"
                        alignment="center"
                        style="--cw-style-text-align:left;text-align:left;--custom-start: auto; width: 18.66667vw; margin-right: 2.13333vw;">
                        <van-text :ref="`text_228_${(current || {}).__nodeKey || (current || {}).index}`"
                          class="cw-style-text-align cw-style-color" text="审批操作："
                          style="--cw-style-text-align:right;--cw-style-color:#999;color:#999;text-align:right;--custom-start: auto; font-size: 100%; width: 18.66667vw;"></van-text>
                      </van-linear-layout>
                      <van-text :ref="`text_229_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-width cw-style-text-align cw-style-background-color cw-style-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                        overflow="ellipsis" widthStretch="false"
                        :text="$utils['ToString']('nasl.core.String', ((current || {}).item || {}).nodeOperationDisplayText)"
                        :style="{ 'color': genviewMatchExpression_04jy7yt1(current), '--cw-style-color': genviewMatchExpression_04jy7yt1(current), 'background-color': genviewMatchExpression_1d3zx320(current) }"
                        style="--cw-style-width:auto;--cw-style-text-align:left;--cw-style-border-top-left-radius:4px;--cw-style-border-top-right-radius:4px;--cw-style-border-bottom-left-radius:4px;--cw-style-border-bottom-right-radius:4px;color:#333333;width:auto;text-align:left;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;--custom-start: auto; font-size: 100%; padding:0 2.13vw; max-width:calc(100% - 22vw);"></van-text>
                    </van-linear-layout>
                    <van-linear-layout :ref="`linear_layout_30_${(current || {}).__nodeKey || (current || {}).index}`"
                      class="cw-style-width" direction="horizontal" :wrap="true" mode="flex" justify="start"
                      alignment="center" widthStretch="false"
                      style="--cw-style-width:100%;width:100%;--custom-start: auto; margin-top: 2.13333vw;">
                      <van-linear-layout :ref="`linear_layout_29_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-text-align" direction="horizontal" :wrap="false" mode="flex" justify="start"
                        alignment="center"
                        style="--cw-style-text-align:left;text-align:left;--custom-start: auto; width: 18.66667vw; margin-right: 2.13333vw;">
                        <van-text :ref="`text_230_${(current || {}).__nodeKey || (current || {}).index}`"
                          class="cw-style-text-align cw-style-color" text="审批意见："
                          style="--cw-style-text-align:right;--cw-style-color:#999;color:#999;text-align:right;--custom-start: auto; font-size: 100%; width: 18.66667vw;"></van-text>
                      </van-linear-layout>
                      <van-text :ref="`text_231_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-width cw-style-text-align cw-style-color" overflow="ellipsis"
                        widthStretch="true"
                        :text="$utils['ToString']('nasl.core.String', genviewMatchExpression_1v26hzl0(current))"
                        style="--cw-style-width:auto;--cw-style-text-align:left;--cw-style-color:#333333;color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"></van-text>
                    </van-linear-layout>
                  </van-linear-layout>
                </van-linear-layout>
              </template>
            </van-list-view>
          </ow-process-record>
        </van-tab>
      </van-tabs>
      <ow-process-button ref="ow_process_button_1" style="position:fixed;left:0px;bottom:0px;z-index:10;">
        <van-linear-layout ref="linear_layout_56" class="cw-style-width cw-style-height" :wrap="false" mode="flex"
          justify="space-between" alignment="center"
          style="--cw-style-width:100%;--cw-style-height:auto;width:100%;height:auto;--custom-start: auto; padding: 2.13333vw 4.26667vw;">
          <van-linear-layout ref="linear_layout_35" key="linear_layout_35" :wrap="true"
            v-if="((processButtonList || {}).length) >= (3)">
            <van-popup-combination ref="popup_combination_1" placement="top"
              style="--popup-padding:0px;--popup-box-shadow:0 .53333vw 3.2vw rgba(50, 50, 51, .12);--popup-arrow-offset:27px;">
              <template #reference>
                <van-text ref="text_232" text="更多" style="--custom-start: auto; font-size: 3.73333vw;"></van-text>
              </template>
              <van-linear-layout ref="linear_layout_34" direction="horizontal" :wrap="true" gap="normal"
                style="--van-space-base:0px;">
                <van-for-components ref="for_components_1" :colnum="1" :dataSource="processButtonList">
                  <template #item="current">
                    <van-row :ref="`row_1_${(current || {}).__nodeKey || (current || {}).index}`" gutter="0"
                      :vusionDisabledCopy="true" :vusionDisabledAddslot="true" :vusionDisabledCut="true">
                      <van-col :ref="`col_1_${(current || {}).__nodeKey || (current || {}).index}`" :span="24"
                        :vusionDisabledCopy="true" :vusionDisabledCut="true">
                        <van-linear-layout
                          :ref="`linear_layout_33_${(current || {}).__nodeKey || (current || {}).index}`"
                          :key="`linear_layout_33_${(current || {}).__nodeKey || (current || {}).index}`"
                          direction="horizontal" :wrap="true" mode="flex" justify="center" alignment="center"
                          gap="normal" @click="linear_layout_33_click($event, current)"
                          v-if="((current || {}).index) >= (2)"
                          style="--van-space-base:0px;--custom-start: auto; box-sizing: border-box; height: 11.73333vw;">
                          <van-text :ref="`text_233_${(current || {}).__nodeKey || (current || {}).index}`"
                            :text="$utils['ToString']('nasl.core.String', ((current || {}).item || {}).displayText)"
                            style="--custom-start: auto; font-size: 3.73333vw;"></van-text>
                        </van-linear-layout>
                      </van-col>
                    </van-row>
                  </template>
                  <van-row ref="row_2" gutter="0" :vusionDisabledCopy="true" :vusionDisabledAddslot="true"
                    :vusionDisabledCut="true">
                    <van-col ref="col_2" :span="24" :vusionDisabledCopy="true" :vusionDisabledCut="true"></van-col>
                  </van-row>
                </van-for-components>
              </van-linear-layout>
            </van-popup-combination>
          </van-linear-layout>
          <van-linear-layout ref="linear_layout_36" :wrap="false" gap="normal" mode="flex" justify="end"
            alignment="center" widthStretch="true" style="--van-space-base:0px;--custom-start: auto; gap: 3.2vw;">
            <van-button ref="button_1" key="button_1" class="cw-style-width" type="default" size="middle"
              squareroud="round" widthStretch="false"
              :text="$utils['ToString']('nasl.core.String', ($utils['Get'](processButtonList, 1) || {}).displayText)"
              @click="button_1_click($event)" v-if="((processButtonList || {}).length) >= (2)"
              style="--cw-style-width:100%;width:100%;--custom-start: auto; height: 9.6vw; padding: 0 13.06667vw; font-size: 3.73333vw; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: calc(calc(80vw - 20px) / 2);"></van-button>
            <van-button ref="button_2" key="button_2" class="cw-style-width cw-style-text-align" type="info"
              size="middle" squareroud="round" widthStretch="false"
              :text="$utils['ToString']('nasl.core.String', ($utils['Get'](processButtonList, 0) || {}).displayText)"
              @click="button_2_click($event)" v-if="((processButtonList || {}).length) >= (1)"
              style="--cw-style-width:100%;--cw-style-text-align:center;width:100%;text-align:center;--custom-start: auto; height: 9.6vw; padding: 0 13.06667vw; font-size: 3.73333vw; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: calc(calc(80vw - 20px) / 2);"></van-button>
          </van-linear-layout>
        </van-linear-layout>
      </ow-process-button>
    </van-linear-layout>
    <van-dialog ref="button_dialog_1" :safeAreaInsetBottom="true" :closeOnClickOverlay="true">
      <template #footer>
        <van-linear-layout ref="linear_layout_37" class="cw-style-width" type="flex" :vusionDisabledCut="true"
          style="--cw-style-width:100%;width:100%;">
          <van-button ref="button_3" class="cw-style-margin" size="large" nativeType="button" text="取消"
            @click="button_3_click($event)"
            style="--cw-style-margin:0;-webkit-box-flex:1;flex:1;margin:0;border:0;--custom-start: auto; font-size: 4.26667vw;"></van-button>
          <van-button ref="button_4"
            class="cw-style-margin cw-style-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-bottom-left-radius"
            size="large" nativeType="button" text="确认" @click="button_4_click($event)"
            style="--cw-style-margin:0;--cw-style-color:var(--van-dialog-confirm-button-text-color);--cw-style-border-top-left-radius:0;--cw-style-border-bottom-left-radius:0;-webkit-box-flex:1;flex:1;margin:0;border:0;color:var(--van-dialog-confirm-button-text-color);border-left:1px solid var(--van-border-color);border-top-left-radius:0;border-bottom-left-radius:0;--custom-start: auto; font-size: 4.26667vw;"></van-button>
        </van-linear-layout>
      </template>
      <div ref="div_1" class="cw-style-text-align cw-style-padding" vusionSlotName="default" :vusionDisabledCopy="true"
        :vusionDisabledCut="true" env="alone"
        style="--cw-style-text-align:center;--cw-style-padding:24px;min-height:100px;padding:24px;text-align:center;">
        <van-linear-layout ref="linear_layout_42" direction="vertical" gap="none">
          <van-linear-layout ref="linear_layout_38" :wrap="true" style="--custom-start: auto; padding-top: 3.4666vw;">
            <van-text ref="text_234"
              :text="$utils['ToString']('nasl.core.String', (processButtonItem || {}).displayText)"
              style="--custom-start: auto; font-size: 3.2vw; font-weight: 500; line-height: 6.4vw;"></van-text>
          </van-linear-layout>
          <van-linear-layout ref="linear_layout_41" :wrap="true">
            <van-form ref="form_buttonDialog_1">
              <van-field ref="field_7" key="field_7"
                class="cw-style-padding-left cw-style-padding cw-style-padding-bottom cw-style-padding-top"
                :required="false" drole="other" labelLayout="block"
                :rules="[{ validate: 'filled', message: `表单项不得为空`, trigger: 'input+blur', required: true }]"
                v-if="(((processButtonItem || {}).name) != (`reassign`)) && (((processButtonItem || {}).name) != (`addSign`)) && ((processButtonItem || {}).commentRequired)"
                style="--cw-style-padding-left:0px;--cw-style-padding-bottom:0px;--cw-style-padding-top:0px;padding-top:0px;padding-bottom:0px;padding-left:0px;">
                <template #input>
                  <van-linear-layout ref="linear_layout_39" class="cw-style-width" direction="horizontal" :wrap="true"
                    style="--cw-style-width:100%;width:100%;--custom-start: auto; box-sizing: border-box; padding: 0 2.13333vw; border-radius: 1.06667vw; border: 1px solid #DADEE8; text-align: left;">
                    <van-fieldtextarea ref="fieldtextarea_1" class="cw-style-text-align" placeholder="请输入审批意见"
                      :value.sync="processButtonBody.comment"
                      style="--cw-style-text-align:left;text-align:left;"></van-fieldtextarea>
                  </van-linear-layout>
                </template>
                <template #title>
                  <van-text ref="text_235" text="审批意见"></van-text>
                  <van-text ref="text_236" class="cw-style-color" text="*"
                    style="--cw-style-color:red;color:red;"></van-text>
                </template>
              </van-field>
              <van-field ref="field_8" key="field_8"
                class="cw-style-padding-left cw-style-padding cw-style-padding-bottom cw-style-padding-top"
                :required="false" drole="other" labelLayout="block"
                v-if="(((processButtonItem || {}).name) != (`reassign`)) && (((processButtonItem || {}).name) != (`addSign`)) && (!((processButtonItem || {}).commentRequired))"
                style="--cw-style-padding-left:0px;--cw-style-padding-bottom:0px;--cw-style-padding-top:0px;padding-top:0px;padding-bottom:0px;padding-left:0px;">
                <template #input>
                  <van-linear-layout ref="linear_layout_40" class="cw-style-width" direction="horizontal" :wrap="true"
                    style="--cw-style-width:100%;width:100%;--custom-start: auto; box-sizing: border-box; padding: 0 2.13333vw; border-radius: 1.06667vw; border: 1px solid #DADEE8; text-align: left;">
                    <van-fieldtextarea ref="fieldtextarea_2" class="cw-style-text-align" placeholder="请输入审批意见"
                      :value.sync="processButtonBody.comment"
                      style="--cw-style-text-align:left;text-align:left;"></van-fieldtextarea>
                  </van-linear-layout>
                </template>
                <template #title>
                  <van-text ref="text_237" text="审批意见"></van-text>
                </template>
              </van-field>
              <van-field ref="field_9" key="field_9"
                class="cw-style-padding-left cw-style-padding cw-style-padding-bottom cw-style-padding-top"
                :required="false" drole="other" labelLayout="block"
                :rules="[{ validate: 'filled', message: `表单项不得为空`, trigger: 'input+blur', required: true }]"
                v-if="((processButtonItem || {}).name) == (`reassign`)"
                style="--cw-style-padding-left:0px;--cw-style-padding-bottom:0px;--cw-style-padding-top:0px;padding-top:0px;padding-bottom:0px;padding-left:0px;">
                <template #input>
                  <van-pickerson ref="pickerson_1"
                    class="cw-style-border-style cw-style-border-color cw-style-border-left-width cw-style-border-width cw-style-border-right-width cw-style-border-top-width cw-style-border-bottom-width"
                    @sync:state="(key, val) => onSyncState('pickerson_1', key, val)" title="转交人" :showToolbar="true"
                    :optionIsSlot="true" :pageable="true" :pageSize="20" :value.sync="processButtonBody.userForOperate"
                    :closeOnClickOverlay="true" inputAlign="left" placeholder="请选择转交人"
                    :dataSource="__pickerson_1_handleDataSourceLoad()" valueField="userName" :filterable="true"
                    style="--cw-style-border-style:solid;--cw-style-border-color:#DADEE8;--cw-style-border-left-width:1px;--cw-style-border-right-width:1px;--cw-style-border-top-width:1px;--cw-style-border-bottom-width:1px;border-color:#DADEE8;border-top-width:1px;border-left-width:1px;border-right-width:1px;border-bottom-width:1px;border-style:solid;--custom-start: auto; box-sizing: border-box; padding: 0 2.13333vw; margin: 2.66667vw 0; border-radius: 1.06667vw;">
                    <template #picker-bottom>
                      <van-picker-action-slot ref="picker_action_slot_1" targetMethod="cancel">
                        <van-button ref="button_5" type="info_secondary" size="normal" text="取消"
                          squareroud="round"></van-button>
                      </van-picker-action-slot>
                      <van-picker-action-slot ref="picker_action_slot_2" targetMethod="confirm">
                        <van-button ref="button_6" type="info" size="normal" text="确认" squareroud="round"></van-button>
                      </van-picker-action-slot>
                    </template>
                    <template #picker-top>
                      <van-picker-action-slot ref="picker_action_slot_3" targetMethod="cancel">
                        <van-iconv ref="iconv_1" name="left-arrow" icotype="only"></van-iconv>
                      </van-picker-action-slot>
                      <van-picker-action-slot ref="picker_action_slot_4"
                        targetMethod="confirm"></van-picker-action-slot>
                    </template>
                    <template #pannel-title>
                      <van-text ref="text_238" text="标题"></van-text>
                    </template>
                    <template #option="current">
                      <van-text :ref="`text_239_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-font-size" overflow="ellipsis"
                        :text="$utils['ToString']('nasl.core.String', genviewMatchExpression_00bkeat0(current))"
                        style="--cw-style-font-size:16px;font-size:16px;"></van-text>
                    </template>
                  </van-pickerson>
                </template>
              </van-field>
            </van-form>
          </van-linear-layout>
        </van-linear-layout>
      </div>
    </van-dialog>
    <van-dialog ref="button_backDialog_1" :safeAreaInsetBottom="true" :closeOnClickOverlay="true">
      <template #footer>
        <van-linear-layout ref="linear_layout_43" class="cw-style-width" type="flex" :vusionDisabledCut="true"
          style="--cw-style-width:100%;width:100%;">
          <van-button ref="button_7" class="cw-style-margin" size="large" nativeType="button" text="取消"
            @click="button_7_click($event)"
            style="--cw-style-margin:0;-webkit-box-flex:1;flex:1;margin:0;border:0;--custom-start: auto; font-size: 4.26667vw;"></van-button>
          <van-button ref="button_8"
            class="cw-style-margin cw-style-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-bottom-left-radius"
            size="large" nativeType="button" text="确认" @click="button_8_click($event)"
            style="--cw-style-margin:0;--cw-style-color:var(--van-dialog-confirm-button-text-color);--cw-style-border-top-left-radius:0;--cw-style-border-bottom-left-radius:0;-webkit-box-flex:1;flex:1;margin:0;border:0;color:var(--van-dialog-confirm-button-text-color);border-left:1px solid var(--van-border-color);border-top-left-radius:0;border-bottom-left-radius:0;--custom-start: auto; font-size: 4.26667vw;"></van-button>
        </van-linear-layout>
      </template>
      <div ref="div_2" class="cw-style-padding" vusionSlotName="default" :vusionDisabledCopy="true"
        :vusionDisabledCut="true" env="alone" style="--cw-style-padding:24px;min-height:100px;padding:24px;">
        <van-linear-layout ref="linear_layout_46" direction="vertical" gap="none">
          <van-linear-layout ref="linear_layout_44" :wrap="true">
            <van-text ref="text_240"
              :text="$utils['ToString']('nasl.core.String', (processButtonItem || {}).displayText)"
              style="--custom-start: auto; font-size: 3.2vw; font-weight: 500; line-height: 6.4vw;"></van-text>
          </van-linear-layout>
          <van-linear-layout ref="linear_layout_45" :wrap="true" gap="normal" mode="flex" justify="center"
            alignment="start" style="--van-space-base:0px;--custom-start: auto; padding-top: 3.46666vw;">
            <van-text ref="text_241" text="请确认是否" style="--custom-start: auto; font-size: 3.73333vw;"></van-text>
            <van-text ref="text_242"
              :text="$utils['ToString']('nasl.core.String', (processButtonItem || {}).displayText)"
              style="--custom-start: auto; font-size: 3.73333vw;"></van-text>
            <van-text ref="text_243" text="流程？" style="--custom-start: auto; font-size: 3.73333vw;"></van-text>
          </van-linear-layout>
        </van-linear-layout>
      </div>
    </van-dialog>
    <van-dialog ref="dialog_1" :safeAreaInsetBottom="true">
      <template #footer>
        <van-linear-layout ref="linear_layout_94" class="cw-style-width" type="flex" :vusion-disabled-cut="true"
          style="--cw-style-width:100%;width:100%;">
          <van-button ref="button_30" class="van-button van-button--default van-dialog__cancel" text="取消"></van-button>
          <van-button ref="button_31" class="van-button van-button--default van-dialog__confirm van-hairline--left"
            text="确认" @click="button_31_click($event)"></van-button>
        </van-linear-layout>
      </template>
      <div ref="div_4" class="dialogchild" vusion-slot-name="default" :vusion-disabled-copy="true"
        :vusion-disabled-cut="true" env="alone" style="min-height:100px;">
        <van-row ref="row_9" gutter="0">
          <van-col ref="col_17" :span="8" mode="flex" justify="center" alignment="center">
            <van-iconv ref="iconv_6"
              class="cw-style-background-color cw-style-font-size cw-style-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
              name="info" icotype="only"
              :style="{ 'background-color': `#ffaf0f`, '--cw-style-background-color': `#ffaf0f`, 'color': `#fff` }"
              style="--cw-style-font-size:48px;--cw-style-border-top-left-radius:24px;--cw-style-border-top-right-radius:24px;--cw-style-border-bottom-left-radius:24px;--cw-style-border-bottom-right-radius:24px;font-size:48px;border-top-left-radius:24px;border-bottom-left-radius:24px;border-top-right-radius:24px;border-bottom-right-radius:24px;">
              <van-text ref="text_131" text="图标"></van-text>
            </van-iconv>
          </van-col>
          <van-col ref="col_18" class="cw-style-text-align" :span="16"
            style="--cw-style-text-align:left;text-align:left;">
            <van-text ref="text_133" class="cw-style-font-size cw-style-font-weight" text="请确认是否删除？" display="block"
              style="--cw-style-font-size:18px;--cw-style-font-weight:bold;font-size:18px;font-weight:bold;"></van-text>
            <van-text ref="text_134" class="cw-style-font-size" text="删除后将无法恢复，请谨慎操作"
              style="--cw-style-font-size:14px;font-size:14px;"></van-text>
          </van-col>
        </van-row>
      </div>
    </van-dialog>
    <van-popup ref="button_popup_1" position="bottom" :safeAreaInsetBottom="true" evn="picker"
      :closeOnClickOverlay="true" @open="button_popup_1_open($event)"
      style="--custom-start: auto; border-radius: 4.26667vw 4.26667vw 0 0;">
      <div ref="div_3" class="cw-style-width cw-style-height" vusionSlotName="default" :vusionDisabledCut="true"
        style="--cw-style-width:100%;--cw-style-height:100%;min-width:200px;min-height:200px;width:100%;height:100%;">
        <van-linear-layout ref="linear_layout_55" direction="vertical" gap="none">
          <van-linear-layout ref="linear_layout_47"
            class="cw-style-border-style cw-style-border-color cw-style-border-left-width cw-style-border-width cw-style-border-right-width cw-style-border-top-width cw-style-border-bottom-width"
            :wrap="true" gap="normal" mode="flex" justify="space-between" alignment="center"
            style="--cw-style-border-style:solid;--cw-style-border-color:#d9d9d9;--cw-style-border-left-width:0px;--cw-style-border-right-width:0px;--cw-style-border-top-width:0px;--cw-style-border-bottom-width:1px;border-color:#d9d9d9;border-top-width:0px;border-left-width:0px;border-right-width:0px;border-bottom-width:1px;border-style:solid;--custom-start: auto; font-size: 4.26667vw; font-weight: 500; padding: 3.2vw 4.26667vw;">
            <van-text ref="text_244"
              :text="$utils['ToString']('nasl.core.String', (processButtonItem || {}).displayText)"
              style="--custom-start: auto; font-size: 100%;"></van-text>
            <van-iconv ref="iconv_2" class="cw-style-color" name="close" icotype="only" @click="iconv_2_click($event)"
              style="--cw-style-color:#CCCCCC;color:#CCCCCC;--custom-start: auto; font-size: 4.26667vw; width: 1em; height: 1em; vertical-align: -.15em; fill: currentColor; line-height:1em">
              <van-text ref="text_245" text="图标"></van-text>
            </van-iconv>
          </van-linear-layout>
          <van-linear-layout ref="linear_layout_53" :wrap="true" style="overflow:auto;max-height:60vh;">
            <van-form ref="form_buttonPopup_1"
              style="--custom-start: auto; font-size: 4.26667vw; padding-left: 2.26667vw; padding-right: 1.26667vw; margin-top: 4.46667vw;">
              <van-field ref="field_10" key="field_10"
                class="cw-style-padding-left cw-style-padding cw-style-padding-bottom cw-style-padding-top"
                :required="false" drole="other" labelLayout="block"
                :rules="[{ validate: 'filled', message: `表单项不得为空`, trigger: 'input+blur', required: true }]" :border="false"
                v-if="((processButtonItem || {}).name) == (`addSign`)"
                style="--cw-style-padding-left:0px;--cw-style-padding-bottom:0px;--cw-style-padding-top:0px;padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;">
                <template #input>
                  <van-radio-group ref="radio_group_addSign_1" class="cw-style-width" direction="horizontal"
                    :isNew="true" icon="sure" :column="1" :value.sync="processButtonBody.policyForAddSign"
                    style="--cw-style-width:100%;width:100%;--custom-start: auto; margin-top: 1.66667vw;--van-radio-label-margin: 0px;">
                    <template #item="current">
                      <van-radio :ref="`radio_1_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-width cw-style-background-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                        :vusionDisabledCut="true" :vusionDisabledCopy="true"
                        style="--cw-style-width:100%;--cw-style-background-color:#F7F8FA;--cw-style-border-top-left-radius:6px;--cw-style-border-top-right-radius:6px;--cw-style-border-bottom-left-radius:6px;--cw-style-border-bottom-right-radius:6px;background-color:#F7F8FA;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;width:100%;--custom-start: auto; padding: 2.1vw 4.26667vw; flex-direction: row-reverse; justify-content: space-between; margin-bottom: 2.1vw;"></van-radio>
                    </template>
                    <van-radio ref="radio_2"
                      class="cw-style-width cw-style-background-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                      icon="sure" name="CurrentNode"
                      style="--cw-style-width:100%;--cw-style-background-color:#F7F8FA;--cw-style-border-top-left-radius:6px;--cw-style-border-top-right-radius:6px;--cw-style-border-bottom-left-radius:6px;--cw-style-border-bottom-right-radius:6px;background-color:#F7F8FA;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;width:100%;--custom-start: auto; padding: 3.2vw 4.26667vw; flex-direction: row-reverse; justify-content: space-between; margin-bottom: 2.1vw;">
                      <van-linear-layout ref="linear_layout_48" :wrap="true" mode="flex" direction="vertical"
                        justify="start" alignment="start" gap="normal" style="--van-space-base:0px;">
                        <van-text ref="text_246" class="cw-style-font-weight" text="当前节点加签"
                          style="--cw-style-font-weight:bold;font-weight:bold;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                        <van-text ref="text_247" class="cw-style-color" text="和被加签人一起审批"
                          style="--cw-style-color:#999999;color:#999999;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                      </van-linear-layout>
                    </van-radio>
                    <van-radio ref="radio_3" key="radio_3"
                      class="cw-style-width cw-style-background-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                      icon="sure" name="PreviousNode" v-if="(processButtonApprovalPolicy) == (`simple`)"
                      style="--cw-style-width:100%;--cw-style-background-color:#F7F8FA;--cw-style-border-top-left-radius:6px;--cw-style-border-top-right-radius:6px;--cw-style-border-bottom-left-radius:6px;--cw-style-border-bottom-right-radius:6px;background-color:#F7F8FA;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;width:100%;--custom-start: auto; padding: 3.2vw 4.26667vw; flex-direction: row-reverse; justify-content: space-between; margin-bottom: 2.1vw;">
                      <van-linear-layout ref="linear_layout_49" :wrap="true" mode="flex" direction="vertical"
                        justify="start" alignment="start" gap="normal" style="--van-space-base:0px;">
                        <van-text ref="text_248" class="cw-style-font-weight" text="前加签"
                          style="--cw-style-font-weight:bold;font-weight:bold;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                        <van-text ref="text_249" class="cw-style-color" text="被加签人先处理"
                          style="--cw-style-color:#999999;color:#999999;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                      </van-linear-layout>
                    </van-radio>
                    <van-radio ref="radio_4" key="radio_4"
                      class="cw-style-width cw-style-background-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                      icon="sure" name="NextNode" v-if="(processButtonApprovalPolicy) == (`simple`)"
                      style="--cw-style-width:100%;--cw-style-background-color:#F7F8FA;--cw-style-border-top-left-radius:6px;--cw-style-border-top-right-radius:6px;--cw-style-border-bottom-left-radius:6px;--cw-style-border-bottom-right-radius:6px;background-color:#F7F8FA;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;width:100%;--custom-start: auto; padding: 3.2vw 4.26667vw; flex-direction: row-reverse; justify-content: space-between; margin-bottom: 2.1vw;">
                      <van-linear-layout ref="linear_layout_50" :wrap="true" mode="flex" direction="vertical"
                        justify="start" alignment="start" gap="normal" style="--van-space-base:0px;">
                        <van-text ref="text_250" class="cw-style-font-weight" text="后加签并通过"
                          style="--cw-style-font-weight:bold;font-weight:bold;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                        <van-text ref="text_251" class="cw-style-color" text="被加签人后处理"
                          style="--cw-style-color:#999999;color:#999999;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                      </van-linear-layout>
                    </van-radio>
                  </van-radio-group>
                </template>
                <template #title>
                  <van-text ref="text_252" text="加签方式" style="--custom-start: auto; font-size: 3.7333vw;"></van-text>
                  <van-text ref="text_253" class="cw-style-color" text="*"
                    style="--cw-style-color:red;color:red;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                </template>
              </van-field>
              <van-field ref="field_11" key="field_11"
                class="cw-style-padding-left cw-style-padding cw-style-padding-bottom cw-style-padding-top"
                :required="false" drole="other" labelLayout="block"
                :rules="[{ validate: 'filled', message: `表单项不得为空`, trigger: 'input+blur', required: true }]"
                v-if="((processButtonItem || {}).name) == (`addSign`)"
                style="--cw-style-padding-left:0px;--cw-style-padding-bottom:0px;--cw-style-padding-top:0px;padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;">
                <template #input>
                  <van-pickerson ref="pickerson_2"
                    class="cw-style-border-style cw-style-border-bottom-width cw-style-border-width"
                    @sync:state="(key, val) => onSyncState('pickerson_2', key, val)" title="加签人员" :showToolbar="true"
                    :optionIsSlot="true" :pageSize="20" :value.sync="processButtonBody.userForOperate"
                    :dataSource="__pickerson_2_handleDataSourceLoad()" valueField="userName" :filterable="true"
                    :closeOnClickOverlay="true" :pageable="true"
                    style="--cw-style-border-style:solid;--cw-style-border-bottom-width:1px;border-bottom-width:1px;border-style:solid;--custom-start: auto; font-size: 3.7333vw; padding-bottom: 2.66667vw;">
                    <template #picker-bottom>
                      <van-picker-action-slot ref="picker_action_slot_5" targetMethod="cancel">
                        <van-button ref="button_9" type="info_secondary" size="normal" text="取消"
                          squareroud="round"></van-button>
                      </van-picker-action-slot>
                      <van-picker-action-slot ref="picker_action_slot_6" targetMethod="confirm">
                        <van-button ref="button_10" type="info" size="normal" text="确认" squareroud="round"></van-button>
                      </van-picker-action-slot>
                    </template>
                    <template #picker-top>
                      <van-picker-action-slot ref="picker_action_slot_7" targetMethod="cancel">
                        <van-iconv ref="iconv_3" name="left-arrow" icotype="only"></van-iconv>
                      </van-picker-action-slot>
                      <van-picker-action-slot ref="picker_action_slot_8"
                        targetMethod="confirm"></van-picker-action-slot>
                    </template>
                    <template #pannel-title>
                      <van-text ref="text_254" text="标题"></van-text>
                    </template>
                    <template #title>
                      <van-text ref="text_255" text="加签人员"
                        style="--custom-start: auto; font-size: 3.7333vw;"></van-text>
                      <van-text ref="text_256" class="cw-style-color" text="*"
                        style="--cw-style-color:red;color:red;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                    </template>
                    <template #option="current">
                      <van-text :ref="`text_257_${(current || {}).__nodeKey || (current || {}).index}`"
                        class="cw-style-font-size" overflow="ellipsis"
                        :text="$utils['ToString']('nasl.core.String', genviewMatchExpression_13dicob0(current))"
                        style="--cw-style-font-size:16px;font-size:16px;"></van-text>
                    </template>
                  </van-pickerson>
                </template>
              </van-field>
              <van-field ref="field_12" key="field_12"
                class="cw-style-padding-left cw-style-padding cw-style-padding-bottom cw-style-padding-top"
                :required="false" drole="other" labelLayout="block"
                :rules="[{ validate: 'filled', message: `表单项不得为空`, trigger: 'input+blur', required: true }]" :border="false"
                v-if="((processButtonItem || {}).name) == (`revert`)"
                style="--cw-style-padding-left:0px;--cw-style-padding-bottom:0px;--cw-style-padding-top:0px;padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;">
                <template #input>
                  <van-linear-layout ref="linear_layout_51"
                    class="cw-style-width cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                    direction="horizontal" :wrap="true"
                    style="--cw-style-width:100%;--cw-style-border-top-left-radius:6px;--cw-style-border-top-right-radius:6px;--cw-style-border-bottom-left-radius:6px;--cw-style-border-bottom-right-radius:6px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;overflow:hidden;width:100%;--custom-start: auto; margin-top: 1.66667vw;">
                    <van-radio-group ref="radio_group_revert_flow_1"
                      class="cw-style-width cw-style-font-size cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                      direction="horizontal" :isNew="true" icon="sure" :column="1"
                      :value.sync="processButtonBody.nodeId"
                      :dataSource="__radio_group_revert_flow_1_handleDataSourceLoad()"
                      style="--cw-style-width:100%;--cw-style-font-size:14px;--cw-style-border-top-left-radius:6px;--cw-style-border-top-right-radius:6px;--cw-style-border-bottom-left-radius:6px;--cw-style-border-bottom-right-radius:6px;width:100%;font-size:14px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;--custom-start: auto; --van-radio-label-margin: 0px;">
                      <template #item="current">
                        <van-radio :ref="`radio_5_${(current || {}).__nodeKey || (current || {}).index}`"
                          class="cw-style-width cw-style-background-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                          :vusionDisabledCut="true" :vusionDisabledCopy="true"
                          :name="((current || {}).item || {}).nodeId"
                          style="--cw-style-width:100%;--cw-style-background-color:#F7F8FA;--cw-style-border-top-left-radius:0px;--cw-style-border-top-right-radius:0px;--cw-style-border-bottom-left-radius:0px;--cw-style-border-bottom-right-radius:0px;width:100%;background-color:#F7F8FA;border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;--custom-start: auto; padding: 2.5vw 4.26667vw; flex-direction: row-reverse; justify-content: space-between;">
                          <van-text :ref="`text_258_${(current || {}).__nodeKey || (current || {}).index}`"
                            class="cw-style-font-weight"
                            :text="$utils['ToString']('nasl.core.String', ((current || {}).item || {}).nodeName)"
                            style="--cw-style-font-weight:bold;font-weight:bold;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                        </van-radio>
                      </template>
                    </van-radio-group>
                  </van-linear-layout>
                </template>
                <template #title>
                  <van-text ref="text_259" text="流转到" style="--custom-start: auto; font-size: 3.7333vw;"></van-text>
                  <van-text ref="text_260" class="cw-style-color" text="*"
                    style="--cw-style-color:red;color:red;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                </template>
              </van-field>
              <van-field ref="field_13" key="field_13"
                class="cw-style-padding-left cw-style-padding cw-style-padding-bottom cw-style-padding-top"
                :required="false" drole="other" labelLayout="block"
                :rules="[{ validate: 'filled', message: `表单项不得为空`, trigger: 'input+blur', required: true }]" :border="false"
                v-if="((processButtonItem || {}).afterComplete) == (`runtimeSpecify`)"
                style="--cw-style-padding-left:0px;--cw-style-padding-bottom:0px;--cw-style-padding-top:0px;padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;">
                <template #input>
                  <van-linear-layout ref="linear_layout_52"
                    class="cw-style-width cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                    direction="horizontal" :wrap="true"
                    style="--cw-style-width:100%;--cw-style-border-top-left-radius:6px;--cw-style-border-top-right-radius:6px;--cw-style-border-bottom-left-radius:6px;--cw-style-border-bottom-right-radius:6px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;overflow:hidden;width:100%;--custom-start: auto; margin-top: 1.66667vw;">
                    <van-radio-group ref="radio_group_revert_resubmit_1"
                      class="cw-style-width cw-style-font-size cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                      direction="horizontal" :isNew="true" icon="sure" :column="1"
                      :value.sync="processButtonBody.afterComplete"
                      style="--cw-style-width:100%;--cw-style-font-size:14px;--cw-style-border-top-left-radius:6px;--cw-style-border-top-right-radius:6px;--cw-style-border-bottom-left-radius:6px;--cw-style-border-bottom-right-radius:6px;width:100%;font-size:14px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;--custom-start: auto; --van-radio-label-margin: 0px;">
                      <van-radio ref="radio_6"
                        class="cw-style-width cw-style-background-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                        :vusionDisabledCut="true" :vusionDisabledCopy="true" name="reExecute"
                        style="--cw-style-width:100%;--cw-style-background-color:#F7F8FA;--cw-style-border-top-left-radius:0px;--cw-style-border-top-right-radius:0px;--cw-style-border-bottom-left-radius:0px;--cw-style-border-bottom-right-radius:0px;width:100%;background-color:#F7F8FA;border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;--custom-start: auto; padding: 2.5vw 4.26667vw; flex-direction: row-reverse; justify-content: space-between;">
                        <van-text ref="text_261" class="cw-style-font-weight" text="按流程顺序审批"
                          style="--cw-style-font-weight:bold;font-weight:bold;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                      </van-radio>
                      <van-radio ref="radio_7"
                        class="cw-style-width cw-style-background-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                        :vusionDisabledCut="true" :vusionDisabledCopy="true" name="jumpToSource"
                        style="--cw-style-width:100%;--cw-style-background-color:#F7F8FA;--cw-style-border-top-left-radius:0px;--cw-style-border-top-right-radius:0px;--cw-style-border-bottom-left-radius:0px;--cw-style-border-bottom-right-radius:0px;width:100%;background-color:#F7F8FA;border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;--custom-start: auto; padding: 2.5vw 4.26667vw; flex-direction: row-reverse; justify-content: space-between;">
                        <van-text ref="text_262" class="cw-style-font-weight" text="直接回到当前节点审批"
                          style="--cw-style-font-weight:bold;font-weight:bold;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                      </van-radio>
                    </van-radio-group>
                  </van-linear-layout>
                </template>
                <template #title>
                  <van-text ref="text_263" text="重新提交后" style="--custom-start: auto; font-size: 3.7333vw;"></van-text>
                  <van-text ref="text_264" class="cw-style-color" text="*"
                    style="--cw-style-color:red;color:red;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                </template>
              </van-field>
              <van-field ref="field_14" key="field_14"
                class="cw-style-padding-left cw-style-padding cw-style-padding-bottom cw-style-padding-top"
                :required="false" drole="other" labelLayout="block"
                :rules="[{ validate: 'filled', message: `表单项不得为空`, trigger: 'input+blur', required: true }]" :border="false"
                v-if="(((processButtonItem || {}).name) == (`revert`)) && ((processButtonItem || {}).commentRequired)"
                style="--cw-style-padding-left:0px;--cw-style-padding-bottom:0px;--cw-style-padding-top:0px;padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;">
                <template #input>
                  <van-fieldtextarea ref="fieldtextarea_3"
                    class="cw-style-text-align cw-style-background-color cw-style-padding-left cw-style-padding cw-style-padding-bottom cw-style-padding-top cw-style-padding-right cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                    placeholder="请输入" :value.sync="processButtonBody.comment"
                    style="--cw-style-text-align:left;--cw-style-background-color:#F7F8FA;--cw-style-padding-left:8px;--cw-style-padding-bottom:8px;--cw-style-padding-top:8px;--cw-style-padding-right:8px;--cw-style-border-top-left-radius:6px;--cw-style-border-top-right-radius:6px;--cw-style-border-bottom-left-radius:6px;--cw-style-border-bottom-right-radius:6px;text-align:left;background-color:#F7F8FA;padding-top:8px;padding-left:8px;padding-bottom:8px;padding-right:8px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;--custom-start: auto; min-height:25vw;"></van-fieldtextarea>
                </template>
                <template #title>
                  <van-text ref="text_265" text="审批意见" style="--custom-start: auto; font-size: 3.7333vw;"></van-text>
                  <van-text ref="text_266" class="cw-style-color" text="*"
                    style="--cw-style-color:red;color:red;--custom-start: auto; font-size: 3.7333vw;"></van-text>
                </template>
              </van-field>
              <van-field ref="field_15" key="field_15"
                class="cw-style-padding-left cw-style-padding cw-style-padding-bottom cw-style-padding-top"
                :required="false" drole="other" labelLayout="block"
                :rules="[{ validate: 'filled', message: `表单项不得为空`, trigger: 'input+blur', required: true }]" :border="false"
                v-if="(((processButtonItem || {}).name) == (`revert`)) && (!((processButtonItem || {}).commentRequired))"
                style="--cw-style-padding-left:0px;--cw-style-padding-bottom:0px;--cw-style-padding-top:0px;padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;">
                <template #input>
                  <van-fieldtextarea ref="fieldtextarea_4"
                    class="cw-style-text-align cw-style-background-color cw-style-padding-left cw-style-padding cw-style-padding-bottom cw-style-padding-top cw-style-padding-right cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
                    placeholder="请输入" :value.sync="processButtonBody.comment"
                    style="--cw-style-text-align:left;--cw-style-background-color:#F7F8FA;--cw-style-padding-left:8px;--cw-style-padding-bottom:8px;--cw-style-padding-top:8px;--cw-style-padding-right:8px;--cw-style-border-top-left-radius:6px;--cw-style-border-top-right-radius:6px;--cw-style-border-bottom-left-radius:6px;--cw-style-border-bottom-right-radius:6px;text-align:left;background-color:#F7F8FA;padding-top:8px;padding-left:8px;padding-bottom:8px;padding-right:8px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;--custom-start: auto; min-height:25vw;"></van-fieldtextarea>
                </template>
                <template #title>
                  <van-text ref="text_267" text="审批意见" style="--custom-start: auto; font-size: 3.7333vw;"></van-text>
                </template>
              </van-field>
            </van-form>
          </van-linear-layout>
          <van-linear-layout ref="linear_layout_54"
            class="cw-style-text-align cw-style-padding-bottom cw-style-padding cw-style-padding-top" :wrap="true"
            style="--cw-style-text-align:center;--cw-style-padding-bottom:8px;--cw-style-padding-top:8px;text-align:center;padding-top:8px;padding-bottom:8px;">
            <van-button ref="button_11" class="cw-style-width" type="default" size="middle" text="取消" squareroud="round"
              @click="button_11_click($event)"
              style="--cw-style-width:auto;width:auto;--custom-start: auto; height: 9.6vw; padding: 0 13.06667vw; font-size: 3.73333vw;"></van-button>
            <van-button ref="button_12" class="cw-style-width" type="info" size="middle" text="确定" squareroud="round"
              @click="button_12_click($event)"
              style="--cw-style-width:auto;width:auto;--custom-start: auto; height: 9.6vw; padding: 0 13.06667vw; font-size: 3.73333vw;"></van-button>
          </van-linear-layout>
        </van-linear-layout>
      </div>
    </van-popup>
    <van-toast ref="button_toast_1" message="无可流转节点，请联系管理员" :duration="2000" type="fail"></van-toast>
  </van-linear-layout>
</template>
<script>
const processDetailFromMixin = {
  data() {
    return {
      processDetailFormData: {},
      Process1: {
        data: {},
      },
      formTemplate: '', // 表单模版
      formVM: null, // 表单实例
      needReplaced: false, // 是否需要替换模版
    };
  },
  methods: {
    sliceStrByTag(tag, referIndex, startIndex = 0, endIndex = Infinity) {
      const sliceEndIndex = this.formTemplate.indexOf(`</${tag}>`, referIndex);
      if (sliceEndIndex > -1 && sliceEndIndex < endIndex) {
        const sliceStartIndex = this.formTemplate.lastIndexOf(`<${tag} `, sliceEndIndex);
        if (sliceStartIndex > -1 && sliceStartIndex > startIndex) {
          return this.formTemplate.substring(sliceStartIndex, sliceEndIndex + (`</${tag}>`).length);
        }
      }
      return '';
    },
    modifyFieldTemplateByPermission(replaceTemplateList, propertyName, fieldStr, permission, tag, relationDataName) {
      let startIndex = 0; let
        endIndex = Infinity;
      if (relationDataName) {
        const tableIndexConfig = this.getRelationDataStartAndEndIndex(relationDataName);
        startIndex = tableIndexConfig.tableStartIndex;
        endIndex = tableIndexConfig.tableEndIndex;
      }
      let itemStr = '';
      const replaceStr = `<span text=${fieldStr}></span>`;
      const fieldStrIndex = this.formTemplate.indexOf(fieldStr, startIndex);
      if (fieldStrIndex > -1 && fieldStrIndex < endIndex) {
        itemStr = this.sliceStrByTag(tag, fieldStrIndex, startIndex, endIndex);
        if (permission === 'hidden') {
          this.formTemplate = this.formTemplate.replace(itemStr, '');
          return startIndex;
        } else if (['readOnly', 'preview'].includes(permission)) {
          const newItemStr = itemStr.replace(fieldStr, `${fieldStr} preview `);
          this.formTemplate = this.formTemplate.replace(itemStr, newItemStr);
          itemStr = newItemStr;
        }
        replaceTemplateList.push({
          propertyName,
          origin: itemStr,
          replace: replaceStr,
        });
      }
      return startIndex;
    },
    getRelationDataStartAndEndIndex(relationDataName) {
      const tag = 'u-table-view';
      let tableStartIndex = -1;
      let tableEndIndex = -1;
      const reg = new RegExp(`dataSource(?:\\.sync)?="[^"]*processDetailFormData[^"]*\\.${relationDataName}"`, 'g');
      const match = this.formTemplate.match(reg);
      if (match && match.length) {
        const relationDataStr = match[0]; const
          relationDataStrIndex = this.formTemplate.indexOf(relationDataStr);
        tableEndIndex = this.formTemplate.indexOf(`</${tag}>`, relationDataStrIndex);
        if (tableEndIndex > -1) {
          tableStartIndex = this.formTemplate.lastIndexOf(`<${tag} `, tableEndIndex);
          // console.log('tableStr', this.formTemplate.slice(startIndex, endIndex + tag.length + 3));
        }
      }
      return { tableStartIndex, tableEndIndex };
    },
    dynamicRender(vmRoot, formTemplate) {
      const Local = Vue.extend({
        router: window?.VueRouterInstance,
        template: formTemplate,
        data() {
          return {
            ...vmRoot.$data,
          };
        },
        methods: Object.assign(
          {},
          ...Object.entries(vmRoot.$options.methods).map(([key, method]) => ({
            [key]: method.bind(vmRoot),
          })),
        ),
      });
      this.formVM = new Local();
      this.formVM.$refs = vmRoot.$refs;
      this.formVM._i18n = vmRoot._i18n;
      this.formVM.$mount();
      this.needReplaced = !this.formVM?.$el?.firstChild; // 判断当前模版是否渲染成功
    },
    renderForm({ fieldReplTemplates, vmRoot, isSubForm, formTemplate }) {
      for (let i = 0; i <= fieldReplTemplates.length; i++) {
        const { propertyName, origin, replace } = fieldReplTemplates[i] || {};
        // step1: 如果上一次渲染失败，更换为替换模版
        if (this.needReplaced && i > 0) {
          fieldReplTemplates[i - 1].isError = true;
        }
        // 避免有下拉框等会多次调用接口，再还原回去
        if (i > 0) {
          const { origin: lastOrigin, replace: lastReplace } = fieldReplTemplates[i - 1];
          formTemplate = formTemplate.replace(lastOrigin, lastReplace);
        }
        // step2: 如果子表单的首次渲染失败，则不在继续替换后续模版，直接取消掉该子表单的渲染
        if (isSubForm && this.needReplaced && i === 1) {
          for (let j = 1; j <= fieldReplTemplates.length; j++) {
            fieldReplTemplates[j].isError = true;
          }
          break;
        }
        // step3: 尝试用原始模板渲染
        if (propertyName) formTemplate = formTemplate.replace(replace, origin);
        // step4: 动态渲染
        if (propertyName || this.needReplaced || i === 0) this.dynamicRender(vmRoot, formTemplate);
      }
      this.needReplaced = false;
    },
    cutStrByTag(template, tag, filterReferStr) {
      const filterReferStrIndex = template.indexOf(filterReferStr);
      const endIndex = template.indexOf(`</${tag}>`, filterReferStrIndex);
      if (endIndex > -1) {
        const startIndex = template.lastIndexOf(`<${tag} `, endIndex);
        if (startIndex > -1) {
          const targetStr = template.substring(startIndex, endIndex + (`</${tag}>`).length);
          return template.replace(targetStr, '');
        }
      }
      return template;
    },
    previewSubFormTemplate(stencilStr) {
      stencilStr = this.cutStrByTag(stencilStr, 'u-button', ':subFormBtnType="`add`"');
      stencilStr = this.cutStrByTag(stencilStr, 'u-button', ':subFormBtnType="`export`"');
      stencilStr = this.cutStrByTag(stencilStr, 'u-table-view-column', ':subFormInitialColumn="`action`"');
      return stencilStr;
    },
    reDynamicRenderForm(vmRoot, templateData) {
      let formTemplateForRender = this.formTemplate;
      const replaceFormTemplateToReplacer = (fieldReplTemplates) => {
        for (let i = 0; i < fieldReplTemplates.length; i++) {
          const { origin, replace } = fieldReplTemplates[i];
          formTemplateForRender = formTemplateForRender.replace(origin, replace);
        }
      };
      replaceFormTemplateToReplacer(templateData.mainReplTemplates);
      templateData.subReplTemplates.forEach((fieldReplTemplates) => {
        replaceFormTemplateToReplacer(fieldReplTemplates);
      });
      // 动态渲染主表单
      this.renderForm({
        fieldReplTemplates: templateData.mainReplTemplates,
        vmRoot,
        isSubForm: false,
        formTemplate: formTemplateForRender,
      });
      // 动态渲染子表单
      templateData.subReplTemplates.forEach((fieldReplTemplates) => {
        this.renderForm({
          fieldReplTemplates,
          vmRoot,
          isSubForm: true,
          formTemplate: formTemplateForRender,
        });
      });

      // 替换掉有错误的选项
      const replaceFormTemplateOrigin = (fieldReplTemplates) => {
        for (let i = 0; i < fieldReplTemplates.length; i++) {
          const { origin, replace, isError } = fieldReplTemplates[i];
          if (isError) {
            this.formTemplate = this.formTemplate.replace(origin, replace);
          }
        }
      };
      replaceFormTemplateOrigin(templateData.mainReplTemplates);
      templateData.subReplTemplates.forEach((fieldReplTemplates) => {
        replaceFormTemplateOrigin(fieldReplTemplates);
      });
      this.dynamicRender(vmRoot, this.formTemplate);
    },
  },
  async mounted() {
    try {
      const { taskId } = this.$route.query;
      if (!taskId) return;
      // 获取表单定义
      const templateProcessDetailFrom = await this.$processV2.getProcessFormDefinition({
        body: { taskId },
      });

      this.formTemplate = eval(`\`${templateProcessDetailFrom?.data?.replace(/[`$]/g, (m) => `\\${m}`)}\``);

      // 获取表单数据
      let formData = await this.$processV2.getTaskInstanceForm({ body: { taskId } });
      formData = formData?.data;
      // 获取流程变量
      let processVars = await this.$processV2.getProcVariable({ body: { taskId } });
      processVars = processVars?.data;
      formData = { ...formData, ...processVars };
      // 获取字段权限
      // let fieldPermission = await this.$processV2.fieldPermissionDetail({ body: { taskId } }) // 旧接口
      const fieldPermission = await this.$processV2.getFieldPermissionDetail({ body: { taskId } });

      const itemTag = 'van-field';

      // 主表单的字段权限
      const mainPerms = fieldPermission?.data?.[0]?.subFieldPermissions || [];
      // 主表字段渲染错误时的替换模版
      const mainReplTemplates = [];
      mainPerms.forEach(({ propertyName, permission }) => {
        const fieldStrReg = new RegExp(`"[^"]*processDetailFormData[^"]*\\.data[^"]*\\.${propertyName}"`, 'g');
        const fieldStr = this.formTemplate.match(fieldStrReg)?.[0];
        if (!fieldStr) return;
        this.modifyFieldTemplateByPermission(mainReplTemplates, propertyName, fieldStr, permission, itemTag);
      });

      // n个子表单的字段权限 (n>=0)
      const subPerms = fieldPermission?.data?.slice(1) || [];
      // 子字段渲染错误时的替换模版
      const subReplTemplates = [];
      if (subPerms.length && false) {
        const fieldTag = 'u-table-view-column'; const
          stencilTag = 'u-grid-layout-column';
        // 遍历每个子表单
        subPerms.forEach((relationData) => {
          const { propertyName, subFieldPermissions, permission } = relationData;
          // step1: 判断是否存在当前子表单
          let { tableStartIndex, tableEndIndex } = this.getRelationDataStartAndEndIndex(propertyName);
          if (tableStartIndex === -1 || tableEndIndex === -1) return;
          let stencilStr = this.sliceStrByTag(stencilTag, tableStartIndex);
          // step2: 根据子表单整体权限，控制子表单的部分节点 或 整个子表单 的隐藏
          if (['readOnly', 'preview'].includes(permission)) {
            const newStencilStr = this.previewSubFormTemplate(stencilStr);
            this.formTemplate = this.formTemplate.replace(stencilStr, newStencilStr);
            stencilStr = newStencilStr;
          } else if (permission === 'hidden') {
            this.formTemplate = this.formTemplate.replace(stencilStr, '');
            return;
          }
          // step3: 初始化存放槽位
          const curReplTemplates = [];
          subReplTemplates.push(curReplTemplates);
          // step4: 遍历当前子表单的字段权限
          subFieldPermissions.forEach(({ propertyName: fieldName, permission: fieldPermission }, index) => {
            const fieldStr = `"current.item.${fieldName}"`;
            tableStartIndex = this.modifyFieldTemplateByPermission(curReplTemplates, fieldName, fieldStr, fieldPermission, fieldTag, propertyName);
            // step5: 当前子表单首次渲染时，会去除掉所有列，来检查当前子表单内是否有其他因素导致渲染失败
            if (index === subFieldPermissions.length - 1) {
              stencilStr = this.sliceStrByTag(stencilTag, tableStartIndex);
              const replaceStencilStr = `<span text="processDetailFormData.${propertyName}"></span>`;
              curReplTemplates.unshift({
                propertyName,
                origin: stencilStr,
                replace: replaceStencilStr,
              });
            }
          });
        });
      }

      if (formData) this.processDetailFormData = formData;
      // 使processDetailFormData内每一个key具备双向绑定能力
      Object.keys(this.processDetailFormData).forEach((key) => {
        this.$set(this.processDetailFormData, key, this.processDetailFormData[key]);
      });

      const container = document.getElementById('dynamicRenderContainer');
      if (!container) return;
      const vmRoot = this;

      // 先渲染，如果报错，再一个个item渲染，去除报错的item
      this.dynamicRender(vmRoot, this.formTemplate);

      if (this.needReplaced) {
        this.reDynamicRenderForm(vmRoot, {
          mainReplTemplates,
          subReplTemplates,
        });
      }
      const parentElement = container.parentNode;
      const regex = /ref-name="([^"]+)"/;
      const match = this.formTemplate.match(regex);
      parentElement.replaceChild(this.formVM?.$el, container);
      window.__processDetailFromMixinFormVm__ = this.formVM?.$refs[match[1]];
      const processVarsKeys = Object.keys(processVars);
      const data = {};
      for (const key in this.processDetailFormData) {
        if (!processVarsKeys.includes(key)) {
          data[key] = this.processDetailFormData[key];
        }
      }
      window.__processDetailFromMixinFormData__ = data;
    } catch (error) {
      console.warn('processDetailFromMixin warn', error);
    }
  },
};
export default {

  name: '/approveEntity2',
  mixins: [
    processDetailFromMixin,
    window.$mixins.dataSourceUtils(),
  ],
  data() {
    return {
      processInfo: window.$genInitFromSchema('{currNodeParticipants: nasl.collection.List<nasl.core.String>, currNodeTitles: nasl.collection.List<nasl.core.String>, procInstInitiator: nasl.core.String, procInstStartTime: nasl.core.DateTime, procInstStatus: nasl.core.String}', undefined),
      processButtonList: window.$genInitFromSchema('nasl.collection.List<extensions.lcap_process_framework.structures.TaskOperationPermission>', undefined),
      processButtonItem: window.$genInitFromSchema('extensions.lcap_process_framework.structures.TaskOperationPermission', undefined),
      processButtonApprovalPolicy: undefined,
      processButtonBody: window.$genInitFromSchema('{afterComplete: nasl.core.String, comment: nasl.core.String, nodeId: nasl.core.String, policyForAddSign: nasl.core.String, task: nasl.core.String, userForOperate: nasl.core.String}', undefined),
      delIndex: undefined,
      taskId: Object.prototype.hasOwnProperty.call(this.$route.query, 'taskId') && !['undefined', 'null'].includes(this.$route.query.taskId) ? window.$genInitFromSchema('nasl.core.String', this.$route.query.taskId) : undefined,
      list_view_1_state_page: undefined,
      list_view_1_state_size: undefined,
      pickerson_1_state_page: undefined,
      pickerson_1_state_size: undefined,
      pickerson_1_state_filterText: undefined,
      pickerson_2_state_page: undefined,
      pickerson_2_state_size: undefined,
      pickerson_2_state_filterText: undefined,
    };
  },
  meta: {
    title: '发起人审批页面',
    crumb: undefined,
    crumbI18n: undefined,
    first: undefined,
    auth: undefined,
  },
  methods: {
    async getProcInstInfo() {
      let processInfoData = window.$genInitFromSchema('extensions.lcap_process_framework.structures.ProcInstInfo', undefined);
      let processInfoCurrNodes = window.$genInitFromSchema('nasl.collection.List<extensions.lcap_process_framework.structures.CurrNode>', undefined);
      /* 流程信息数据 */
      /* 流程信息当前节点 */
      if (window.$utils.HasValue({ type: 'nasl.core.String', value: this.taskId })) {
        processInfoData = window.$genInitFromSchema('extensions.lcap_process_framework.structures.ProcInstInfo', await (window.LcapRequest({
          url: '/api/lcap_process_framework/getProcInstInfo',
          method: 'POST',
          extraConfig: {
            serviceType: 'micro',


          },
          headers: {
            'lcap-calllogic-uuid': '/m/approveEntity2/0',
          },
          data: {
            taskId: this.taskId,
          },
        })));
        if (window.$utils.HasValue({ type: 'extensions.lcap_process_framework.structures.ProcInstInfo', value: processInfoData })) {
          this.processInfo.procInstStartTime = (processInfoData || {}).procInstStartTime;
          this.processInfo.procInstStatus = (processInfoData || {}).procInstStatus;
          this.processInfo.procInstInitiator = await (async () => {
            const it = window.$utils.HasValue({ type: 'nasl.core.String', value: ((processInfoData || {}).procInstInitiator || {}).displayName });
            if (window.$global.isEqual(it, false)) {
              return ((processInfoData || {}).procInstInitiator || {}).userName;
            } else if (window.$global.isEqual(it, true)) {
              return ((processInfoData || {}).procInstInitiator || {}).displayName;
            } else { /* empty */ }
          })();
          if (window.$utils.HasValue({ type: 'nasl.collection.List<extensions.lcap_process_framework.structures.CurrNode>', value: (processInfoData || {}).procInstCurrNodes })) {
            this.processInfo.currNodeTitles = window.$genInitFromSchema('nasl.collection.List<nasl.core.String>', await window.$utils.ListTransformAsync((processInfoData || {}).procInstCurrNodes, (item) => ((item || {}).currNodeTitle)));
            processInfoCurrNodes = window.$genInitFromSchema('nasl.collection.List<extensions.lcap_process_framework.structures.CurrNode>', await window.$utils.ListFilterAsync((processInfoData || {}).procInstCurrNodes, (item) => (window.$utils.HasValue({ type: 'nasl.collection.List<extensions.lcap_process_framework.structures.ProcessUser>', value: (item || {}).currNodeParticipants }))));
            if (window.$utils.HasValue({ type: 'nasl.collection.List<extensions.lcap_process_framework.structures.CurrNode>', value: processInfoCurrNodes })) {
              this.processInfo.currNodeParticipants = window.$genInitFromSchema('nasl.collection.List<nasl.core.String>', window.$utils.ListDistinct(window.$genInitFromSchema('nasl.collection.List<nasl.core.String>', await window.$utils.ListTransformAsync(window.$genInitFromSchema('nasl.collection.List<extensions.lcap_process_framework.structures.ProcessUser>', window.$utils.ListFlatten(window.$genInitFromSchema('nasl.collection.List<nasl.collection.List<extensions.lcap_process_framework.structures.ProcessUser>>', await window.$utils.ListTransformAsync(processInfoCurrNodes, (item) => ((item || {}).currNodeParticipants))))), async (item) => (await (async () => {
                const it = window.$utils.HasValue({ type: 'nasl.core.String', value: (item || {}).displayName });
                if (window.$global.isEqual(it, false)) {
                  return (item || {}).userName;
                } else if (window.$global.isEqual(it, true)) {
                  return (item || {}).displayName;
                } else { /* empty */ }
              })())))));
            }
          }
        }
      }
    },

    async getProcInstRecords(page, size) {
      let result = window.$genInitFromSchema('{list: nasl.collection.List<extensions.lcap_process_framework.structures.ProcInstRecord>, total: nasl.core.Long}', undefined);
      if (window.$utils.HasValue({ type: 'nasl.core.String', value: this.taskId })) {
        result = window.$genInitFromSchema('{list: nasl.collection.List<extensions.lcap_process_framework.structures.ProcInstRecord>, total: nasl.core.Long}', await (window.LcapRequest({
          url: '/api/lcap_process_framework/getProcInstRecords',
          method: 'POST',
          extraConfig: {
            serviceType: 'micro',


          },
          headers: {
            'lcap-calllogic-uuid': '/m/approveEntity2/0',
          },
          data: {
            taskId: this.taskId,
            page,
            size,
          },
        })));
      }
      return result;
    },

    async getTaskOperationPermissions() {
      let permissionDetails = window.$genInitFromSchema('nasl.collection.List<extensions.lcap_process_framework.structures.TaskOperationPermission>', undefined);
      let data = window.$genInitFromSchema('nasl.collection.List<extensions.lcap_process_framework.structures.TaskOperationPermission>', undefined);
      data = window.$genInitFromSchema('nasl.collection.List<extensions.lcap_process_framework.structures.TaskOperationPermission>', await (window.LcapRequest({
        url: '/api/lcap_process_framework/getTaskOperationPermissions',
        method: 'POST',
        extraConfig: {
          serviceType: 'micro',


        },
        headers: {
          'lcap-calllogic-uuid': '/m/approveEntity2/0',
        },
        data: {
          taskId: this.taskId,
        },
      })));
      if (window.$utils.HasValue({ type: 'nasl.collection.List<extensions.lcap_process_framework.structures.TaskOperationPermission>', value: data })) {
        permissionDetails = window.$genInitFromSchema('nasl.collection.List<extensions.lcap_process_framework.structures.TaskOperationPermission>', await window.$utils.ListFilterAsync(data, (item) => ((item || {}).operationEnabled)));
        if (window.$utils.HasValue({ type: 'nasl.collection.List<extensions.lcap_process_framework.structures.TaskOperationPermission>', value: permissionDetails })) {
          this.processButtonList = permissionDetails;
          if (window.$utils.HasValue({ type: 'extensions.lcap_process_framework.structures.TaskOperationPermission', value: window.$genInitFromSchema('extensions.lcap_process_framework.structures.TaskOperationPermission', await window.$utils.ListFindAsync(this.processButtonList, (item) => (((item || {}).name) == ('addSign')))) })) {
            this.processButtonApprovalPolicy = await (this.getSignOptions());
          }
        }
      }
    },

    async getSignOptions() {
      let taskInst = window.$genInitFromSchema('extensions.lcap_process_framework.structures.TaskInst', undefined);
      let result;
      taskInst = window.$genInitFromSchema('extensions.lcap_process_framework.structures.TaskInst', await (window.LcapRequest({
        url: '/api/lcap_process_framework/getTaskInfo',
        method: 'POST',
        extraConfig: {
          serviceType: 'micro',


        },
        headers: {
          'lcap-calllogic-uuid': '/m/approveEntity2/0',
        },
        data: {
          taskId: this.taskId,
        },
      })));
      if (window.$utils.HasValue({ type: 'extensions.lcap_process_framework.structures.TaskInst', value: taskInst }, { type: 'nasl.core.String', value: (taskInst || {}).approvalPolicy })) {
        if (window.$utils.Contains(await (async () => {
          const arr = [
            'simple', 'parallel', 'sequence',
          ];
          return arr;
        })(), (taskInst || {}).approvalPolicy)) {
          result = (taskInst || {}).approvalPolicy;
        }
      }
      return result;
    },

    async openButtonModal(index) {
      let hasForm;
      let valid;
      /* 流程表单是否存在 */
      /* 表单校验是否通过 */
      window.$genInitFromSchema('{afterComplete: nasl.core.String, comment: nasl.core.String, nodeId: nasl.core.String, policyForAddSign: nasl.core.String, task: nasl.core.String, userForOperate: nasl.core.String}', window.$utils.Clear(this.processButtonBody, 'deep', '{afterComplete: nasl.core.String, comment: nasl.core.String, nodeId: nasl.core.String, policyForAddSign: nasl.core.String, task: nasl.core.String, userForOperate: nasl.core.String}'));
      this.processButtonItem = window.$genInitFromSchema('extensions.lcap_process_framework.structures.TaskOperationPermission', window.$utils.Get(this.processButtonList, index));
      {
        const it = (this.processButtonItem || {}).name;
        if (window.$global.isEqual(it, 'withdraw')) {
          await (this.$refs.button_backDialog_1?.openModal?.());
        } else {
          await (async () => {
            'use JSBlock';

            // 流程表单验证，通过脚本获取流程表单校验结果
            if (window.__processDetailFromMixinFormVm__ && window.__processDetailFromMixinFormVm__.validate) {
              hasForm = true;
              const validateResult = await window.__processDetailFromMixinFormVm__.validate();
              if (validateResult.valid) {
                valid = true;
              }
            } else {
              hasForm = false;
            }
          })();
          if (hasForm) {
            if (valid) {
              /*  如果为submit按钮，直接走提交事件  */
              if (((this.processButtonItem || {}).name) == ('submit')) {
                await (this.submitButton('submit'));
                return;
              }
            } else {
              return;
            }
          } else {
            /*  无流程表单直接弹窗！  */
          }

          if ((((this.processButtonItem || {}).name) == ('addSign')) || (((this.processButtonItem || {}).name) == ('revert'))) {
            if (((this.processButtonItem || {}).name) == ('addSign')) {
              this.processButtonBody.policyForAddSign = 'CurrentNode';
            }
            if ((((this.processButtonItem || {}).name) == ('revert')) && (((this.processButtonItem || {}).afterComplete) == ('runtimeSpecify'))) {
              this.processButtonBody.afterComplete = 'reExecute';
            }
            await (this.$refs.button_popup_1?.openModal?.());
            return;
          }
          await (this.$refs.button_dialog_1?.openModal?.());
        }
      }
    },

    async getUser(name, page, size, filterText) {
      let result = window.$genInitFromSchema('{list: nasl.collection.List<extensions.lcap_process_framework.structures.ProcessUser>, total: nasl.core.Long}', undefined);
      {
        const it = name;
        if (window.$global.isEqual(it, 'addSign')) {
          result = window.$genInitFromSchema('{list: nasl.collection.List<extensions.lcap_process_framework.structures.ProcessUser>, total: nasl.core.Long}', await (window.LcapRequest({
            url: '/api/lcap_process_framework/getUsersForAddSign',
            method: 'POST',
            extraConfig: {
              serviceType: 'micro',


            },
            headers: {
              'lcap-calllogic-uuid': '/m/approveEntity2/0',
            },
            data: {
              taskId: this.taskId,
              page,
              size,
              userName: filterText,
            },
          })));
        } else if (window.$global.isEqual(it, 'reassign')) {
          result = window.$genInitFromSchema('{list: nasl.collection.List<extensions.lcap_process_framework.structures.ProcessUser>, total: nasl.core.Long}', await (window.LcapRequest({
            url: '/api/lcap_process_framework/getUsersForReassign',
            method: 'POST',
            extraConfig: {
              serviceType: 'micro',


            },
            headers: {
              'lcap-calllogic-uuid': '/m/approveEntity2/0',
            },
            data: {
              taskId: this.taskId,
              page,
              size,
              userName: filterText,
            },
          })));
        } else { /* empty */ }
      }
      return result;
    },

    async submitButton(name) {
      {
        const it = name;
        if (window.$global.isEqual(it, 'reassign')) {
          await (window.LcapRequest({
            url: '/api/lcap_process_framework/reassignTask',
            method: 'POST',
            extraConfig: {
              serviceType: 'micro',


            },
            headers: {
              'lcap-calllogic-uuid': '/m/approveEntity2/0',
            },
            data: {
              taskId: this.taskId,
              userForReassign: (this.processButtonBody || {}).userForOperate,
            },
          }));
        } else if (window.$global.isEqual(it, 'addSign')) {
          await (window.LcapRequest({
            url: '/api/lcap_process_framework/addSignTask',
            method: 'POST',
            extraConfig: {
              serviceType: 'micro',


            },
            headers: {
              'lcap-calllogic-uuid': '/m/approveEntity2/0',
            },
            data: {
              taskId: this.taskId,
              userForAddSign: (this.processButtonBody || {}).userForOperate,
              policyForAddSign: (this.processButtonBody || {}).policyForAddSign,
            },
          }));
        } else if (window.$global.isEqual(it, 'withdraw')) {
          await (window.LcapRequest({
            url: '/api/lcap_process_framework/withdrawTask',
            method: 'POST',
            extraConfig: {
              serviceType: 'micro',


            },
            headers: {
              'lcap-calllogic-uuid': '/m/approveEntity2/0',
            },
            data: {
              taskId: this.taskId,
            },
          }));
        } else if (window.$global.isEqual(it, 'revert')) {
          await (window.LcapRequest({
            url: '/api/lcap_process_framework/revertTask',
            method: 'POST',
            extraConfig: {
              serviceType: 'micro',


            },
            headers: {
              'lcap-calllogic-uuid': '/m/approveEntity2/0',
            },
            data: {
              taskId: this.taskId,
              nodeId: (this.processButtonBody || {}).nodeId,
              afterComplete: (this.processButtonBody || {}).afterComplete,
              comment: (this.processButtonBody || {}).comment,
            },
          }));
        } else {
          await (async () => {
            'use JSBlock';

            const operate = `${name}Task`;
            const body = {
              taskId: this.taskId,
            };
            // 审批同意、提交表单等操作时获取流程表单数据，接口调用也可使用流程逻辑
            if (window.__processDetailFromMixinFormData__) {
              body.data = window.__processDetailFromMixinFormData__;
            }
            if (name !== 'submit') {
              body.comment = this.processButtonBody.comment;
            }
            const res = await this.$processV2.setTaskInstance({
              path: {
                operate,
              },
              body,
            });
          })();
        }
      }
      await (async () => {
        'use JSBlock';
        // 刷新页面
        window.location.reload();
      })();
    },

    async getBackNodes() {
      let result = window.$genInitFromSchema('nasl.collection.List<extensions.lcap_process_framework.structures.RevertFlowNode>', undefined);
      result = window.$genInitFromSchema('nasl.collection.List<extensions.lcap_process_framework.structures.RevertFlowNode>', await (window.LcapRequest({
        url: '/api/lcap_process_framework/getBackNodes',
        method: 'POST',
        extraConfig: {
          serviceType: 'micro',


        },
        headers: {
          'lcap-calllogic-uuid': '/m/approveEntity2/1',
        },
        data: {
          taskId: this.taskId,
        },
      })));
      if (window.$utils.HasValue({ type: 'nasl.collection.List<extensions.lcap_process_framework.structures.RevertFlowNode>', value: result })) {
        this.processButtonBody.nodeId = (window.$genInitFromSchema('extensions.lcap_process_framework.structures.RevertFlowNode', window.$utils.ListHead(result)) || {}).nodeId;
      }
      return result;
    },

    async approveEntity2_created(event) {
      await this.approveEntity2_created_created1(event);
      await this.approveEntity2_created_created(event);
    },

    async approveEntity2_created_created1() {
      await (async () => {
        'use JSBlock';
        const style = document.createElement('style');
        // 设置 CSS 块的内容
        style.innerHTML = '.__processV2_button_popup_radios{ width: 16px !important; height: 16px !important;}';
        // 将 style 标签插入到 head 元素中
        document.head.appendChild(style);
        this.$on('hook:beforeDestroy', () => {
          document.head.removeChild(style);
        });
      })();
      await (this.getTaskOperationPermissions());
    },

    async approveEntity2_created_created() {
      await (this.getProcInstInfo());
    },

    async button_popup_1_open(event) {
      await this.button_popup_1_open_open(event);
    },

    async button_popup_1_open_open() {
      await (async () => {
        'use JSBlock';

        // 延迟100ms加载
        setTimeout(() => {
          const addClassToElements = (ref) => {
            const element = this.$refs[ref]?.$el;
            if (element) {
              const elements = element.querySelectorAll('[class^="van-iconv"]');
              elements.forEach((el) => {
                el.classList.add('__processV2_button_popup_radios');
              });
            }
          };
          addClassToElements('radio_group_addSign_1');
          addClassToElements('radio_group_revert_flow_1');
          addClassToElements('radio_group_revert_resubmit_1');
        }, 100);
      })();
    },

    async button_3_click(event) {
      await this.button_3_click_click(event);
    },

    async button_3_click_click() {
      await (this.$refs.button_dialog_1?.closeModal?.());
    },

    async button_4_click(event) {
      await this.button_4_click_click(event);
    },

    async button_4_click_click() {
      if ((window.$genInitFromSchema('nasl.ui.ValidateResult', await (this.$refs.form_buttonDialog_1?.validate?.(undefined))) || {}).valid) {
        await (this.submitButton((this.processButtonItem || {}).name));
      }
    },

    async button_7_click(event) {
      await this.button_7_click_click(event);
    },

    async button_7_click_click() {
      await (this.$refs.button_backDialog_1?.closeModal?.());
    },

    async button_8_click(event) {
      await this.button_8_click_click(event);
    },

    async button_8_click_click() {
      await (this.submitButton((this.processButtonItem || {}).name));
    },

    async button_31_click(event) {
      await this.button_31_click_click(event);
    },

    async button_31_click_click() {
      window.$genInitFromSchema('app.dataSources.defaultDS.entities.Entity2', window.$utils.RemoveAt((this.processDetailFormData || {}).relationData, this.delIndex));
      await (this.$refs.dialog_1?.closeModal?.());
    },

    async button_1_click(event) {
      await this.button_1_click_click(event);
    },

    async button_1_click_click() {
      await (this.openButtonModal(1));
    },

    async button_2_click(event) {
      await this.button_2_click_click(event);
    },

    async button_2_click_click() {
      await (this.openButtonModal(0));
    },

    async iconv_2_click(event) {
      await this.iconv_2_click_click(event);
    },

    async iconv_2_click_click() {
      await (this.$refs.button_popup_1?.closeModal?.());
    },

    async button_11_click(event) {
      await this.button_11_click_click(event);
    },

    async button_11_click_click() {
      await (this.$refs.button_popup_1?.closeModal?.());
    },

    async button_12_click(event) {
      await this.button_12_click_click(event);
    },

    async button_12_click_click() {
      if ((window.$genInitFromSchema('nasl.ui.ValidateResult', await (this.$refs.form_buttonPopup_1?.validate?.(undefined))) || {}).valid) {
        await (this.submitButton((this.processButtonItem || {}).name));
      } else if (window.$utils.HasValue({ type: 'nasl.core.String', value: (this.processButtonBody || {}).nodeId })) { /* empty */ } else {
        await (this.$refs.button_toast_1?.open?.());
        await (async () => {
          'use JSBlock';

          // 提高弹出消息的显示层级
          const elements = document.querySelectorAll('.van-toast-group');
          elements.forEach((element) => {
            element.style.zIndex = '9999';
          });
        })();
      }
    },

    async button_13_click(event) {
      await this.button_13_click_click(event);
    },

    async button_13_click_click() {
      window.$utils.Add((this.processDetailFormData || {}).relationData, await (async () => {
        const obj = window.$genInitFromSchema('app.dataSources.defaultDS.entities.Entity2', window.$utils.New({ concept: 'TypeAnnotation', typeKind: 'reference', typeNamespace: 'app.dataSources.defaultDS.entities', typeName: 'Entity2' }));
        return obj;
      })());
    },

    async linear_layout_33_click(event, current) {
      await this.linear_layout_33_click_click(event, current);
    },

    async linear_layout_33_click_click(event, current) {
      await (this.openButtonModal((current || {}).index));
    },

    async link_3_click(event, current) {
      await this.link_3_click_click(event, current);
    },

    async link_3_click_click(event, current) {
      this.delIndex = (current || {}).index;
      await (this.$refs.dialog_1?.openModal?.());
    },

    genviewMatchExpression_1jnb9uh1() {
      return (() => {
        const it = window.$utils.HasValue({ type: '{currNodeParticipants: nasl.collection.List<nasl.core.String>, currNodeTitles: nasl.collection.List<nasl.core.String>, procInstInitiator: nasl.core.String, procInstStartTime: nasl.core.DateTime, procInstStatus: nasl.core.String}', value: this.processInfo }, { type: 'nasl.core.String', value: (this.processInfo || {}).procInstInitiator });
        if (window.$global.isEqual(it, false)) {
          return '-';
        } else if (window.$global.isEqual(it, true)) {
          return (this.processInfo || {}).procInstInitiator;
        } else { /* empty */ }
      })();
    },

    genviewMatchExpression_0ot5tjv1() {
      return (() => {
        const it = window.$utils.HasValue({ type: '{currNodeParticipants: nasl.collection.List<nasl.core.String>, currNodeTitles: nasl.collection.List<nasl.core.String>, procInstInitiator: nasl.core.String, procInstStartTime: nasl.core.DateTime, procInstStatus: nasl.core.String}', value: this.processInfo }, { type: 'nasl.core.DateTime', value: (this.processInfo || {}).procInstStartTime });
        if (window.$global.isEqual(it, false)) {
          return '-';
        } else if (window.$global.isEqual(it, true)) {
          return window.$utils.FormatDateTime((this.processInfo || {}).procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global');
        } else { /* empty */ }
      })();
    },

    genviewMatchExpression_1n2m88k0() {
      return (() => {
        const it = window.$utils.HasValue({ type: '{currNodeParticipants: nasl.collection.List<nasl.core.String>, currNodeTitles: nasl.collection.List<nasl.core.String>, procInstInitiator: nasl.core.String, procInstStartTime: nasl.core.DateTime, procInstStatus: nasl.core.String}', value: this.processInfo }, { type: 'nasl.core.String', value: (this.processInfo || {}).procInstStatus });
        if (window.$global.isEqual(it, false)) {
          return '-';
        } else if (window.$global.isEqual(it, true)) {
          return window.$utils.EnumItemToText('nasl.processV2.enums.ProcInstStatusEnum', window.$genInitFromSchema('nasl.processV2.enums.ProcInstStatusEnum', window.$utils.ToEnumItem((this.processInfo || {}).procInstStatus, { concept: 'TypeAnnotation', typeKind: 'reference', typeNamespace: 'nasl.processV2.enums', typeName: 'ProcInstStatusEnum' })));
        } else { /* empty */ }
      })();
    },

    genviewMatchExpression_10ghqfr0() {
      return (() => {
        const it = (this.processInfo || {}).procInstStatus;
        if (window.$global.isEqual(it, 'Approved')) {
          return '#666666';
        } else if (window.$global.isEqual(it, 'Approving')) {
          return '#337EFF';
        } else {
          return '';
        }
      })();
    },

    genviewMatchExpression_1fiwit20() {
      return (() => {
        const it = (this.processInfo || {}).procInstStatus;
        if (window.$global.isEqual(it, 'Approved')) {
          return '#F5F5F5';
        } else if (window.$global.isEqual(it, 'Approving')) {
          return '#EAF2FF';
        } else {
          return '';
        }
      })();
    },

    genviewMatchExpression_1s10vyl1() {
      return (() => {
        const it = window.$utils.HasValue({ type: '{currNodeParticipants: nasl.collection.List<nasl.core.String>, currNodeTitles: nasl.collection.List<nasl.core.String>, procInstInitiator: nasl.core.String, procInstStartTime: nasl.core.DateTime, procInstStatus: nasl.core.String}', value: this.processInfo }, { type: 'nasl.collection.List<nasl.core.String>', value: (this.processInfo || {}).currNodeTitles });
        if (window.$global.isEqual(it, false)) {
          return '-';
        } else if (window.$global.isEqual(it, true)) {
          return window.$utils.Join((this.processInfo || {}).currNodeTitles, '，');
        } else { /* empty */ }
      })();
    },

    genviewMatchExpression_14lzsjm0() {
      return (() => {
        const it = window.$utils.HasValue({ type: '{currNodeParticipants: nasl.collection.List<nasl.core.String>, currNodeTitles: nasl.collection.List<nasl.core.String>, procInstInitiator: nasl.core.String, procInstStartTime: nasl.core.DateTime, procInstStatus: nasl.core.String}', value: this.processInfo }, { type: 'nasl.collection.List<nasl.core.String>', value: (this.processInfo || {}).currNodeParticipants });
        if (window.$global.isEqual(it, false)) {
          return '-';
        } else if (window.$global.isEqual(it, true)) {
          return window.$utils.Join((this.processInfo || {}).currNodeParticipants, '，');
        } else { /* empty */ }
      })();
    },

    genviewMatchExpression_1xwgono0(current) {
      return (() => {
        const it = window.$utils.HasValue({ type: 'nasl.core.String', value: ((current || {}).item || {}).nodeTitle });
        if (window.$global.isEqual(it, false)) {
          return '-';
        } else if (window.$global.isEqual(it, true)) {
          return ((current || {}).item || {}).nodeTitle;
        } else { /* empty */ }
      })();
    },

    genviewMatchExpression_1eyebos0(current) {
      return (() => {
        const it = window.$utils.HasValue({ type: 'nasl.core.String', value: (((current || {}).item || {}).recordUser || {}).displayName });
        if (window.$global.isEqual(it, false)) {
          return (() => {
            const it = window.$utils.HasValue({ type: 'nasl.core.String', value: (((current || {}).item || {}).recordUser || {}).userName });
            if (window.$global.isEqual(it, false)) {
              return '-';
            } else if (window.$global.isEqual(it, true)) {
              return (((current || {}).item || {}).recordUser || {}).userName;
            } else { /* empty */ }
          })();
        } else if (window.$global.isEqual(it, true)) {
          return (((current || {}).item || {}).recordUser || {}).displayName;
        } else { /* empty */ }
      })();
    },

    genviewMatchExpression_19uszp61(current) {
      return (() => {
        const it = window.$utils.HasValue({ type: 'nasl.core.String', value: (((current || {}).item || {}).recordUser || {}).userName });
        if (window.$global.isEqual(it, false)) {
          return '-';
        } else if (window.$global.isEqual(it, true)) {
          return (((current || {}).item || {}).recordUser || {}).userName;
        } else { /* empty */ }
      })();
    },

    genviewMatchExpression_1f7qyv91(current) {
      return (() => {
        const it = window.$utils.HasValue({ type: 'nasl.core.DateTime', value: ((current || {}).item || {}).recordCreatedTime });
        if (window.$global.isEqual(it, false)) {
          return '-';
        } else if (window.$global.isEqual(it, true)) {
          return window.$utils.FormatDateTime(((current || {}).item || {}).recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global');
        } else { /* empty */ }
      })();
    },

    genviewMatchExpression_04jy7yt1(current) {
      return (() => {
        const it = ((current || {}).item || {}).nodeOperation;
        if (window.$global.isEqual(it, 'end') || window.$global.isEqual(it, 'terminate')) {
          return '#666666';
        } else if (window.$global.isEqual(it, 'revert') || window.$global.isEqual(it, 'withdraw')) {
          return '#FF8024';
        } else if (window.$global.isEqual(it, 'reject')) {
          return '#F24957';
        } else if (window.$global.isEqual(it, 'approve')) {
          return '#26BD71';
        } else if (window.$global.isEqual(it, 'launch') || window.$global.isEqual(it, 'submit') || window.$global.isEqual(it, 'reassign') || window.$global.isEqual(it, 'addSign') || window.$global.isEqual(it, 'cc')) {
          return '#337EFF';
        } else {
          return '#666666';
        }
      })();
    },

    genviewMatchExpression_1d3zx320(current) {
      return (() => {
        const it = ((current || {}).item || {}).nodeOperation;
        if (window.$global.isEqual(it, 'end') || window.$global.isEqual(it, 'terminate')) {
          return '#F5F5F5';
        } else if (window.$global.isEqual(it, 'revert') || window.$global.isEqual(it, 'withdraw')) {
          return '#FFF2E9';
        } else if (window.$global.isEqual(it, 'reject')) {
          return '#FEEDEF';
        } else if (window.$global.isEqual(it, 'approve')) {
          return '#E9F8F0';
        } else if (window.$global.isEqual(it, 'launch') || window.$global.isEqual(it, 'submit') || window.$global.isEqual(it, 'reassign') || window.$global.isEqual(it, 'addSign') || window.$global.isEqual(it, 'cc')) {
          return '#EAF2FF';
        } else {
          return '#F5F5F5';
        }
      })();
    },

    genviewMatchExpression_1v26hzl0(current) {
      return (() => {
        const it = window.$utils.HasValue({ type: 'nasl.core.String', value: ((current || {}).item || {}).nodeOperationComment });
        if (window.$global.isEqual(it, false)) {
          return '-';
        } else if (window.$global.isEqual(it, true)) {
          return ((current || {}).item || {}).nodeOperationComment;
        } else { /* empty */ }
      })();
    },

    genviewMatchExpression_00bkeat0(current) {
      return (() => {
        const it = window.$utils.HasValue({ type: 'nasl.core.String', value: ((current || {}).item || {}).displayName });
        if (window.$global.isEqual(it, false)) {
          return ((current || {}).item || {}).userName;
        } else if (window.$global.isEqual(it, true)) {
          return window.$global.add(window.$global.add(window.$global.add(((current || {}).item || {}).displayName, '（'), ((current || {}).item || {}).userName), '）');
        } else { /* empty */ }
      })();
    },

    genviewMatchExpression_13dicob0(current) {
      return (() => {
        const it = window.$utils.HasValue({ type: 'nasl.core.String', value: ((current || {}).item || {}).displayName });
        if (window.$global.isEqual(it, false)) {
          return ((current || {}).item || {}).userName;
        } else if (window.$global.isEqual(it, true)) {
          return window.$global.add(window.$global.add(window.$global.add(((current || {}).item || {}).displayName, '（'), ((current || {}).item || {}).userName), '）');
        } else { /* empty */ }
      })();
    },

    __list_view_1_handleDataSourceLoad() {
      return this.__getOrCreateDataSource('__list_view_1_handleDataSourceLoad', [], async () => {
        return window.$genInitFromSchema('{list: nasl.collection.List<extensions.lcap_process_framework.structures.ProcInstRecord>, total: nasl.core.Long}', await (this.getProcInstRecords(this.list_view_1_state_page, this.list_view_1_state_size)));
      });
    },

    __pickerson_1_handleDataSourceLoad() {
      return this.__getOrCreateDataSource('__pickerson_1_handleDataSourceLoad', [], async () => {
        return window.$genInitFromSchema('{list: nasl.collection.List<extensions.lcap_process_framework.structures.ProcessUser>, total: nasl.core.Long}', await (this.getUser((this.processButtonItem || {}).name, this.pickerson_1_state_page, this.pickerson_1_state_size, this.pickerson_1_state_filterText)));
      });
    },

    __pickerson_2_handleDataSourceLoad() {
      return this.__getOrCreateDataSource('__pickerson_2_handleDataSourceLoad', [], async () => {
        return window.$genInitFromSchema('{list: nasl.collection.List<extensions.lcap_process_framework.structures.ProcessUser>, total: nasl.core.Long}', await (this.getUser((this.processButtonItem || {}).name, this.pickerson_2_state_page, this.pickerson_2_state_size, this.pickerson_2_state_filterText)));
      });
    },

    __radio_group_revert_flow_1_handleDataSourceLoad() {
      return this.__getOrCreateDataSource('__radio_group_revert_flow_1_handleDataSourceLoad', [], async () => {
        return window.$genInitFromSchema('nasl.collection.List<extensions.lcap_process_framework.structures.RevertFlowNode>', await (window.LcapRequest({
          url: '/api/lcap_process_framework/getBackNodes',
          method: 'POST',
          extraConfig: {
            serviceType: 'micro',


          },
          headers: {
            'lcap-calllogic-uuid': '/m/approveEntity2/0',
          },
          data: {
            taskId: this.taskId,
          },
        })));
      });
    },

    onSyncState(elem, key, val) { this[`${elem}_state_${key}`] = val; },
  },
  async created() {
    await this.approveEntity2_created();
  },
};
</script>
