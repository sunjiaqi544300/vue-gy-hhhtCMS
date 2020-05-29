import index from 'module/index' // 主页

const routerZ = [{
    path: '/',
    name: 'index',
    component: index,
    // children: (pie => [{
    //         path: '/advmap',
    //         name: 'advmap',
    //         component: () =>
    //             import ('module/permissionSettings/advmap.vue'),
    //         meta: {
    //             title: '商圈展示'
    //         }
    //     }, , {
    //         path: '/strategyTableW',
    //         name: 'strategyTable',
    //         component: () =>
    //             import ('module/strategyTable/strategyTable.vue'),
    //         meta: {
    //             title: '市场地图',
    //             keepAlive: true
    //         }
    //     }, {
    //         path: '/strategyTableW/level-2', 
    //         name: 'strategyTableList', 
    //         component: () =>
    //             import ('module/strategyTable/strategyTableLevel-2.vue'),
    //         meta: {
    //             title: '市场地图',
    //             keepAlive: false
    //         }
    //     },
    //     {
    //         path: '/strategyTableW/level-3',
    //         name: 'strategyTableList',
    //         component: () =>
    //             import ('module/strategyTable/strategyTableLevel-3.vue'),
    //         meta: {
    //             title: '市场地图',
    //             keepAlive: false
    //         }
    //     },
    //     {
    //         path: '/policyQuery',
    //         name: 'policyQuery',
    //         component: () =>
    //             import ('module/myWork/PolicyQuery.vue'),
    //         meta: {
    //             title: '市场状态',
    //             keepAlive: true
    //         }
    //     },
    //     {
    //         path: '/policyQuery/level-2',
    //         name: 'policyQuery',
    //         component: () =>
    //             import ('module/myWork/PolicyQuery2.vue'),
    //         meta: {
    //             title: '市场状态',
    //             keepAlive: true
    //         }
    //     },
    //     {
    //         path: '/BasicInformation',
    //         name: 'BasicInformation',
    //         component: () =>
    //             import ('module/basic_information/BasicInformation.vue'),
    //         meta: {
    //             title: '战略价值'
    //         }
    //     }
    // ])()
}]

export default [
    ...routerZ
]