import Cookies from 'js-cookie';
import { StoreKey } from '@/common/constants';

// 创建全局的 Tokey 便于更改，避免不同组件的 token 冲突
const TokenKey = StoreKey + '-Token';

// 获取，设置，移除 token
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
