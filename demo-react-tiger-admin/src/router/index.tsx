import { lazy } from 'react';
import { IRoute } from '@/typings/router';
import Basic from './modules/basic';
import MyPages from './modules/my-pages';

// 路由对象（组合了基本页面，我的页面，错误页面）
const router: Array<IRoute> = [
  // { path: '/', redirecTo: '/basic/dashboard' },
  ...Basic,
  ...MyPages,
  {
    path: '/error/404',
    title: '错误',
    name: 'Error',
    key: 'error',
    icon: 'FileUnknownOutlined',
    hidden: true,
    children: [
      {
        title: '404',
        path: '/error/404',
        name: '404',
        icon: 'FileTextOutlined',
        component: lazy(() => import(/* webpackCHunkName: '404' */ '@/pages/error/404')),
      },
    ],
  },
]

export default router;
