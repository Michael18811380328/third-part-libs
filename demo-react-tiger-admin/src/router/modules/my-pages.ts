import loadable from '@loadable/component';

// 我的页面（查询，表格，卡片）
export default [
  {
    page: '/my-pages',
    title: '列表',
    icon: 'TableOutlined',
    component: loadable(() => import('@/layouts/index')),
    children: [
      {
        title: '查询表格',
        icon: 'FileTextOutlined',
        path: '/my-pages/table',
        component: loadable(() => import(/* webpackChunkName: 'basic-table' */ '@/pages/my-pages/table')),
      },
      {
        title: '标准表格',
        icon: 'FileTextOutlined',
        path: '/my-pages/standard',
        component: loadable(() => import(/* webpackChunkName: 'standard-table' */ '@/pages/my-pages/standard')),
      },
      {
        title: '卡片列表',
        icon: 'FileTextOutlined',
        path: '/my-pages/card-list',
        component: loadable(() => import(/* webpackChunkName: 'card-list-table' */ '@/pages/my-pages/card-list')),
      },
    ],
  }
]