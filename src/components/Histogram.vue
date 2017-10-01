]<template>
    <div></div>
</template>

<script>
import _ from 'lodash'
import Highcharts from 'highcharts'

import { mapState } from 'vuex'

export default{
    name: 'i-histogram',
    props: [ 'build', 'name', 'color', 'max' ],
    computed: mapState({
        metric: state => state.metric,
        interval: state => state.interval,
        current: function() {
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
                    .sort()
                .value()
            }
        }
    }),
    mounted() {
        this.loadData()
        this.$bus.$on('filterChanged', this.filterChanged)
        // this.$bus.$on('maxChanged', this.maxChanged)
    },
    watch: {
        build()     { this.loadData() },
        max()     { this.loadData() },
        $language() { this.loadData() },
    },
    methods: {
        loadData() {
            let c = this

            if(this.current == undefined)
                this.current = {date: '', chart: []}

            const histogram = this.histogram(this.current.chart, this.interval)

            Highcharts.chart(this.name, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: null
                },
                xAxis: {
                    title: {
                        text: this.t(`metrics.${this.metric}`)
                    }
                },
                yAxis: {
                    title: {
                        text: this.t('chart.incident')
                    },
                    tickInterval: parseInt(this.max / 8),
                    min: 0,
                    max: this.max
                },
                plotOptions: {
                    column: {
                        minPointLength: 5
                    }
                },
                series: [
                    {
                        color: this.color,
                        showInLegend: false,
                        name: this.t('chart.incident'),
                        type: 'column',
                        data: histogram,
                        pointPadding: 0,
                        groupPadding: 0,
                        pointPlacement: 'between',
                        tooltip: {
                            headerFormat: this.t('chart.tooltip', this.interval)
                        },
                        point: {
                            events: {
                                click: function () {
                                    c.$router.push({
                                        name: 'search',
                                        params: {
                                            id: c.build.key,
                                            min: this.category
                                        }
                                    })
                                }
                            }
                        }
                    }
                ]
            })
            this.getMax(histogram)
        },
        getMax(histogram) {
            const values = _.map(histogram, i => i[1])

            const max =  _.max(values)
            this.$emit('getMax', (max % 2 == 0) ? max + 2 : max + 1)
        },
        histogram(data, step) {
            let histo = {}, arr = [], x

            for (let i = 0; i < data.length; i++) {
                x = Math.floor(data[i] / step) * step

                if(!histo[x])
                    histo[x] = 0

                histo[x]++
            }
            for (x in histo)
                if(histo.hasOwnProperty((x)))
                    arr.push([parseFloat(x), histo[x]])

            arr.sort((a, b) => a[0] - b[0])

            return arr
        },
        filterChanged() {
            this.loadData()
        },
    }
}
</script>
