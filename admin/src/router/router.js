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

  'rolePath': () =>import('@/views/system/menu'),
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
        path: '/',
        name: 'index',
        component: BasicLayout,
        redirect: '/system',
        meta: { title: '首页' },
        children: [
            {
              name:'system',
              path:'system',
              component:PageView,
              meta:{
                title:'系统管理'
              },
              redirect: '/system/list',
              children:[
                {
                  name:'list',
                  path:'list',
                  meta:{
                    title:'管理菜单'
                  },
                  component: () => import('@/views/system/menu')
                }
              ]
            }
        ]
    },
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
      path: '*',
      component: () => import('@/views/exception/404')
    }
]
export const routers = [
    ...asyncRouterMap
]