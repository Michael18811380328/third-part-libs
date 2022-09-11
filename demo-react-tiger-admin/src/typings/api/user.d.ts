declare namespace API {
  // 用户信息
  export interface UserInfo {
    id: string
    username: string
    nickname: string
    mobile: string
    email?: string
    remark?: string
    createTime: number
    updateTime: number
  }
}
