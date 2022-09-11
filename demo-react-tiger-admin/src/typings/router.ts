import React from 'react';

// 组件类型
type ComponentType = React.ComponentType<any> & {name: string}

// 路由
export interface IRouterBase {
  path: string
  title?: string
  icon?: string
  name?: string
  key?: string
  exact?: boolean
  meta?: IRouterMeta
  component?: ComponentType
  children?: Array<IRouteBase>
  redirect?: string
  hidden?: boolean
}

export interface IRouterMeta {
  tabFixed?: boolean
  isCache?: boolean
  hidden?: boolean
  name: string
  icon: string
}

export interface IRoute extends IRouteBase {
  children?: Iroute[]
}

// 菜单信息
export interface MenuInfo {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
