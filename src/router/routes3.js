import index from 'module/index' // 主页
const routerQ = [{
    path: '/',
    name: 'index',
    component: index,
    // children: (pie => [{
    //         path: '/strategyTable/makePosition-2',
    //         name: 'makePosition-2',
    //         component: () =>
    //             import ('module/makePosition/makePosition-2.vue'),
    //         meta: { title: '市场地位', keepAlive: true }
    //     },
    //     {
    //         path: '/strategyTable',
    //         name: 'strategyTable',
    //         component: () =>
    //             import ('module/makePosition/makePosition.vue'),
    //         meta: { title: '市场地位', keepAlive: true }
    //     },
    //      {
    //         path: '/expansion',
    //         name: 'expansion',
    //         component: () =>
    //             import ('module/expansion/expansion.vue'),
          
    //     },
    //     {
    //         path: '/newproduct',
    //         name: 'newproduct',
    //         component: () =>
    //             import ('module/expansion/newprodut.vue'),
          
    //     },
    //     {
    //         path: '/newproduct2',
    //         name: 'newproduct2',
    //         component: () =>
    //             import ('module/expansion/newproduct2.vue'),
          
    //     },
    //     {
    //         path: '/dataInput',
    //         name: 'dataInput',
    //         component: () =>
    //             import ('module/clientele/dataInput1.vue'),
           
    //     },
    //     {
    //         path: '/customerClustering',
    //         name: 'customerClustering',
    //         component: () =>
    //             import ('module/clientele/customerClustering.vue'),
        
    //     },
    //     {
    //         path: '/retailerLable',
    //         name: 'retailerLable',
    //         component: () =>
    //             import ('module/clientele/retailerLable.vue'),
    //         meta: { title: '零售户标签查询', keepAlive: true }
    //     },
    //     {
    //         path: '/countys',
    //         name: 'countys',
    //         component: () =>
    //             import ('module/clientele/countys.vue'),
           
    //     },
    //     {
    //         path: '/customerAnalysistwo',
    //         name: 'customerAnalysistwo',
    //         component: () =>
    //             import ('module/clientele/customerAnalysis.vue'),
    //     },
    //     {
    //         path: '/dataInput2',
    //         name: 'dataInput2',
    //         component: () =>
    //             import ('module/expansion/dataInput2.vue'),
    //     },
    //     {
    //         path: '/productClustering',
    //         name: 'productClustering',
    //         component: () =>
    //             import ('module/expansion/productClustering.vue'),
    //     }, 
    //     {
    //         path: '/productAnalysis',
    //         name: 'productAnalysis',
    //         component: () =>
    //             import ('module/expansion/productAnalysis.vue'),
    //     },
    //     {
    //         path: '/userManagement',
    //         name: 'userManagement',
    //         component: () =>
    //             import ('module/permissionSettings/UserManagement.vue'),
    //         meta: { title: '用户管理' }
    //     },
    //     {
    //         path: '/roleManagement',
    //         name: 'roleManagement',
    //         component: () =>
    //             import ('module/permissionSettings/RoleManagement.vue'),
    //         meta: { title: '角色管理' }
    //     },
    // ])()
}]

export default [
    ...routerQ
]