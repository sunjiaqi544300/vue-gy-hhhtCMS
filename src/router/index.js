import Vue from 'vue'
import Router from 'vue-router'

// router 每个模块代表一个人的router模块
import routesW from './routes1'
// import routesQ from './routes3'
// import routesZ from './routes2'
import routesD from './routes4'

Vue.use(Router)

// let router = new Router({routes: [...routesW, ...routesQ, ...routesZ, ...routesD]})
let router = new Router({routes: [...routesW, ...routesD]})

export default router
