import Vue from 'vue'
import App from './App.vue'

import VTooltip from 'v-tooltip'
Vue.use(VTooltip, {
    defaultPlacement: 'bottom-end'
})

import Bus from '@/Bus'
Vue.use(Bus)

Vue.component('i-header', require('@/template/Header.vue') )
Vue.component('i-modal', require('@/components/Modal.vue') )

require('@/config/lang/lang')
import { router }   from '@/config/router'
import { store }    from '@/config/store/store'

import AliasTranslate from '@/AliasTranslate'
Vue.use(AliasTranslate)

import 'vue-awesome/icons'

import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)


new Vue({
  el: '#insphptor',
  router: router,
  store: store,
  render: h => h(App)
})
