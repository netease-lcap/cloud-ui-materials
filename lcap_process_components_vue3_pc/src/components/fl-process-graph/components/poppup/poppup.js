import { h } from 'vue';
import poppupWrapper from './poppup-wrapper.vue';
import infoPoppup from './info-poppup.vue';
import callSubProcessPoppup from './callSubProcess-info-poppup.vue';

function getComponent(type, node) {
  switch (type) {
    case 'info':
      if (node && node.type === 'CallSubProcess') {
        return callSubProcessPoppup;
      }
      return infoPoppup;
    default:
      return null;
  }
}

export default {
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  setup(props, { attrs }) {
    return () => {
      const { meta } = props;
      if (!meta) return null;
      const targetComponent = getComponent(meta.type, meta.target);
      if (!targetComponent) return null;
      return h(
        poppupWrapper,
        {
          ...attrs,
          ...props,
        },
        [
          h(targetComponent, {
            ...attrs,
            ...props,
          }),
        ]
      );
    };
  },
};
