import index from 'module/index' // 主页
import land from 'module/land/land.vue' // 登陆页面
// import choice from 'module/IntelligentChoice/choice.vue'

const routerW = [{
    path: '/',
    name: 'index',
    // redirect: '/advmap',
    component: index,
    children: (pie => [{
            path: '/cy6',
            name: 'cy6',
            component: () =>
                import ('module/cy6/cy6.vue'),
            meta: {
                title: '策略优化'
            }
        }, {
            path: '/functionPage',
            name: 'functionPage',
            component: () =>
                import ('module/businessManagement/functionPage.vue'),
            meta: {
                title: '市场状态',
                  keepAlive: true
            }
        },
        {
            path: '/envQuery',
            name: 'envQuery',
            component: () =>
                import ('module/businessManagement/query/envQuery.vue'),
            meta: {
                title: '商圈查询-环境查询'
            }
        }, {
            path: '/productQuery',
            name: 'productQuery',
            component: () =>
                import ('module/businessManagement/query/productQuery.vue'),
            meta: {
                title: '市场状态-下钻'
            }
        },
        {
          path: '/userManagement',
          name: 'userManagement',
          component: () =>
            import('module/marketindex/marketindex.vue'),
          meta: {
            title: '大盘指数'
          }
        }, {
            path: '/changeQuery',
            name: 'changeQuery',
            component: () =>
                import ('module/businessManagement/query/changeQuery.vue'),
            meta: {
                title: '商圈查询-零售户变化查询',
                
            }
        }, {
            path: '/customerAnalysis',
            name: 'customerAnalysis',
            component: () =>
                import ('module/customerManagement/valueQuery.vue'),
            meta: {
                title: '客户价值分析'
            }
        },
        , {
            path: '/retailershow',
            name: 'retailershow',
            component: () =>
            import ('module/businessManagement/retailerInformationShow.vue'),
            meta: {
            title: '消费环境分析'
            }
            }
    ])()
}, {
    path: '/land',
    name: 'land',
    component: () =>
        import ('module/land/land.vue'),
    meta: { title: '登录页' }
}, ]

export default [
    ...routerW
]