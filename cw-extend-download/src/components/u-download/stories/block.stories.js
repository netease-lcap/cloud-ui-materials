import Component from '../index';

export default {
  id: 'u-download-blocks',
  title: '组件列表/UDownload/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<u-download> <template #default><u-button color="primary" text="文件下载"></u-button></template></u-download>',
  }),
};
