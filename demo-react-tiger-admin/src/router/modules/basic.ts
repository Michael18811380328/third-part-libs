import { IRoute } from '@/typings/router';
import loadable from '@loadable/component';

// 基本界面路由
const Basic: Array<IRoute> = [
  {
    path: '/basic',
    title: '基础',
    name: 'bacis',
    exact: true,
    icon: 'HomeOutlined',
    component: loadable(() => import('@/layouts/index')),
    redirect: '/basic/dashboard',
    children: [
      {
        path: '/bacic/dashboard',
        title: '公告板',
        icon: 'DashboardOutlined',
        component: loadable(() => import(/* webpackChunkName: 'dashboard' */ '@/pages/basic/dashboard')),
      },
      {
        path: '/bacic/doc',
        title: '文档',
        icon: 'FileWordOutlined',
        component: loadable(() => import(/* webpackChunkName: 'doc' */ '@/pages/basic/doc')),
      },
      {
        path: '/bacic/qa',
        title: '反馈界面',
        icon: 'MessageOutlined',
        children: [
          {
            path: '/basic/qa/success',
            title: '操作成功',
            icon: 'FileTextOutlined',
            component: loadable(() => import(/* webpackChunkName: 'success' */ '@/pages/basic/qa/success')),
          },
          {
            path: '/basic/qa/error',
            title: '操作失败',
            icon: 'FileTextOutlined',
            component: loadable(() => import(/* webpackChunkName: 'error' */ '@/pages/basic/qa/error')),
          }
        ]
      },
    ],
  }
]

export default Basic;