import { action, makeObservable, observable } from 'mobx';
import { fetchLogin, fetchUserInfo } from '@/api/user';
import { setToken } from '@/utils/auth';
import { StoreKey } from '@/common/constants';
import { useStorage } from '@/hooks/common';

class User {

  constructor() {
    makeObservable(this);
  }

  @observable menus = [];

  // 登录（成功后存储到 token 中）
  @action login = async (data: any) => {
    try {
      const response: any = await fetchLogin(data);
      const { token } = response;
      setToken(token);
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // 获取用户信息
  @action getInfo = async (data?: any) => {
    try {
      const storage = useStorage();
      const user: any = await fetchUserInfo(data);
      storage.set({
        path: 'info',
        value: user,
      });
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // 用户登出
  @action logout = () => {
    localStorage.removeItem(StoreKey);
  }

}

export default new User();
