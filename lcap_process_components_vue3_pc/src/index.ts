import { type Plugin } from 'vue';
import * as Components from './components';
import { JFlowVuePlugin } from '@joskii/jflow-vue3-plugin';
import { jflowPluginConfig } from './components/fl-process-graph/plugin-config.js';

export * from './components';
export * from './logics';

export const install: Plugin = (app, options) => {
  if (!app._jflowPluginRegistered) {
    const res = app.use(JFlowVuePlugin, jflowPluginConfig);
    app._jflowPluginRegistered = true;
  }

  // 注册所有组件
  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name]);
  });
};

export default {
  install,
} as Plugin;
