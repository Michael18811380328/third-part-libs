declare namespace API {
  export interface PermissionCode<T = string[]> {
    group: string
    action: T
  }
  export interface ResponseResult<T = any> {
    data: T
    code: number
    message: string
  }
  export interface CurrentUser {
    avatar?: string
    username?: string
    title?: string
    group?: string
    nickname?: string
    signature?: string
    tags?: {
      key: string
      label: string
    }[]
    userid?: string
    unreadCount?: string
    // 所有的权限
    permissionCodes?: PermissionCode[]
    // 赋予的权限
    access?: PermissionCode<'*' | string[]>[]
  }
}
