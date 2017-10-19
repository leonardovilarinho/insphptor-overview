<template>
    <article>

        <section class="section">
            <i-filters/>
            <section class="columns">
                <i-container title="labels.compare" :build="compare">
                    <span class="select is-small is-fullwidth" v-tooltip="tooltip('compare')">
                        <select v-model="term" @change="comparation">
                            <option
                                v-for="build in builds"
                                v-if="build != lastBuild"
                                :value="build.date"
                            >
                                {{ normalizeBuildName(build) }}
                            </option>
                        </select>
                    </span>

                    <p>{{ compare.classes.length }} <span v-lang.labels.found /></p>

                    <section class="columns">
                        <span class="column">{{ normalizeBuildName(compare) }}</span>
                        <i-rate class="column has-text-right" :value="compare.star" v-tooltip="tooltip('star')" />
                    </section>

                    <i-histogram
                        @getMax="getMax" :max="max"
                        slot="histogram" id="h-before" name="h-before"
                        color="#35495E" :build="compare"
                    />
                </i-container>

                <i-container title="labels.current" :build="lastBuild">
                    <span class="select  is-small is-fullwidth" v-tooltip="tooltip('last')">
                        <select disabled>
                            <option selected>{{ normalizeBuildName(lastBuild) }}</option>
                        </select>
                    </span>

                    <p>{{ lastBuild.classes.length }} <span v-lang.labels.found /></p>
                    <section class="columns">
                        <span class="column">{{ normalizeBuildName(lastBuild) }}</span>
                        <i-rate class="column has-text-right" :value="lastBuild.star" v-tooltip="tooltip('star')"/>
                    </section>

                    <i-histogram
                        @getMax="getMax" :max="max"
                        slot="histogram" id="h-after" name="h-after"
                        color="#41B883" :build="lastBuild"
                    />
                </i-container>
            </section>
        </section>
    </article>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

import IFilters from '@/components/Filters.vue'
import IContainer from '@/components/Container.vue'
import IHistogram from '@/components/Histogram.vue'

export default{
    name: 'in-timeline',
    props: ['name'],
    components: { IFilters, IContainer, IHistogram },
    data: () => ({
        compare : {date: '', classes: [], name: '', alias: null},
        term    : '',
        max: 0
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
            .value()
        },
        metric: state => state.metric,
        lastBuild: function() {
            let build = _.last(this.builds)
            return build != undefined ? build : {date: '', classes: [] }
        },
    }),
    watch: {
        metric() { this.max = 0 },
        $language() {this.$forceUpdate()}
    },
    methods: {
        comparation() {
            if(this.term != undefined){
                this.compare =  _.filter(this.builds, {date: this.term})[0]
            }
        },
        getMax(newMax) {
            if(newMax > this.max && newMax != undefined) {
                this.max = newMax
            }
        },
        normalizeBuildName(build) {
            let name = ''
            if(build.alias != null)
                name = build.alias
            return `${name} (${build.date})`
        }
    }
}
</script>
