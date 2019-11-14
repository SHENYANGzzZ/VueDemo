import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

// axios.interceptors.request.use(config => {
//   console.log(config)
//   return config
// })
axios.defaults.baseURL = 'http://127.0.0.1:8080/'
// Vue.prototyor.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
