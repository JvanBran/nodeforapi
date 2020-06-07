const state = {
    roles:[]
}
const getters = {
    roles: state => state.roles,
}
const actions = {
}
const mutations = {
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
