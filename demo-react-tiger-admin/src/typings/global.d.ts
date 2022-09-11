/* eslint-disable no-undef */
declare module '@loadable/component'

// 约定式组件？这是什么意思
declare namespace APP {
  export interface RouteFC<T = any> extends React.FC<T> {
    menu?: {
      name: string
      icon?: React.ReactNode
    }
    layout?: boolean | {}
  }
}
