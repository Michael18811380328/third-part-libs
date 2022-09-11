import { createContext, useContext } from 'react';
import appStore from './modules/app';
import userStore from './modules/user';

const store = {
  appStore,
  userStore,
};

// 创建上下文 context，主要用于隔层传值
const StoreContext = createContext(store);

// 使用上下文 context （全部的存储）
export const useStore = () => useContext(StoreContext);

export default store;
