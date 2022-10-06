// import { db } from '@/utils/db'

// export function useStorage() {
//   return {
//     localSet({ dbName = 'user', path, value, user = true }: any) {
//       db.dbSet({ dbName, path, value, user })
//     },
//     localGet({ dbName = 'user', path, defaultValue = {}, user = true }: any) {
//       return db.dbGet({ dbName, path, defaultValue, user })
//     },
//   }
// }

import { db } from '@/utils/db';

// 使用本地存储作为数据库
export function useStorage() {
  const localSet = function({ dbName = 'user', path, value, user = true }: any) {
    db.dbSet({ dbName, path, value, user });
  }
  const localGet = function({ dbName = 'user', path, defaultValue = {}, user = true }: any) {
    return db.dbGet({ dbName, path, defaultValue, user });
  }
  return {
    localSet,
    localGet,
  };
}
