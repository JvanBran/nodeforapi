import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

import user from './modules/user'

export default new Vuex.Store({
  modules: {
    user,
  },
  plugins: [createPersistedState({
    storage: window.localStorage,
    key:'admin'
  })]
})
