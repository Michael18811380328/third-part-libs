import { LocalStorage, LowSync } from 'lowdb'
import { chain, cloneDeep } from 'lodash'
import { APP_VERSION, ProjectTitle } from '@/config/constants'

type Data = {
  app: {}
  user: {}
}

const databaseName = 'app'

/**
 * db 数据存储,采用 LocalStorage存储
 */
class DB {
  private db: LowSync<Data> & { chain?: any }

  private key = `${ProjectTitle}-${APP_VERSION}`

  constructor() {
    this.db = new LowSync<Data>(new LocalStorage<Data>(this.key))
    this.initialization()
    this.db.chain = chain(this.db.data)
  }

  private initialization() {
    const source = localStorage.getItem(this.key)
    this.db.data = (source && JSON.parse(source)) || { app: {}, user: {} }
    this.db.write()
  }

  /**
   * 检查路径是否存在 不存在的话初始化
   * @param param0
   * @returns path
   */
  pathInit({ dbName = databaseName, path = '', user = true, validator = (k: any) => !!k, defaultValue = {} }): string {
    const username = sessionStorage.getItem(`${ProjectTitle}-username`) || 'rua-guest'
    const currentPath = `${dbName}.${user ? username : 'public'}${path ? `.${path}` : ''}`
    const value = this.db.chain.get(currentPath).value()
    if (!(value !== undefined && validator(value))) {
      this.db.chain.set(currentPath, defaultValue).value()
      this.db.write()
    }
    return currentPath
  }

  /**
   * 将数据存储到指定位置 | 路径不存在会自动初始化，效果类似于取值 dbName.path = value
   * @param param0
   */
  dbSet({ dbName = databaseName, path = '', value = {}, user = false }): void {
    const currentPath = this.pathInit({ dbName, path, user })
    this.db.chain.set(currentPath, value).value()
    this.db.write()
  }

  /**
   * 获取数据
   * 效果类似于取值 dbName.path || defaultValue
   * @param param0
   * @returns
   */
  dbGet({ dbName = databaseName, path = '', defaultValue = {}, user = false }): any {
    const values = this.db.chain.get(this.pathInit({ dbName, path, user, defaultValue })).value()
    return cloneDeep(values)
  }
}

export const db = new DB()
