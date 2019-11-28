import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import './assets/css/global.css'

Vue.config.productionTip = false

// 配置全局的axios拦截请求，在请求头中加入Authorization
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    // 组件之间通信的第三方Vue实例
    bus: new Vue()
  }
}).$mount('#app')
