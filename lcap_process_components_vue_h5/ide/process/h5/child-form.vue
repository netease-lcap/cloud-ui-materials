<van-linear-layout ref="vanLinearLayout1" class="l-root-h5" type="root" gap="none">
<van-linear-layout
  ref="linear_layout_1"
  direction="horizontal"
  :wrap="true"
  gap="normal"
  style="--van-space-base:0px;"
>
  <van-button
    ref="button_1"
    type="info"
    size="small"
    text="添加"
    squareroud="square"
    @click="button_1_click($event)"
  ></van-button>
  <van-validator
    ref="validator_1"
    class="cw-style-width"
    :rules="[]"
    style="--cw-style-width:100%;width:100%;"
  >
    <van-for-components
      ref="for_components_1"
      class="cw-style-width"
      :colnum="1"
      :dataSource="entity2List"
      v-dependencies.reload="[]"
      :equalWidth="true"
      style="--cw-style-width:100%;width:100%;"
    >
      <template
        #item="current"

      >
        <van-collapse :ref="`collapse_3_${(current || {}).__nodeKey || (current || {}).index}`">
          <van-collapse-item
            :ref="`collapse_item_7_${(current || {}).__nodeKey || (current || {}).index}`"
            :isLink="true"
          >
            <template
              #title

            >
              <van-linear-layout
                :ref="`linear_layout_28_${(current || {}).__nodeKey || (current || {}).index}`"
                justify="space-between"
                :wrap="true"
              >
                <van-linear-layout
                  :ref="`linear_layout_29_${(current || {}).__nodeKey || (current || {}).index}`"
                  :wrap="true"
                >
                  <van-text
                    :ref="`text_80_${(current || {}).__nodeKey || (current || {}).index}`"
                    :text="$utils['ToString']('nasl.core.String', $utils['ToString']('nasl.core.String', `数据`) + $utils['ToString']('nasl.core.Long', $global.add((current || {}).index,1)))"
                  ></van-text>
                </van-linear-layout>
<van-linear-layout :ref="`linear_layout_30_${(current || {}).__nodeKey || (current || {}).index}`" :wrap="true">
                  <van-link
                    :ref="`link_3_${(current || {}).__nodeKey || (current || {}).index}`"
                    text="删除"
                    @click="link_3_click($event, current)"
                  ></van-link>
                </van-linear-layout>
</van-linear-layout>
</template>
<van-form :ref="`form_3_${(current || {}).__nodeKey || (current || {}).index}`">
              <van-field
                :ref="`field_6_${(current || {}).__nodeKey || (current || {}).index}`"
                :required="true"
                drole="other"
              >
                <template
                  #input

                >
                  <van-fieldinput
                    :ref="`fieldinput_7_${(current || {}).__nodeKey || (current || {}).index}`"
                    placeholder="请输入"
                    :clearable="true"
                    :value.sync="current.item.name"
                  ></van-fieldinput>
                </template>
                <template
                  #title

                >
                  <van-text
                    :ref="`text_81_${(current || {}).__nodeKey || (current || {}).index}`"
                    text="名称"
                  ></van-text>
                </template>
              </van-field>
              <van-field
                :ref="`field_7_${(current || {}).__nodeKey || (current || {}).index}`"
                name="radio"
                drole="other"
              >
                <template
                  #input

                >
                  <van-fieldinput
                    :ref="`fieldinput_8_${(current || {}).__nodeKey || (current || {}).index}`"
                    placeholder="请输入"
                    :value.sync="current.item.description"
                  ></van-fieldinput>
                </template>
                <template
                  #title

                >
                  <van-text
                    :ref="`text_84_${(current || {}).__nodeKey || (current || {}).index}`"
                    text="描述"
                  ></van-text>
                </template>
              </van-field>
            </van-form>
</van-collapse-item>
</van-collapse>
</template>
<template #default="current">
  <van-row :ref="`row_2_${(current || {}).__nodeKey || (current || {}).index}`" gutter="0"
    :vusion-disabled-copy="current" :vusion-disabled-addslot="current" :vusion-disabled-cut="current">
    <van-col :ref="`col_2_${(current || {}).__nodeKey || (current || {}).index}`" :span="24"
      :vusion-disabled-copy="current" :vusion-disabled-cut="current"></van-col>
  </van-row>
</template>
</van-for-components>
</van-validator>
</van-linear-layout>
<van-dialog ref="dialog_1" :safeAreaInsetBottom="true">
  <template
    #footer

  >
    <van-linear-layout
      ref="linear_layout_26"
      class="cw-style-width"
      type="flex"
      :vusion-disabled-cut="true"
      style="--cw-style-width:100%;width:100%;"
    >
      <van-button
        ref="button_19"
        class="van-button van-button--default van-dialog__cancel"
        text="取消"
        @click="button_19_click($event)"
      ></van-button>
      <van-button
        ref="button_20"
        class="van-button van-button--default van-dialog__confirm van-hairline--left"
        text="确认"
        @click="button_20_click($event)"
      ></van-button>
    </van-linear-layout>
  </template>
  <div
    ref="div_1"
    class="dialogchild"
    vusion-slot-name="default"
    :vusion-disabled-copy="true"
    :vusion-disabled-cut="true"
    env="alone"
    style="min-height:100px;"
  >
    <van-row
      ref="row_6"
      gutter="0"
    >
      <van-col
        ref="col_12"
        :span="8"
        mode="flex"
        justify="center"
        alignment="center"
      >
        <van-iconv
          ref="iconv_2"
          class="cw-style-background-color cw-style-font-size cw-style-color cw-style-border-top-left-radius cw-style-border-radius cw-style-border-top-right-radius cw-style-border-bottom-left-radius cw-style-border-bottom-right-radius"
          name="info"
          icotype="only"
          :style="{'color': `#fff`, '--cw-style-color': `#fff`, 'background-color': `#ffaf0f`}"
          style="--cw-style-font-size:48px;--cw-style-border-top-left-radius:24px;--cw-style-border-top-right-radius:24px;--cw-style-border-bottom-left-radius:24px;--cw-style-border-bottom-right-radius:24px;font-size:48px;border-top-left-radius:24px;border-bottom-left-radius:24px;border-top-right-radius:24px;border-bottom-right-radius:24px;"
        >
          <van-text
            ref="text_59"
            text="图标"
          ></van-text>
        </van-iconv>
      </van-col>
      <van-col
        ref="col_13"
        class="cw-style-text-align"
        :span="16"
        style="--cw-style-text-align:left;text-align:left;"
      >
        <van-text
          ref="text_60"
          class="cw-style-text-align cw-style-font-size cw-style-font-weight"
          text="请确认是否删除？"
          display="block"
          style="--cw-style-text-align:left;--cw-style-font-size:18px;--cw-style-font-weight:bold;text-align:left;font-size:18px;font-weight:bold;"
        ></van-text>
        <van-text
          ref="text_61"
          class="cw-style-text-align cw-style-font-size"
          text="删除后将无法恢复，请谨慎操作"
          style="--cw-style-text-align:left;--cw-style-font-size:14px;text-align:left;font-size:14px;"
        ></van-text>
      </van-col>
    </van-row>
  </div>
</van-dialog>
</van-linear-layout>