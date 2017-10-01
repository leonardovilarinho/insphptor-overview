<template>
    <section>
        <in-main-menu />

        <main>
            <router-view />
        </main>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

import InMainMenu from '@/template/MainMenu.vue'

const http = axios.create()

export default {
    name: 'app',
    components: { InMainMenu },
    mounted() {
        this.loadData()
    },
    methods: {
        loadData() {
            http.get('/data/info.json').then(response => {
                if(response.status == 200)
                    this.draw(response.data)
            })
        },
        draw(data) {
            for(let file of data) {
                http.get(`/data/${file}`).then(response => {
                    if(response.status == 200)
                        this.addFile(response.data)
                })
            }
        },
        ...mapActions([
            'addFile'
        ])
    }
}
</script>

<style lang='sass'>
    @import './../node_modules/bulma/sass/utilities/initial-variables'
    @import './assets/sass/colors'
    @import './../node_modules/bulma/bulma'
    html, body, #app
        margin: 0px
        padding: 0px
    main
        margin-top: 30px

    .tooltip
        display: block
        opacity: 0.95
        min-width: 320px
        z-index: 10000
        font-size: 11pt

        strong
            color: #fff

        .tol-title
            padding: 3px 10px
            border-bottom: 1px solid #fff
            width: 100%

        .tol-body
            padding: 5px 15px
            background: darken($green, 15%)

            ul
                list-style: none
                margin-top: 5px

    .tooltip-inner
        background: $green
        color: #fff
        border-radius: 2px

    .tooltip-arrow
        display: none
        &[aria-hidden='true']
            visibility: hidden
            opacity: 0
            transition: opacity .5s, visibility .5s
        &[aria-hidden='false']
            visibility: visible
            opacity: 1
            transition: opacity .5s
</style>
