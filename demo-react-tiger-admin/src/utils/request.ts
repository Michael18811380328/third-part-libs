// request 请求相关 API
import axios, { AxiosRequestConfig } from 'axios';
import { message, notification } from 'antd';
import { getToken } from './auth';

export interface Response<T> {
  code: number;
  data: T;
  message: string;
}

// 暴露一个 axios 的实例
export const axiosInstance = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 5000,
});

// 请求参数使用中间件（参数是两个函数，一个是配置中间件，一个是错误）
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers!.token = token;
    }
    return config;
  },
  (err) => {
    console.error('error', err);
    message.error('网络错误');
    return Promise.reject(err);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data && data.code !== 0) {
      notification.error({
        message: data.message,
      });
      return Promise.reject(new Error(data.message || 'Error'));
    }
    return Promise.resolve(data);
  },
  (error) => {
    console.error('error', error);
    return Promise.reject(error);
  },
);

export default function request<T = any>(config: AxiosRequestConfig): Promise<Response<T>> {
  return new Promise((resolve, reject) => {
    axiosInstance.request(config).then((res) => {
      resolve(res.data);
    }).catch((error) => {
      reject(error);
    });
  });
}
