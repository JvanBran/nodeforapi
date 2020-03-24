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
  console.log(store.getters.token);
  if (store.getters.token) {
    if (to.path === '/user/login') {
      next()
    }else{
      if (store.getters.roles.length === 0) {
          let GetInfo = await store.dispatch('GetInfo')
          console.log('GetInfo: ', GetInfo);
          let GenerateRoutes = await store.dispatch('GenerateRoutes')
          console.log('GenerateRoutes: ', GenerateRoutes);
          // router.addRoutes([])
          next()
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