<template>
    <div id="history">
    </div>
</template>

<script>
import _ from 'lodash'

import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'

highchartsMore(Highcharts)

import { mapState } from 'vuex'
export default{
    name: 'i-boxplot',
    props: [ 'builds', 'color' ],
    computed: mapState({
        metric: state => state.metric,
        interval: state => state.interval,
        chartItens() {
            return _(this.builds)
                .map(b => this.calculate(this.getItemChartData(b)))
            .value()
        },
        categories() {
            return _(this.builds)
                .map(b => b.alias != null ? b.alias : b.date)
            .value()
        }
    }),
    mounted() {
        setTimeout(() => this.loadData(), 500)
    },
    methods: {
        getItemChartData(item) {
            let metric = this.metric
            return  _(item.classes)
                .map( i => {
                    if(metric != 'all')
                        return parseFloat(parseFloat(i.metrics[metric]).toFixed(2))
                    let sum = 0
                    _.map(i.metrics, j => { sum += parseFloat(parseFloat(j).toFixed(2)) })
                    return sum
                })
                .sort((a,b) => a - b)
            .value()
        },
        median(array) {
            array.sort((a,b) => a - b)
            let medium = array.length / 2

            if(array.length % 2 == 0)
                return (array[medium - 1] + array[medium]) / 2
            else
                return array[medium - 0.5]
        },
        itemMedian(item) {
            return this.median(item)
        },
        quartiles(item) {
            let array = item
            array.sort((a,b) => a - b)
            let medium = array.length / 2

            if(array.length % 2 == 0) {
                array.splice(medium - 1, 1)
                array.splice(medium - 1, 1)
            }
            else
                array.splice(medium - 0.5, 1)
            array = _(array)
                .chunk(array.length / 2)
                .map( q => this.median(q) )
            .value()

            return array
        },
        calculate(item) {
            return [
                _.first(item).toFixed(2),
                this.quartiles(item)[0].toFixed(2),
                this.itemMedian(item).toFixed(2),
                this.quartiles(item)[1].toFixed(2),
                _.last(item)
            ]
        },

        loadData() {
            let c = this
            Highcharts.chart('history', {
                chart: {
                    type: 'boxplot',
                },
                title: {
                    text: _.first(this.builds).name
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories: this.categories
                },
                yAxis: {
                    title: {
                        text: this.t(`metrics.${this.metric}`)
                    },
                    min: 0,
                },
                series: [
                    {
                        color: this.color,
                        name: this.t(`more.project`),
                        type: 'boxplot',
                        data: this.chartItens
                    }
                ],
                tooltip: {
                    formatter: function () {
                        let p = this.point
                        return `
                            <b>${c.t('box.max')}:</b> ${p.high}<br>
                            <b>${c.t('box.upper')}:</b> ${p.q3}<br>
                            <b>${c.t('box.median')}:</b> ${p.median}<br>
                            <b>${c.t('box.lower')}:</b> ${p.q1}<br>
                            <b>${c.t('box.min')}:</b> ${p.low}
                        `
                    }
                }
            })
        },
    },
    watch: {
        metric()    { this.loadData() },
        interval()  { this.loadData() },
        build()     { this.loadData() },
        $language() { this.loadData() },
    },
}
</script>
