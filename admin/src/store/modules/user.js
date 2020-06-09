import { login,userInfoRole } from '@/api'

const state = {
    token: '1211212',
    name: '',
    email:'',
    userId:'',
    mobile:'',
    welcome: '',
    avatar: '',
    info: {}
}

const getters = {
    avatar: state => state.avatar,
    nickname: state => state.info.login_name,
    userInfo: state => state.info,
    email: state => state.email,
    userId: state => state.userId,
    mobile: state => state.mobile,
    token: state => state.token
}

const actions = {
    //登录
    async Login ({ commit }, userInfo) {
        try {
            const Info = await login(userInfo)
            console.log('Info: ', Info);
            commit('SET_TOKEN', Info.token)
            commit('SET_INFO',Info.userInfo)
            return Promise.resolve();
        } catch (err) {
            return Promise.reject();
        }
        
    },
    //获取用户权限信息
    async GetInfo ({ commit }) {
        try {
            const Info = await userInfoRole()
            commit('SET_ROLES',Info)
            return Info
        } catch (err) {
            return err
        }
    }
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
