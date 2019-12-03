import request from '../utils/request'

// 应急管理部 uum 政务人员维护 uri
const uri = '/ums/service/V1/res/users'

// 获取人员展示列表
export function getRequest (params) {
  return request({
    url: uri,
    method: 'get',
    params: params
  })
}

// 新增人员
export function postRequest (params) {
  return request({
    url: uri,
    method: 'post',
    data: params
  })
}

// 删除
export function deleteRequest (params) {
  return request({
    url: uri,
    method: 'delete',
    params: params
  })
}

// 修改
export function putRequest (params) {
  return request({
    url: uri,
    method: 'put',
    data: params
  })
}
