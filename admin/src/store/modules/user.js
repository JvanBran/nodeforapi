import { login } from '@/api'

const state = {
    token: '',
    name: '',
    email:'',
    userId:'',
    mobile:''
}

const getters = {
    avatar: state => state.avatar,
    nickname: state => state.name,
    userInfo: state => state.info,
    email: state => state.email,
    userId: state => state.userId,
    mobile: state => state.mobile,
}

const actions = {
    //登录
    async Login ({ commit }, userInfo) {
        try {
            const Info = await login(userInfo)
            console.log('Info: ', Info);
            commit('SET_TOKEN', '')
            return Info
        } catch (err) {
            return err
        }
        
    },
}
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name ) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_INFO: (state, info) => {
        state.info = info
    },
    SET_EMAIL: (state, email) => {
        state.email = email
    },
    SET_USERID: (state, userId) => {
        state.userId = userId
    },
    SET_MOBILE: (state, mobile) => {
        state.mobile = mobile
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
