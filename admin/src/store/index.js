import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

import app from './modules/app'
import user from './modules/user'
import asyncRouter from './modules/async-router'
import permission from './modules/permission'

export default new Vuex.Store({
  modules: {
    app,
    user,
    asyncRouter,
    permission
  },
  plugins: [createPersistedState({
    storage: window.localStorage,
    key:'admin',
    reducer(val){
      return {
        app:val.app,
        user:val.user
      }
    }
  })]
})
