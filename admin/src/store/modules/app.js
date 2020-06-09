const state = {
    layout:'',
    fixedHeader:false,
    sidebar:true,
}
const getters = {
    
}
const actions = {
    setSidebar ({ commit }, type) {
        commit('SET_SIDEBAR_TYPE', type)
    },
}
const mutations = {
    SET_SIDEBAR_TYPE: (state, type) => {
        state.sidebar = type
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
