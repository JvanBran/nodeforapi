import { UserLayout,BasicLayout, PageView , BlankLayout , RouteView } from '@/layouts'
// RouteView
export const constantRouterMap = {
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,
  '403': () => import(/* webpackChunkName: "error" */ '@/views/exception/403'),
  '404': () => import(/* webpackChunkName: "error" */ '@/views/exception/404'),
  '500': () => import(/* webpackChunkName: "error" */ '@/views/exception/500'),

  'fromPath': () =>import('@/views/system/menu'),
  'menuPath': () =>import('@/views/system/menu'),
  'from': () =>import('@/views/authority/form'),
  'from1': () =>import('@/views/authority/form')
}
/**
 * 基础路由
 * @type { *[] }
 */
const asyncRouterMap = [
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [
          {
            path: '/user/login',
            name: 'login',
            component: () => import('@/views/user/Login')
          },
          {
            path: 'register',
            name: 'register',
            component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
          },
          {
            path: 'register-result',
            name: 'registerResult',
            component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
          },
          {
            path: 'recover',
            name: 'recover',
            component: undefined
          }
        ]
    },  
    {
      path: '/404',
      component: () => import('@/views/exception/404')
    },
    {
      path: '*', redirect: '/404', hidden: true
    }
]
export const routers = [
    ...asyncRouterMap
]