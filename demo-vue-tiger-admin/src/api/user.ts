import request from '@/utils/request'
import type { UserState } from '@/store/modules/user/types'

// 登录接口
export interface LoginData {
  username: string
  password: string
  imgCode: string
}

// 登录的结果
export interface LoginRes {
  token: string
}

// 登录、登出、获取用户信息
export function login(data: LoginData) {
  return request.post<LoginRes>('/user/login', data)
}

export function logout() {
  return request.post<LoginRes>('/user/logout')
}

export function getUserInfo() {
  return request.post<UserState>('/user/info')
}
