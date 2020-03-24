import { UserLayout,BasicLayout,RouteView, PageView } from '@/layouts'
/**
 * 基础路由
 * @type { *[] }
 */
const asyncRouterMap = [
    {
      path: '/',
      name: 'index',
      component: BasicLayout,
      meta: { title: '首页' },
      redirect: '/system',
      children: [
        {
          path: '/system',
          name: 'system',
          component: RouteView,
          redirect: '/system/menu',
          meta: { title: '系统管理', icon:'database', keepAlive: true },
          children: [
                {
                  path: 'menu',
                  name: 'menu',
                  component: () => import('@/views/system/menu'),
                  meta: { title: '菜单编辑管理', keepAlive: true }
                },
                {
                  path: 'menu1',
                  name: 'menu1',
                  component: () => import('@/views/system/menu'),
                  meta: { title: '菜单权限配置', keepAlive: true }
                }
          ]
        },
        {
          path: '/authority',
          name: 'authority',
          component: PageView,
          redirect: '/authority/from',
          meta: { title: '权限编辑', icon:'form', keepAlive: true },
          children: [
                {
                  path: 'from',
                  name: 'from',
                  component: () => import('@/views/authority/from'),
                  meta: { title: '用户权限编辑', keepAlive: true }
                },
                {
                  path: 'from1',
                  name: 'from1',
                  component: () => import('@/views/authority/from'),
                  meta: { title: '角色权限编辑', keepAlive: true }
                }
          ]
        },
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
      path: '/404',
      component: () => import('@/views/exception/404')
    }
]
export const routers = [
    ...asyncRouterMap
]