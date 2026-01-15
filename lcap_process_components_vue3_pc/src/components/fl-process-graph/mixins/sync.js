function createWatch(name) {
  return {
    handler(val, oldVal) {
      if (val === oldVal) {
        return;
      }

      this.$emit('sync:state', name, val);
    },
    immediate: true,
  };
}

function normalizeSyncOptions(options) {
  const syncMap = {};
  const computedMap = {};
  const watchMap = {};

  options.forEach((option) => {
    if (typeof option === 'string') {
      syncMap[option] = {
        name: option,
        stateKey: option,
      };

      watchMap[option] = createWatch(option);
      return;
    }

    Object.keys(option).forEach((name) => {
      const val = option[name];

      if (typeof val === 'function') {
        const stateKey = [name, 'sync'].join('__');
        syncMap[name] = {
          name,
          stateKey,
        };

        watchMap[stateKey] = createWatch(name);
        computedMap[stateKey] = val;
        return;
      }

      syncMap[name] = {
        name,
        stateKey: val,
      };
      watchMap[val] = createWatch(name);
    });
  });

  return {
    syncMap,
    computedMap,
    watchMap,
  };
}

export default (...options) => {
  const { syncMap, watchMap, computedMap } = normalizeSyncOptions(options);
  return {
    methods: {
      $emitSync(names = []) {
        names.forEach((name) => {
          if (!syncMap[name]) {
            return;
          }

          const { stateKey } = syncMap[name];
          this.$emit('sync:state', name, this[stateKey]);
        });
      },
      $emitSyncParams(params) {
        if (!params || typeof params !== 'object') {
          return;
        }

        ['size', 'page', 'sort', 'order', 'filterText'].forEach((key) => {
          this.$emit('sync:state', key, params[key]);
        });
      },
    },
    watch: {
      ...watchMap,
    },
    computed: {
      ...computedMap,
    },
  };
};
