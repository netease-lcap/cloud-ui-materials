export default {
    props: {
        dataSource: [Array, Function, Object],
        dataSchema: { type: String, default: 'entity' },
        textField: { type: String, default: 'text' },
        valueField: { type: String, default: 'value' },
        treeSelectTip: { type: String, default: '请绑定数据源或插入子节点' },
    },
    data() {
        return {
            currentDataSource: undefined,
            loading: false,
        };
    },
    watch: {
        dataSource() {
            this.handleData();
        },
    },
    created() {
        this.handleData();
    },
    methods: {
        handleData() {
            this.currentDataSource = this.normalizeDataSource(this.dataSource, this.multiple);
            if (this.currentDataSource && this.currentDataSource.load) {
              this.load();
            }
        },
        normalizeDataSource(dataSource, multiple) {
            const self = this;
            let final;
            if (dataSource === undefined) {
                final = {
                    data: [],
                    load: undefined,
                };
            } else {
                final = this.currentDataSource || {
                    data: [],
                    load: undefined,
                };
            }

            function createLoad(rawLoad) {
                return async function (params = {}) {
                    const res = await rawLoad(params);
                    let newData;
                    if (Array.isArray(res)) {
                        newData = res;
                    } else if (Array.isArray(res.list)) {
                        newData = res.list;
                    } else if (res.content) {
                        newData = res.content;
                    } else {
                        newData = res;
                    }
                    final.data = newData;
                    self.currentDataSource = { ...final };
                };
            }

            if (Array.isArray(dataSource))
                final.data = dataSource;
            else if (typeof dataSource === 'string') {
                try {
                    return this.normalizeDataSource(JSON.parse(dataSource));
                } catch (err) {
                    console.error(err);
                }
            } else if (dataSource instanceof Object && dataSource.hasOwnProperty('list') && Array.isArray(dataSource.list)) {
                final.data = dataSource.list;
            } else if (typeof dataSource === 'function')
                final.load = createLoad(dataSource);

            return final;
        },
        load(params) {
            this.$emit('before-load', undefined, this);
            this.loading = true;
            this.currentDataSource.load(params)
                .then(() => {
                    this.$emit('load', undefined, this);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        reload() {
            // 数据源不是function的时候，调用reload会报错，进行容错处理
            if (this.currentDataSource.load)
                this.load();
        },
    },
};
