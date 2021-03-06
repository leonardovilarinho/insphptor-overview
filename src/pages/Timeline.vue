<template>
    <article>

        <section class="section">
            <i-filters/>
            <section class="columns">
                <i-container title="labels.compare" :build="compare">
                    <span class="select is-small is-fullwidth" v-tooltip="tooltip('compare')">
                        <select v-model="term" @change="comparation">
                            <option
                                v-for="(build, key) in builds"
                                :key="key"
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
                    </section>

                    <i-histogram
                        ref="hLeft"
                        slot="histogram" id="h-before" name="h-before"
                        color="#35495E" :build="compare"
                    />
                </i-container>

                <i-container title="labels.current" :build="lastBuild">
                    <span class="select  is-small is-fullwidth" v-tooltip="tooltip('last')">
                        <select v-model="termRight" @change="comparationTarget">
                            <option
                                v-for="(build, key) in builds"
                                :key="build.date"
                                :value="build.date"
                            >
                                {{ normalizeBuildName(build) }}
                            </option>
                        </select>
                    </span>

                    <p>{{ compareRight.classes.length }} <span v-lang.labels.found /></p>
                    <section class="columns">
                        <span class="column">{{ normalizeBuildName(compareRight) }}</span>
                    </section>

                    <i-histogram
                        ref="hRight"
                        slot="histogram" id="h-after" name="h-after"
                        color="#41B883" :build="compareRight"
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
        compareRight : {date: '', classes: [], name: '', alias: null},
        term    : '',
        termRight    : ''
    }),
    mounted() {
        setTimeout(() => {

            const first = _(this.builds).first()
            
            this.compare = first
            this.term = first.date
            
            const last = _(this.builds).last()
            
            this.compareRight = last
            this.termRight = last.date

        }, 200);
    },
    computed: mapState({
        builds: function(state) {
            return _(state.jsons)
                .map((i, k) => ({
                    name: i.name,
                    date: i.date,
                    classes: i.classes,
                    key: k,
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
        metric() {
            this.maxX = 0
            this.maxY = 0
        },
        $language() {this.$forceUpdate()}
    },
    methods: {
        comparation() {
            if(this.term != undefined){
                this.compare =  _.filter(this.builds, {date: this.term})[0]
            }
        },
        comparationTarget() {
            if(this.termRight != undefined){
                this.compareRight =  _.filter(this.builds, {date: this.termRight})[0]
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
