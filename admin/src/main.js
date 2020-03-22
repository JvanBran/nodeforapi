import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import { post , get } from './util/axios'

Vue.config.productionTip = false

Vue.use(Antd)

Vue.prototype.$post = post
Vue.prototype.$get = get

new Vue({
  router:router,
  store,
  render: h => h(App)
}).$mount('#app')
