<template>
    <section class="section">
        <nav class='panel'>
            <div class='panel-heading' style="color: #fff">
                <p v-lang.title.search="{min: min, max: max, metric: t('metrics.' + metric)}"></p>
            </div>

            <a
                class='panel-block'
                v-for="(item, key) in build.classes"
                v-if="isValid(key)"
                v-tooltip="tooltip('_class', item.metrics, false)"
                @click="open(item)"
            >
                <span style="margin-right: 25px">{{ item.weight }}w</span>
                <span v-text='item.namespace + "\\" + item.name' />
            </a>
        </nav>
        <i-modal ref="modal"/>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

export default{
    name: 'i-search',
    props: ['min', 'id'],
    data: () => ({
        term: ''
    }),
    computed: mapState({
        metric: state => state.metric,
        build: function(state) {
            let metric = this.metric
            let b = state.jsons[this.id]
            if(b == undefined) {
                this.cancel()
                return []
            }
            return {
                date: b.date,
                name: b.name,
                classes: b.classes,
                metric: _(b.classes)
                    .map( i => {
                        if(metric != 'all')
                            return parseFloat(parseFloat(i.metrics[metric]).toFixed(2))
                        let sum = 0
                        _.map(i.metrics, j => { sum += parseFloat(parseFloat(j).toFixed(2)) })
                        return sum
                    } )
                .value()
            }
        },
        max: function() {
            return parseInt(this.min) + parseInt(this.$store.state.interval)
        }
    }),
    methods: {
        isValid(key) {
            return this.build.metric[key] >= this.min && this.build.metric[key] <= this.max && this.build.classes[key].type != 'file'
        },
        cancel() {
            this.$router.push({name: 'root'})
        },
        open(item) {
            this.$refs.modal.open(item)
        }
    }
}
</script>
