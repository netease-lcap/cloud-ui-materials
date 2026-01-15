import Component from '../index';

export default {
  id: 'ow-process-form-blocks',
  title: '组件列表/OwProcessForm/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: `<van-form id="dynamicRenderContainer" processPrefix="tempPlaceholder" auto-gen-process-block="ow-process-form"></van-form>`,
  }),
};
