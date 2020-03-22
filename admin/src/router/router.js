import { UserLayout } from '@/layouts'
const constantRouterMap = []
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
      }
]
export const routers = [
    ...constantRouterMap,
    ...asyncRouterMap
]