// 导入 axios
import axios from 'axios'

// url基础路径
let base = 'http://127.0.0.1:9090'

export const getRequest = (url, params) => {
}

export const postRequest = (url, params) => {
  return axios({
    method: '',
    url: `${base}${url}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let result = ''

      return result
    }]
  })
}

export const putRequest = (url, params) => {
}

export const deleteRequest = (url, params) => {
}
