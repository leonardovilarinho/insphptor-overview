<template>
    <article>

        <section class="section">
            <span class="select is-small is-fullwidth" v-tooltip="tooltip('select')">
                <select v-model="date">
                    <option
                        v-for="build in builds"
                        :key="build.date"
                        v-if="build.git"
                        :value="build.date"
                    >
                        {{ normalizeBuildName(build) }}
                    </option>
                </select>
            </span>

            <section class="columns" v-if="current != undefined">
                <i-pie class="column"
                    :name="t('labels.commits')" container="commits"
                    id="commits" :devs="current.devs"
                />
                <i-pie class="column"
                    :name="t('labels.inserts')" container="inserts"
                    id="inserts" :devs="current.devs"
                />
                <i-pie class="column"
                    :name="t('labels.deletions')" container="deletions"
                    id="deletions" :devs="current.devs"
                />
            </section>
        </section>

    </article>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import IPie from '@/components/Pie.vue'

export default{
    name: 'i-git',
    props: ['name'],
    components: { IPie },
    data: () => ({
        current : {devs: {}},
        date: ''
    }),
    computed: mapState({
        builds: function(state) {
            return _(state.jsons)
                .map((i, k) => ({
                    name: i.name,
                    date: i.date,
                    git: i.git,
                    key: k,
                    devs: i.devs,
                    alias: i.alias,
                }))
                .filter({name: this.name})
                .orderBy('date')
                .take(5)
            .value()
        },
    }),
    mounted() {
        setTimeout(() => {
            const last = _(this.builds).last()

            if(last.date != undefined)
                this.date = last.date
        }, 200);
    },
    watch: {
        date(newVal) {
            this.current = _.filter(this.builds, {date: newVal})[0]
        }
    },
    methods: {
        normalizeBuildName(build) {
            let name = ''
            if(build.alias != null)
                name = build.alias
            return `${name} (${build.date})`
        }
    }
}
</script>
