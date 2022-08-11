import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const docChildren: RouteRecordRaw[] = [{
  path: 'icon',
  component: () => import('../../doc/icon/index.md')
}, {
  path: 'button',
  component: () => import('../../doc/button/index.md')
}, {
  path: 'input',
  component: () => import('../../doc/input/index.md')
}, {
  path: 'select',
  component: () => import('../../doc/select/index.md')
}, {
  path: 'radio',
  component: () => import('../../doc/radio/index.md')
}, {
  path: 'checkbox',
  component: () => import('../../doc/checkbox/index.md')
}, {
  path: 'switch',
  component: () => import('../../doc/switch/index.md')
}, {
  path: 'time-picker',
  component: () => import('../../doc/time-picker/index.md')
}, {
  path: 'date-picker',
  component: () => import('../../doc/date-picker/index.md')
}, {
  path: 'table',
  component: () => import('../../doc/table/index.md')
}, {
  path: 'drawer',
  component: () => import('../../doc/drawer/index.md')
}, {
  path: 'divider',
  component: () => import('../../doc/divider/index.md')
}, {
  path: 'warning',
  component: () => import('../../doc/warning/index.md')
}, {
  path: 'message',
  component: () => import('../../doc/message/index.md')
}, {
  path: 'dialog',
  component: () => import('../../doc/dialog/index.md')
}, {
  path: 'alert',
  component: () => import('../../doc/alert/index.md')
}, {
  path: 'notification',
  component: () => import('../../doc/notification/index.md')
}, {
  path: 'step',
  component: () => import('../../doc/step/index.md')
}, {
  path: 'cascader',
  component: () => import('../../doc/cascader/index.md')
}, {
  path: 'tabs',
  component: () => import('../../doc/tabs/index.md')
}, {
  path: 'tooltip',
  component: () => import('../../doc/tooltip/index.md')
}, {
  path: 'loading',
  component: () => import('../../doc/loading/index.md')
}, {
  path: 'empty',
  component: () => import('../../doc/empty/index.md')
}, {
  path: 'tree',
  component: () => import('../../doc/tree/index.md')
}, {
  path: 'menus',
  component: () => import('../../doc/menus/index.md')
}, {
  path: 'install',
  component: () => import('../../doc/install.md')
}, {
  path: 'pagination',
  component: () => import('../../doc/pagination/index.md')
}, {
  path: "",
  redirect: "/doc/install"
}]

const routes: RouteRecordRaw[] = [{
  path: '/',
  component: () => import('../views/home.vue')
},{
  path: '/doc',
  component: () => import('../views/component.vue'),
  children: docChildren
}]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router