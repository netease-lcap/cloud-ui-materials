/// <reference types="@nasl/types" />
namespace extensions.extend_download.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'container',
    }
  })

  @Component({
    title: '下载组件',
    description: '下载组件',
  })
  export class VanDownload<T> extends ViewComponent {
    constructor(options?: Partial<VanDownloadOptions<T>>) {
      super();
    }
  }

  export class VanDownloadOptions<T> extends ViewComponentOptions {

    @Slot({
      title: '默认',
      description: '默认内容',
    })
    slotDefault: () => any;

    @Prop({
      title: '文件类型',
      description: '文件类型',
      setter: {
        concept: 'EnumSelectSetter',
        multiple: false,
        options: [
          {title: 'Excel'},
          {title: 'CSV'},
          // { label: '文件', value: 'file' },
        ]
      }
    })
    fileType: 'excel' | 'csv' = 'excel';

    @Prop({
      title: '数据源',
      group: '数据属性',
    })
    dataSource: nasl.collection.List<T>;

    @Prop({
      title: '字段设置',
      group: '主要属性',
      bindHide: true,
    })
    fieldSettings: nasl.collection.List<{
      title: nasl.core.String;
      format: (item: any) => nasl.core.String;
    }>

    @Event({
      title: '进行时',
      description: '进行时',
    })
    onDoing: (id: string) => void;

    @Event({
      title: '生成成功',
      description: '生成成功',
    })
    onFinished: (event: {
      fileName: nasl.core.String,
      url: nasl.core.String
    }) => void;

    @Event({
      title: '生成失败',
      description: '生成失败',
    })
    onFailed: (id: string) => void;
  }
}
