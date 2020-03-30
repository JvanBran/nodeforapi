import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from './router'
import store from '@/store'

Vue.use(VueRouter)

const whiteList = ['login', 'register', 'registerResult']
const RouterConfig = {
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routers,
  scrollBehavior: () => ({ y: 0 }),
}
// hack router push callback
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export const router = new VueRouter(RouterConfig)

router.beforeEach(async (to,from, next)=>{
  if (store.getters.token) {
    if (to.path === '/user/login') {
      next()
    }else{
      if (store.getters.roles.length != 0) {
          await store.dispatch('GetInfo')
          await store.dispatch('GenerateRoutes')
          console.log('111')
          router.addRoutes(store.getters.addRouters)
          const redirect = decodeURIComponent(from.query.redirect || to.path)
          if (to.path === redirect) {
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          } else {
            // 跳转到目的路由
            next({ path: redirect })
          }
      }else{
        next()
      }
    }
  }else{
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
    }
  }
})