<template>
    <section class="columns" style="margin-bottom: -30px">
        <div class="field column">
            <p v-lang.labels.metric/>

            <p class="control has-icons-left" v-tooltip="tooltip('metric', metricLabel)">
                <span class="select is-small is-fullwidth">
                    <select @change="metricChanged" v-model="metric">
                        <option v-for="(val, key) in metrics" :value="key" v-tooltip="tooltip('metric')">
                            <span>{{ t('metrics.' + key) }}</span>
                        </option>
                    </select>
                </span>
                <span class="icon is-small is-left">
                    <icon name="stop-circle-o" />
                </span>
            </p>
        </div>

        <div class="field column">
            <p v-lang.labels.interval />
            <p class="control has-icons-left" v-tooltip="tooltip('interval')">
                <span class="is-fullwidth">
                    <input class="input is-small" type="number" :step="intervalSave" @change="intervalChanged" v-model="interval"/>
                </span>
                <span class="icon is-left" style="font-size: 9pt">
                    <icon name="balance-scale" />
                </span>
            </p>
        </div>
    </section>
</template>

<script>
export default{
    name: 'in-filters',
    data: () => ({
        metric: 'size',
        interval: 0,
        intervalSave: 0,
        metrics: {
            all:            25,
            size:           10,
            complexity:      5,
            // encapsulation:  10,
            efferent:        2,
            afferent:        2,
            cohesion:        1,
        },
    }),
    computed: {
        metricLabel() {
            let result = {}
            result[`metrics.${this.metric}`] = `m_details.${this.metric}`
            return result
        }
    },
    mounted() {
        this.metric = this.$store.state.metric,
        this.interval = this.metrics[ this.metric ]
        this.intervalSave = this.interval
        this.intervalChanged()
    },
    methods: {
        metricChanged() {
            this.interval = this.metrics[ this.metric ]
            this.intervalSave = this.interval
            this.$store.dispatch('setMetric', this.metric)
            this.intervalChanged()
        },
        intervalChanged() {
            this.$store.dispatch('setInterval', this.interval)
            this.$bus.$emit('filterChanged')
        }
    }
}
</script>
