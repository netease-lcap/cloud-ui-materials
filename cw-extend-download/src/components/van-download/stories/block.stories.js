import Component from '../index';

export default {
  id: 'van-download-blocks',
  title: '组件列表/VanDownload/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<van-download> <template #default><van-button color="primary" text="文件下载"></van-button></template></van-download>',
  }),
};
