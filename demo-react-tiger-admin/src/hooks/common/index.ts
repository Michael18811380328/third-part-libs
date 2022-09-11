// 自定义 hook
import { db } from '@/utils/db';

const name = 'user';
// 从数据库中读写值
export function useStorage() {
  return {
    set({ dbName = name, path, value, user = true}: any) {
      db.dbSet({ dbName, path, value, user });
    },
    get({ dbName = name, path, defaultValue = {}, user = true}: any) {
      return db.dbGet({ dbName, path, defaultValue, user });
    }
  }
}
