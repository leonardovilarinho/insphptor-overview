<template>
    <div>
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
    props: [ 'build', 'name', 'color' ],
    computed: mapState({
        metric: state => state.metric,
        interval: state => state.interval,
        current() {
            let metric = this.metric
            return {
                date: this.build.date,
                chart: _(this.build.classes)
                    .map( i => {
                        if(metric != 'all')
                            return parseFloat(parseFloat(i.metrics[metric]).toFixed(2))
                        let sum = 0
                        _.map(i.metrics, j => { sum += parseFloat(parseFloat(j).toFixed(2)) })
                        return sum
                    })
                    .sort((a,b) => a - b)
                .value()
            }
        },
        current_median() {
            return this.median(this.current.chart)
        },
        quartiles() {
            let array = this.current.chart
            array.sort((a,b) => a - b)
            let medium = array.length / 2

            if(array.length % 2 == 0) {
                array.splice(medium - 1, 1)
                array.splice(medium - 1, 1)
            }
            else
                array.splice(medium - 0.5, 1)
            let component = this;
            array = _(array)
                .chunk(array.length / 2)
                .map( q => component.median(q) )
            .value()

            return array
        }
    }),
    mounted()       { this.loadData() },
    watch: {
        metric()    { this.loadData() },
        interval()  { this.loadData() },
        build()     { this.loadData() },
        $language() { this.loadData() },
    },
    methods: {
        loadData() {
            let c = this
            Highcharts.chart(this.name, {
                chart: {
                    type: 'boxplot',
                    inverted: true
                },
                title: {
                    text: null
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories: [this.t(`more.project`)]
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
                        data: [
                            this.calculate()
                        ],
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
        median(array) {
            array.sort((a,b) => a - b)
            let medium = array.length / 2

            if(array.length % 2 == 0)
                return (array[medium - 1] + array[medium]) / 2
            else
                return array[medium - 0.5]
        },
        calculate() {
            return [
                _.first(this.current.chart),
                this.quartiles[0],
                this.current_median,
                this.quartiles[1],
                _.last(this.current.chart)
            ]
        }
    }
}
</script>
