import { h } from 'vue';
import poppupWrapper from './poppup-wrapper.vue';
import infoPoppup from './info-poppup.vue';

function getComponent(type) {
  switch (type) {
    case 'info':
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
      const targetComponent = getComponent(meta.type);
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
