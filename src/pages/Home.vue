<template>
    <article>
        <section class="section">
            <nav class='panel'>
                <div class='panel-heading'>
                    <p class='control has-icons-left'>
                        <input class='input is-small' :placeholder='t("more.search")' v-model='term' />
                        <span class='icon is-small is-left'>
                            <icon name='search' />
                        </span>
                    </p>
                </div>

                <a class='panel-block' v-for='project in filtered'>
                        <div class="column is-9 is-paddingless">
                            <span class='panel-icon' style="margin-top: 5px">
                                <icon name='book' />
                            </span>
                            <span v-text='project.name' />
                        </div>
                        <div class="column is-3 has-text-right is-paddingless">
                            <a  @click='toTimeline(project.name)'
                                class="button is-primary is-small is-outlined"
                            >
                                <icon name="exchange" style="margin-right: 5px"/>
                                <span v-lang.more.comparation />
                            </a>
                            <a  @click='toHistory(project.name)'
                                class="button is-success is-small is-outlined"
                            >
                                <icon name="history" style="margin-right: 5px"/>
                                <span v-lang.more.history />
                            </a>
                            <a @click='toGit(project.name)'
                                class="button is-primary is-small is-outlined"
                            >
                                <icon name="code-fork" style="margin-right: 5px"/>
                                <span v-lang.more.git />
                            </a>
                        </div>
                </a>
            </nav>
        </section>
    </article>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
export default{
    name: 'in-home-page',
    data: () => ({
        term: ''
    }),
    computed: mapState({
        projects: state => _(state.jsons)
            .map(i => ({name: i.name, git: i.git}))
            .uniqBy('name')
        .value(),
        filtered() {
            this.$forceUpdate()
            return _.filter(this.projects, i => i.name.includes(this.term))
        },
    }),
    methods: {
        toTimeline(project) {
            this.$router.push({
                name: 'timeline',
                params: {
                    name: project
                }
            })
        },
        toHistory(project) {
            this.$router.push({
                name: 'history',
                params: {
                    name: project
                }
            })
        },
        toGit(project) {
            this.$router.push({
                name: 'git',
                params: {
                    name: project
                }
            })
        }
    }
}
</script>

<style lang='sass' >

    @import '../assets/sass/colors'
    .panel-heading
        background: $primary
</style>
