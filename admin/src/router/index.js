import Vue from 'vue'
import VueRouter from 'vue-router'

import {routers} from './router'

Vue.use(VueRouter)

const RouterConfig = {
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routers,
  scrollBehavior: () => ({ y: 0 }),
}

export const router = new VueRouter(RouterConfig)
