/**
 * 向后端请求用户的菜单，动态生成路由
 */
// import { router } from '@/router'
import { getCurrentUserNav } from '@/api'
// import { listToTree,generator,notFoundRouter } from '@/util/util'
const state = {
    routers: [],
    addRouters: []
}
const getters = {
}
const actions = {
    async GenerateRoutes ({ commit }) {
        let info = await getCurrentUserNav()
        
        // const menuNav = []
        // const childrenNav = []
        // const { result } = info
        // listToTree(result, childrenNav, 0)
        // console.log(menuNav)
        // console.log(childrenNav)
        // rootRouter.children = childrenNav
        // menuNav.push(rootRouter)
        // console.log('menuNav', menuNav)
        // const routers = generator(menuNav)
        // routers.push(notFoundRouter)
        // console.log('routers', routers)
        // console.log('result: ', result);
        commit('SET_ROUTERS',[])
        return info
    }
}
const mutations = {
    SET_ROUTERS: (state, routers) => {
        state.addRouters = routers
        //state.routers = constantRouterMap.concat(routers)
      }
}

export default {
    state,
    getters,
    actions,
    mutations
}
