const Layout = () => import('@/layouts/index.vue')

export default {
  path: '/my-pages',
  name: 'my-pages',
  component: Layout,
  redirect: '/my-pages/table',
  meta: {
    requiresAuth: true,
    icon: 'icon-drive-file',
    title: '页面',
  },
  children: [
    {
      path: '/my-pages/table',
      name: 'table',
      component: () => import('@/views/my-pages/table/index.vue'),
      meta: {
        title: '查询表格',
        icon: 'icon-dashboard',
      },
    },
    {
      path: '/my-pages/standard',
      name: 'standard',
      component: () => import('@/views/my-pages/standard/index.vue'),
      meta: {
        title: '标准表格',
        icon: 'icon-file',
      },
    },
    {
      path: '/my-pages/error',
      name: 'error',
      meta: {
        title: '错误页面',
        icon: 'icon-close-circle',
      },
      redirect: '/my-pages/error/404',
      component: () => import('@/views/my-pages/error/index.vue'),
      children: [
        {
          path: '/my-pages/error/404',
          name: '404',
          component: () => import('@/views/my-pages/error/404/index.vue'),
          meta: {
            title: '404',
            icon: 'icon-file',
          },
        },
        {
          path: '/my-pages/error/403',
          name: '403',
          component: () => import('@/views/my-pages/error/403/index.vue'),
          meta: {
            title: '403',
            icon: 'icon-file',
          },
        },
      ],
    },
  ],
}
