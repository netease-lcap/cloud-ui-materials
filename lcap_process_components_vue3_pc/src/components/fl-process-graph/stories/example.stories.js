import Component from '../index';

export default {
  id: 'fl-process-graph-examples',
  title: '组件列表/FlProcessGraph/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

const dataSource = [
  {
    procInstId: 'e94782a5-d0f8-11f0-bb6f-22159b0872e7',
    elementList: [
      {
        current: false,
        completed: true,
        name: 'start',
        title: '开始',
        type: 'InitiateTask',
        incomingFlows: ['Process_09de0cf6_Start_to_InitiateTask'],
        outcomingFlows: ['sequenceFlow1'],
        completeInfos: [
          {
            assignee: {
              userName: 'DEVACC-vue3elementplusprocess',
              displayName: 'DEVACC-vue3elementplusprocess',
            },
            completeTime: '2025-12-04 18:06:34',
            completed: true,
            candidates: [
              {
                userName: 'DEVACC-vue3elementplusprocess',
                displayName: 'DEVACC-vue3elementplusprocess',
              },
            ],
            addSignTag: null,
          },
        ],
        x: 0.0,
        y: 200.0,
        width: 0.0,
        height: 0.0,
      },
      {
        current: false,
        completed: false,
        name: 'end',
        title: null,
        type: 'EndEvent',
        incomingFlows: ['sequenceFlow2'],
        outcomingFlows: [],
        completeInfos: null,
        x: 0.0,
        y: 400.0,
        width: 0.0,
        height: 0.0,
      },
      {
        current: true,
        completed: false,
        name: 'approvalTask1',
        title: '审批任务1',
        type: 'ApprovalTask',
        incomingFlows: ['sequenceFlow1'],
        outcomingFlows: ['sequenceFlow2'],
        completeInfos: [
          {
            assignee: null,
            completeTime: '',
            completed: false,
            candidates: [
              {
                userName: 'DEVACC-vue3elementplusprocess',
                displayName: 'DEVACC-vue3elementplusprocess',
              },
            ],
            addSignTag: null,
          },
        ],
        x: 0.0,
        y: 305.22369384765625,
        width: 0.0,
        height: 0.0,
      },
    ],
    flowList: [
      {
        current: false,
        completed: true,
        name: 'sequenceFlow1',
        title: null,
        type: 'sequenceFlow',
        sourceRef: 'start',
        targetRef: 'approvalTask1',
        wayPoints: [
          {
            x: 0.0,
            y: 1.0,
          },
          {
            x: 0.0,
            y: -1.0,
          },
        ],
      },
      {
        current: false,
        completed: false,
        name: 'sequenceFlow2',
        title: null,
        type: 'sequenceFlow',
        sourceRef: 'approvalTask1',
        targetRef: 'end',
        wayPoints: [
          {
            x: 0.0,
            y: 1.0,
          },
          {
            x: 0.0,
            y: -1.0,
          },
        ],
      },
    ],
    diagramBeginX: 0.0,
    diagramBeginY: -1.0,
    diagramWidth: 0.0,
    diagramHeight: 400.0,
  },
];

const dataSourcePromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataSource);
    }, 1000);
  });
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    components: {
      'fl-process-graph': Component,
    },
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        dataSource,
      };
    },
    template: '<fl-process-graph v-bind="args" :dataSource="dataSource"></fl-process-graph>',
  }),
  args: {
    text: 'Hello world',
  },
};

export const Example2 = {
  name: '数据源为 Promise',
  render: (args, { argTypes }) => ({
    components: {
      'fl-process-graph': Component,
    },
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        dataSourcePromise,
      };
    },
    template: '<fl-process-graph v-bind="args" :dataSource="dataSourcePromise"></fl-process-graph>',
  }),
  args: {
    text: 'Hello world',
  },
};
