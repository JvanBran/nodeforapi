import Vue from 'vue'
import App from '@/App.vue'
import { router } from '@/router'
import store from '@/store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './components/global.less'


Vue.config.productionTip = false

Vue.use(Antd)


new Vue({
  router:router,
  store,
  render: h => h(App)
}).$mount('#app')
