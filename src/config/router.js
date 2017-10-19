import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// const Home      = () => import('@/pages/Home.vue')
// const Timeline  = () => import('@/pages/Timeline.vue')
// const Search    = () => import('@/pages/Search.vue')
// const History    = () => import('@/pages/History.vue')
// const Git    = () => import('@/pages/Git.vue')

import Home      from '@/pages/Home.vue'
import Timeline  from '@/pages/Timeline.vue'
import Search    from '@/pages/Search.vue'
import History    from '@/pages/History.vue'
import Git    from '@/pages/Git.vue'

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'root',
            path: '/',
            component: Home
        },
        {
            name: 'timeline',
            path: '/:name/timeline',
            component: Timeline,
            props: true
        },
        {
            name: 'search',
            path: '/:id/:min/search',
            component: Search,
            props: true
        },
        {
            name: 'history',
            path: '/:name/history',
            component: History,
            props: true
        },
        {
            name: 'git',
            path: '/:name/git',
            component: Git,
            props: true
        },
    ]
})
