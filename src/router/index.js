import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout'

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path:'/login',
      name:'Login',
      component: ()=> import(/*webpackChunkName: "login*/ '@/views/login/index'),
    },
    {
      path: '/',
      component: layout,
      redirect: '/template',
      meta: {
        name: '首页',
        icon: ''
      },
      children: [{
        path: '/template',
        name: 'TemplateIndex',
        component: () => import( /* webpackChunkName: "main" */ '@/views/template/index'),
        meta: {
          name: '页面模版'
        },
      },
      {
        path: '/OperationRecord',
        name: 'OperationRecord',
        component: () => import( /* webpackChunkName: "main" */ '@/views/operationRecord/index'),
        meta: {
          name: '操作记录查询'
        },
      },
      {
        path: '/user',
        name: 'UserManageIndex',
        component: () => import( /* webpackChunkName: "main" */ '@/views/user/index'),
        meta: {
          name: '用户管理'
        },
      },{
        path: '/userAdd',
        name: 'UserAdd',
        component: () => import( /* webpackChunkName: "main" */ '@/views/user/add/index'),
        meta: {
          name: '用户新增'
        },
      },{
        path: '/userEdit',
        name: 'UserEdit',
        component: () => import( /* webpackChunkName: "main" */ '@/views/user/edit/index'),
        meta: {
          name: '用户信息更新'
        },
      },{
        path: '/updatePsw',
        name: 'UpdatePsw',
        component: () => import( /* webpackChunkName: "main" */ '@/views/updatePsw/index'),
        meta: {
          name: '修改密码'
        },
      },
      {
        path: '/channel',
        name: 'ChannelManage',
        component: () => import( /* webpackChunkName: "main" */ '@/views/channel/index'),
        meta: {
          name: '渠道管理'
        },
      },
      {
        path: '/channelAdd',
        name: 'ChannelAdd',
        component: () => import( /* webpackChunkName: "main" */ '@/views/channel/add/index'),
        meta: {
          name: '渠道新增'
        },
      },
      {
        path: '/channelEdit',
        name: 'ChannelEdit',
        component: () => import( /* webpackChunkName: "main" */ '@/views/channel/edit/index'),
        meta: {
          name: '渠道编辑'
        },
      },
      {
        path: '/system',
        name: 'SystemManage',
        component: () => import( /* webpackChunkName: "main" */ '@/views/system/index'),
        meta: {
          name: '系统管理'
        },
      },
      {
        path: '/systemAdd',
        name: 'SystemAdd',
        component: () => import( /* webpackChunkName: "main" */ '@/views/system/add/index'),
        meta: {
          name: '系统新增'
        },
      },
      {
        path: '/systemEdit',
        name: 'SystemEdit',
        component: () => import( /* webpackChunkName: "main" */ '@/views/system/edit/index'),
        meta: {
          name: '系统编辑'
        },
      },
      {
        path: '/page',
        name: 'PageManage',
        component: () => import( /* webpackChunkName: "main" */ '@/views/page/index'),
        meta: {
          name: '页面管理'
        },
      },
      {
        path: '/pageAdd',
        name: 'PageAdd',
        component: () => import( /* webpackChunkName: "main" */ '@/views/page/add/index'),
        meta: {
          name: '页面新增'
        },
      },
      {
        path: '/pageEdit',
        name: 'PageEdit',
        component: () => import( /* webpackChunkName: "main" */ '@/views/page/edit/index'),
        meta: {
          name: '页面编辑'
        },
      }]
    },

    {
      path: '/preview',
      name: 'previewIndex',
      component: () => import( /* webpackChunkName: "preview" */ '@/views/preview/index'),
    },

    {
      path: '/edit',
      name: 'TemplateEdit',
      component: () => import( /* webpackChunkName: "edit" */ '@/views/template/edit/index'),
    },

    // 成功
    {
      path: '/success',
      name: 'successIndex',
      component: () => import( /* webpackChunkName: "success" */ '@/views/success'),
    },

    // 失败
    {
      path: '/failure',
      name: 'failureIndex',
      component: () => import( /* webpackChunkName: "failure" */ '@/views/failure'),
    },

    // 缺省页面
    {
      path: '/default',
      name: 'defaultIndex',
      component: () => import( /* webpackChunkName: "home" */ '@/views/default'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import( /* webpackChunkName: "home" */ '@/views/notFound'),
    },
    {
      path: '*',
      name: 'notFound',
      redirect: {
        name: '404',
      },
    },
  ],
})

export default router