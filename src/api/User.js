// 导入 axios
import axios from 'axios'

// url基础路径，在main.js中配置则此处代码冗余
let base = 'http://127.0.0.1:9090'

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'appKey': '123'
    },
    url: `${base}${url}`,
    transformRequest: [function (data) {
      let ret = ''
      for (let item in data) {
        ret += item
      }
      return ret
    }]
  })
}

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'appKey': '123'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let item in data) {
        // ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        console.log(item)
      }
      return ret
    }]
  })
}

export const putRequest = (url, params) => { }
export const deleteRequest = (url, params) => {
  return axios({
    method: '',
    data: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'appKey': '123'
    },
    url: `${base}${url}`,
    transformRequest: []
  })
}
