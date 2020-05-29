import index from 'module/index' // 主页 

const routerD = [{
    path: '/',
    name: 'index',
    component: index,
    children: (pie => [
        // 问卷管理模块
        {
            path: '/question',
            name: 'question',
            component: () =>
                import('module/questionnaire/question.vue'),
            meta: {
                title: '问题添加'
            }
        },
        {
            path: '/questionDetail',
            name: 'questionDetail',
            component: () =>
                import('module/questionnaire/questionDetail.vue'),
            meta: {
                title: '问卷明细'
            }
        },
        {
            path: '/questionAdd',
            name: 'questionAdd',
            component: () =>
                import('module/questionnaire/questionAdd.vue'),
            meta: {
                title: '问卷添加',
                keepAlive: false
            }
        },
        {
            path: '/crossIcon',
            name: 'crossIcon',
            component: () =>
                import('module/questionnaire/crossIcon.vue'),
            meta: {
                title: '交叉分析'
            }
        },
        {
            path: '/questionStatistics',
            name: 'questionStatistics',
            component: () =>
                import('module/questionnaire/questionStatistics.vue'),
            meta: {
                title: '问卷统计',
                keepAlive: false
            }
        },
        //任务管理模块
        {
            path: '/taskDetailed',
            name: 'taskDetailed',
            component: () =>
                import('module/task/taskDetailed.vue'),
            meta: {
                title: '任务明细'
            }
        },
        {
            path: '/taskAdd',
            name: 'taskAdd',
            component: () =>
                import('module/task/taskAdd.vue'),
            meta: {
                title: '任务添加',
                keepAlive: false
            }
        },
        {
            path: '/taskConfig',
            name: 'taskConfig',
            component: () =>
                import('module/task/taskConfig.vue'),
            meta: {
                title: '任务配置',
                keepAlive: false
            }
        },
        {
            path: '/movement',
            name: 'movement',
            component: () =>
                import('module/task/movement.vue'),
            meta: {
                title: '行动轨迹',
                keepAlive: false
            }
        },
         // 活动管理模块
         {
            path: '/moveAboutDetailed',
            name: 'moveAboutDetailed',
            component: () =>
                import('module/moveAbout/moveAboutDetailed.vue'),
            meta: {
                title: '活动明细'
            }
        },
        {
            path: '/moveAboutAdd',
            name: 'moveAboutAdd',
            component: () =>
                import('module/moveAbout/moveAboutAdd.vue'),
            meta: {
                title: '活动添加',
                keepAlive: false
            }
        },
        // {
        //     path: '/moveAboutConfig',
        //     name: 'moveAboutConfig',
        //     component: () =>
        //         import('module/moveAbout/moveAboutConfig.vue'),
        //     meta: {
        //         title: '活动配置',
        //         keepAlive: false
        //     }
        // },
        {
            path: '/moveAboutCount',
            name: 'moveAboutCount',
            component: () =>
                import('module/moveAbout/moveAboutCount.vue'),
            meta: {
                title: '活动统计',
                keepAlive: false
            }
        },
        {
            path: '/moveAboutSituation',
            name: 'moveAboutSituation',
            component: () =>
                import('module/moveAbout/moveAboutSituation.vue'),
            meta: {
                title: '活动执行情况',
                keepAlive: false
            }
        },
        // 拜访日志
        {
            path: '/callOnDetailed',
            name: 'callOnDetailed',
            component: () =>
                import('module/collOn/callOnDetailed.vue'),
            meta: {
                title: '拜访明细'
            }
        },
        {
            path: '/callOnStatistics',
            name: 'callOnStatistics',
            component: () =>
                import('module/collOn/callOnStatistics.vue'),
            meta: {
                title: '拜访统计',
                keepAlive: false
            }
        },
        {
            path: '/workStatistics',
            name: 'workStatistics',
            component: () =>
                import('module/collOn/workStatistics.vue'),
            meta: {
                title: '工作量统计',
                keepAlive: false
            }
        }
    ])()
}]

export default [
    ...routerD
]