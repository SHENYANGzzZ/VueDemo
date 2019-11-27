import axios from 'axios'
import QS from 'qs'
// import Cookies from 'js-cookie'

/*
  @ 创建自定义axios实例
*/
const api = axios.create({
  baseURL: '',
  headers: {
    'once': '79b8380f47284fcfb121f5c1f81310ee',
    'ts': '138141960',
    'appKey': 'uum',
    'signMethod': 'SHA-256',
    'signData': 'e598634a69e5620bf857af3762df942ef7b5f54da55974fbdf6a888685a0ef5a'
  },
  timeout: 5000
})

/*
  @ request 请求拦截器=>请求发出前处理
*/
api.interceptors.request.use(
  config => {
    // 动态设置请求头
    config.headers.Authorization = window.sessionStorage.getItem('token')

    if (config.method === 'post' || config.method === 'put') {
      // post请求时，序列化入参
      config.data = QS.stringify(config.data)
    }
    return config
  }, error => {
    // 接口返回失败
    console.log(error.response)
    Promise.reject(error.response)
  }
)

/*
  @ request 响应拦截器=>处理响应数据
*/
api.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    // //请求失败，这个地方可以根据error.response.status统一处理一些界面逻辑，比如status为401未登录,可以进行重定向
    // router.replace({
    //     path: '/login',
    //     query: { redirect: router.currentRoute.fullPath }
    //    });
    return Promise.reject(error.response)
  }
)

export default api
