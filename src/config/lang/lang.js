import Vue from 'vue'
import VueMultiLanguage from 'vue-multilanguage'

import en from './en.js'
import pt from './pt.js'

Vue.use(VueMultiLanguage, {
    default: 'en',
    en,
    pt,
})
