// 数据库相关工具函数
import { LocalStorage, LowSync } from 'lowdb';
import { chain, cloneDeep } from 'lodash';
import { APP_VERSION, ProjectTitle } from '@/common/constants';

// 这个有一部分语法看不懂
type Data = {
  app: {}
  user: {}
}

const databaseName = 'app';

// db 数据存储，使用 LocalStorage 存储
class DB {
  private db: LowSync<Data> & { chain?: any }

  private key: string = `${ProjectTitle}-${APP_VERSION}`

  constructor() {
    this.db = new LowSync<Data>(new LocalStorage<Data>(this.key))
    this.initialization()
    this.db.chain = chain(this.db.data)
  }

  private initialization() {
    const source = localStorage.getItem(this.key);
    this.db.data = (source && JSON.parse(source)) || { app: {}, user: {} }
    this.db.write()
  }

  // 检查路径是否存在（不存在的话初始化路径）
  pathInit({ dbName = databaseName, path = '', user = true, validator = (k: any) => !!k, defaultValue = {} }): string {
    const username = sessionStorage.getItem(`${ProjectTitle}-username`) || 'rua-guest';
    const currentPath = `${dbName}.${user ? username : 'public'}${path ? `.${path}` : ''}`;
    const value = this.db.chain.get(currentPath).value();

    if (!(value !== undefined && validator(value))) {
      this.db.chain.set(currentPath, defaultValue).value();
      this.db.write();
    }
    return currentPath;
  }

  // 将数据存储到指定位置 | 路径不存在会自动初始化
  // 类似于取值 dbName.path = value
  dbSet({dbName = databaseName, path = '', value = {}, user = false}): void {
    const currentPath = this.pathInit({ dbName, path, user });
    this.db.chain.set(currentPath, value).value();
    this.db.write();
  }

  // 获取数据
  // 类似于取值 dbName.path || defaultValue
  dbGet({ dbName = databaseName, path = '', defaultValue = {}, user = false }): any {
    const values = this.db.chain.get(this.pathInit({dbName, path, user, defaultValue})).value();
    return cloneDeep(values);
  }
}

export const db = new DB();
