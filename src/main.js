// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import store from './store'

import axios from 'axios'
import qs from 'qs'

import VCharts from 'v-charts'
import $eCharts from 'echarts'

import Element from 'element-ui'

Vue.use(Element, { size: 'mini' })
Vue.use(VCharts)
Vue.prototype.$qs = qs

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$eCharts = $eCharts

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})