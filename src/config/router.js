import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home      = () => import('@/pages/Home.vue')
const Timeline  = () => import('@/pages/Timeline.vue')
const Search    = () => import('@/pages/Search.vue')

// import Home      from '@/pages/Home.vue'
// import Timeline  from '@/pages/Timeline.vue'
// import Search    from '@/pages/Search.vue'

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
    ]
})
