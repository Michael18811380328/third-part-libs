import request from '@/utils/request';

// 登录使用 post
export function fetchLogin(data: any) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

// 获取用户信息使用 get
export async function fetchUserInfo(params: any) {
  return request({
    url: '/user/info',
    method: 'get',
    params,
  })
}
