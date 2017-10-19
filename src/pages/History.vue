<template>
    <article>

        <section class="section">

            <i-filters :nointerval="true" />
            <br>
            <i-boxplot-group
                color="#35495E" :builds="builds"
            />
        </section>

    </article>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

import IBoxplotGroup from '@/components/BoxPlotGroup.vue'
import IFilters from '@/components/Filters.vue'

export default{
    name: 'in-history',
    props: ['name'],
    components: { IBoxplotGroup, IFilters },
    data: () => ({
    }),
    computed: mapState({
        builds: function(state) {
            return _(state.jsons)
                .map((i, k) => ({
                    name: i.name,
                    date: i.date,
                    classes: i.classes,
                    key: k,
                    star: i.star,
                    alias: i.alias,
                }))
                .filter({name: this.name})
                .orderBy('date')
                .take(5)
            .value()
        },
    }),
    mounted() {

    }
    // watch: {
    //     metric() { this.max = 0 },
    //     $language() {this.$forceUpdate()}
    // },
    // methods: {
    //     comparation() {
    //         if(this.term != undefined){
    //             this.compare =  _.filter(this.builds, {date: this.term})[0]
    //         }
    //     },
    //     getMax(newMax) {
    //         if(newMax > this.max && newMax != undefined) {
    //             this.max = newMax
    //         }
    //     },
    //     normalizeBuildName(build) {
    //         let name = ''
    //         if(build.alias != null)
    //             name = build.alias
    //         return `${name} (${build.date})`
    //     }
    // }
}
</script>
