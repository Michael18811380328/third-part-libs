// import type { AxiosRequestConfig } from 'axios'

// export interface AnyObject {
//   [key: string]: unknown
// }

// export interface Options {
//   value: unknown
//   label: string
// }

// export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
//   hideLoading?: boolean
// }

// 全局类型定义
import type { AxiosRequestConfig } from 'axios';

export interface AnyObject {
  [key: string]: unknown
}

export interface Options {
  value: unknown,
  label: string,
}

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideLoading: boolean
}

