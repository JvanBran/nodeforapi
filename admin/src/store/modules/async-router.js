/**
 * 向后端请求用户的菜单，动态生成路由
 */

import { getCurrentUserNav } from '@/api'
import { routers } from '@/router/router'
import { listToTree , generator} from '@/util/util'
const state = {
    localrouters: routers,
    addRouters: []
}
const getters = {
    addRouters: state => state.addRouters,
}
const rootRouter = {
    key: '',
    name: 'index',
    path: '/',
    component: 'BasicLayout',
    redirect: '/system',
    meta: {
      title: '首页'
    },
    children: []
  }

const actions = {
    async GenerateRoutes ({ commit }) {
        let info = await getCurrentUserNav()
        const menuNav = []
        const childrenNav = []
        listToTree(info, childrenNav, 0)
        rootRouter.children = childrenNav
        menuNav.push(rootRouter)
        console.log('menuNav', menuNav)
        const routers = generator(menuNav)
        commit('SET_ROUTERS',routers)
        return info
    }
}
const mutations = {
    SET_ROUTERS: (state, routerArr) => {
        state.addRouters = routerArr;
        state.localrouters =  routers.concat(routerArr)
      }
}

export default {
    state,
    getters,
    actions,
    mutations
}
