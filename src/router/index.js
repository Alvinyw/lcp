import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout'

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/page',
      meta: {
        name: '首页',
        icon: ''
      },
      children: [{
        path: '/page',
        name: 'PageIndex',
        component: () => import( /* webpackChunkName: "home" */ '@/views/page/index'),
        meta: {
          name: '页面模版'
        },
      },
      {
        path: '/user',
        name: 'UserManageIndex',
        component: () => import( /* webpackChunkName: "home" */ '@/views/user/index'),
        meta: {
          name: '用户管理'
        },
      },{
        path: '/userAdd',
        name: 'UserAdd',
        component: () => import( /* webpackChunkName: "home" */ '@/views/user/add/index'),
        meta: {
          name: '用户新增'
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
      name: 'editIndex',
      component: () => import( /* webpackChunkName: "edit" */ '@/views/edit/index'),
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