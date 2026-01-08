<template>
  <div class="u-download-box" v-loading="isLoading" vusion-slot-name="default" style="display: inline-block;"
    @click="startTask">
    <slot name="default"></slot>
    <s-empty v-if="!$slots.default" style="color:#ccccccd0; padding: 3px;">
      请将打印的内容拖入这块区域
    </s-empty>

  </div>
</template>

<script>
import supportDatasource from "@/mixins/support.datasource";

// import {SEmpty} from 'cloud-ui.vusion/src/components/s-empty.vue';
export default {
  name: "u-download",
  mixins: [supportDatasource],
  props: {
    fileType: {
      type: String,
      default: ""
    },
    fieldSettings: {
      type: Array,
      default: () => []
    },
    logicParmas: {
      type: Object,
      default: () => { }
    },
    naslid: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      isLoading: false,
      isSuccess: false,
      isError: false,
      prefixPath: window.appInfo?.sysPrefixPath || '',
    };
  },
  mounted() {
    // console.log(this.$attrs.naslId, this, 'thismounted')
  },
  updated() {
    // console.log(this, this.value, 'thisupdated')
  },
  methods: {
    async startTask() {
      try {
        this.isLoading = true;
        const { Data } = await this.startFetch()
        // 开始任务轮询
        // await this.pollingFetch();

        // 最后任务完成后的回调
        const data = await this.pollingFetch(Data);
        this.taskCompleted(data)
      } catch (error) {
        this.$emit('failed', '生成失败')

        this.isError = true;
      } finally {

        this.isLoading = false;
      }
    },
    async startFetch() {
      const _self = this;
      // 模拟任务开始的异步操作
      return await new Promise((resolve) => {

        const data = {
          taskName: this.$attrs.naslId,
          fileType: this.fileType || 'excel',
          exportRange: 'all',
          param: this.$attrs.logicParams,
          fileClientCode: "default-excel-client-code"
        }
        fetch(`${_self.prefixPath}/api/logics/downloadFile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            if (data.Code === 200) {
              resolve(data);
            }

          })
        // setTimeout(() => {
        //   resolve();
        // }, 1000);
      });

    },
    async pollingFetch(id) {
      // 模拟任务轮询的异步操作
      const _self = this
      return await new Promise((resolve) => {
        function polling() {
          _self.$emit('doing', id)
          fetch(`${_self.prefixPath}/api/logics/downloadFile?taskId=${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then(response => response.json())
            .then(data => {
              if (data.Data.taskStatus === 'PROCESSING') {
                setTimeout(polling, 1000);
              } else {
                resolve(data);
              }
            })
        }
        polling()
        // fetch('https://www.easy-mock.com/mock/5f507e38a758c95f67d6eb42/fetch/postmsg',{
        //     method:'POST',
        //     body:data
        // })	
      });
      console.log('任务进行中...');
    },
    taskCompleted(data) {
      if (data.Code === 200 && data.Data.result) {
        this.downloadFile(data.Data.result);
      } else {
        this.$emit('failed', '生成失败')
      }


    },
    downloadFile(fileInfo) {
      const link = document.createElement('a');
      link.href = fileInfo.url;
      link.download = fileInfo.fileName;
      link.target = '_blank';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.$emit('finished', fileInfo);
    }


  },

}
</script>

<style></style>