import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

import app from './modules/app'
import user from './modules/user'
import asyncRouter from './modules/async-router'

export default new Vuex.Store({
  modules: {
    app,
    user,
    asyncRouter
  },
  plugins: [createPersistedState({
    storage: window.localStorage,
    key:'admin'
  })]
})
