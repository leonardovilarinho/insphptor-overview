<template>
    <div>
    </div>
</template>

<script>
import _ from 'lodash'

import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'

highchartsMore(Highcharts)

export default{
    name: 'i-pie',
    props: [ 'devs', 'name', 'container' ],
    computed: {
        chart() {
            let result = []

            for(let dev in this.devs) {
                result.push({
                    name: this.cleanName(dev),
                    y:    this.devs[dev][this.container],
                })
            }
            return result
        }
    },
    mounted() {
        this.loadData()
    },
    watch: {
        devs()    { this.loadData() },
    },
    methods: {
        cleanName(name) {
            let split = name.split('<')
            for (var i = 0; i < split.length; i++)
                split[i] = split[i].trim()

            if(split[0] != '')
                return split[0]
            return split[1].replace('>', '')
        },
        loadData() {
            let c = this

            Highcharts.chart(this.container, {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: this.name
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true
                        },
                        // showInLegend: true,
                        colors: ['#41B883', '#35495E', '#F69BC1', '#F15E5E', '#FFCC33']
                    },
                },
                series: [{
                    name: 'Brands',
                    data: this.chart
                }]
            });
        }
    }
}
</script>
