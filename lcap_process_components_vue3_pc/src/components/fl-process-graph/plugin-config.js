import ProcessNodeGroup from './components/custom/process-node-group.js';
import GatewayGroup from './components/custom/gateway.js';
import FlowBranchLink from './components/custom/flow-link-branch.js';

/**
 * JFlowVuePlugin 的配置
 * 用于在组件库安装时注册自定义的节点组和链接
 */
export const jflowPluginConfig = {
  customGroups: {
    ProcessNodeGroup,
    GatewayGroup,
  },
  customLink: {
    FlowBranchLink,
  },
};
