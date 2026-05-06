<template>
  <van-linear-layout
    ref="vanLinearLayout1"
    class="l-root-h5"
    type="root"
    gap="none"
  >
    <van-cardu ref="cardu_1">
      <template
        #head

      >
        <van-text
          ref="text_52"
          class="cw-style-font-size cw-style-font-weight"
          text="发起流程"
          style="--cw-style-font-size:18px;--cw-style-font-weight:bold;font-size:18px;font-weight:bold;"
        ></van-text>
      </template>
      <van-form ref="form_1">
        <van-field
          ref="field_1"
          drole="other"
        >
          <template
            #title

          >
            <van-text
              ref="text_53"
              text="name"
            ></van-text>
          </template>
          <template
            #input

          >
            <van-linear-layout
              ref="linear_layout_23"
              class="cw-style-width"
              direction="horizontal"
              style="--cw-style-width:100%;width:100%;"
            >
              <van-fieldinput
                ref="fieldinput_1"
                :value.sync="entity1.name"
                placeholder="请输入name"
              ></van-fieldinput>
            </van-linear-layout>
          </template>
        </van-field>
        <van-field
          ref="field_2"
          drole="other"
        >
          <template
            #title

          >
            <van-text
              ref="text_54"
              text="detail"
            ></van-text>
          </template>
          <template
            #input

          >
            <van-linear-layout
              ref="linear_layout_24"
              class="cw-style-width"
              direction="horizontal"
              style="--cw-style-width:100%;width:100%;"
            >
              <van-fieldinput
                ref="fieldinput_2"
                :value.sync="entity1.detail"
                placeholder="请输入detail"
              ></van-fieldinput>
            </van-linear-layout>
          </template>
        </van-field>
        <van-field
          ref="field_4"
          drole="other"
          labelLayout="block"
        >
          <template
            #title

          >
            <van-text
              ref="text_55"
              text="子表单"
            ></van-text>
          </template>
          <template
            #input

          >
            <van-linear-layout
              ref="linear_layout_25"
              class="cw-style-width"
              direction="horizontal"
              style="--cw-style-width:100%;width:100%;"
            >
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
                              <van-linear-layout
                                :ref="`linear_layout_30_${(current || {}).__nodeKey || (current || {}).index}`"
                                :wrap="true"
                              >
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
                    <template
                      #default="current"

                    >
                      <van-row
                        :ref="`row_2_${(current || {}).__nodeKey || (current || {}).index}`"
                        gutter="0"
                        :vusion-disabled-copy="current"
                        :vusion-disabled-addslot="current"
                        :vusion-disabled-cut="current"
                      >
                        <van-col
                          :ref="`col_2_${(current || {}).__nodeKey || (current || {}).index}`"
                          :span="24"
                          :vusion-disabled-copy="current"
                          :vusion-disabled-cut="current"
                        ></van-col>
                      </van-row>
                    </template>
                  </van-for-components>
                </van-validator>
              </van-linear-layout>
            </van-linear-layout>
          </template>
        </van-field>
        <van-button
          ref="button_18"
          :round="true"
          block="blockb"
          type="info"
          text="提交流程"
          @click="button_18_click($event)"
        ></van-button>
      </van-form>
    </van-cardu>
    <van-dialog
      ref="dialog_1"
      :safeAreaInsetBottom="true"
    >
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
</template>
<script>
export default {

  name: '/createEntity1',
  mixins: [
    window.$mixins.dataSourceUtils(),
  ],
  data() {
    return {
      entity1: window.$genInitFromSchema('app.dataSources.defaultDS.entities.Entity1', undefined),
      entity2List: window.$genInitFromSchema('nasl.collection.List<app.dataSources.defaultDS.entities.Entity2>', undefined),
      delIndex: undefined,
    };
  },
  meta: {
    title: '发起流程',
    crumb: undefined,
    crumbI18n: undefined,
    first: undefined,
    auth: undefined,
  },
  methods: {
    async button_18_click(event) {
      await this.button_18_click_submit(event);
    },

    async button_18_click_submit() {
      console.info(window.$utils.ToString('nasl.core.String', window.$utils.ToString('nasl.ui.ValidateResult', window.$genInitFromSchema('nasl.ui.ValidateResult', await (this.$refs.validator_1?.validate?.())))));
      if ((window.$genInitFromSchema('nasl.ui.ValidateResult', await (this.$refs.form_1?.validate?.())) || {}).valid) {
        await (window.LcapRequest({
          url: '/api/lcplogics/Process1Launch',
          method: 'POST',
          extraConfig: {
            serviceType: 'micro',


          },
          headers: {
            'lcap-calllogic-uuid': '/m/createEntity1/0',
          },
          data: {
            param1: this.entity1,
            param2: this.entity2List,
          },
        }));
        await (window.$global.showMessage(window.$utils.ToString('nasl.core.String', '创建成功！')));
      }
    },

    async button_19_click(event) {
      await this.button_19_click_click(event);
    },

    async button_19_click_click() {
      await (this.$refs.dialog_1?.closeModal?.());
    },

    async button_20_click(event) {
      await this.button_20_click_click(event);
    },

    async button_20_click_click() {
      window.$genInitFromSchema('app.dataSources.defaultDS.entities.Entity2', window.$utils.RemoveAt(this.entity2List, this.delIndex));
      await (this.$refs.dialog_1?.closeModal?.());
    },

    async button_1_click(event) {
      await this.button_1_click_click(event);
    },

    async button_1_click_click() {
      window.$utils.Add(this.entity2List, await (async () => {
        const obj = window.$genInitFromSchema('app.dataSources.defaultDS.entities.Entity2', window.$utils.New({ concept: 'TypeAnnotation', typeKind: 'reference', typeNamespace: 'app.dataSources.defaultDS.entities', typeName: 'Entity2', inferred: null, ruleMap: null, sync: null, _aiUID: '17fd007c-a422-400a-9d0c-059b2d58f227_3665_1', changedTime: null, _changedTime: null, name: null, composedBy: null, typeAnnotation: null, typeParams: null, typeArguments: null, returnType: null, properties: null }));
        return obj;
      })());
    },

    async link_3_click(event, current) {
      await this.link_3_click_click(event, current);
    },

    async link_3_click_click(event, current) {
      this.delIndex = (current || {}).index;
      await (this.$refs.dialog_1?.openModal?.());
    },

    onSyncState(elem, key, val) { this[`${elem}_state_${key}`] = val; },
  },

};
</script>
