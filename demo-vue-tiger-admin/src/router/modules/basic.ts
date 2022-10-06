export default {
  path: '/basic',
  name: 'basic',
  component: () => import('@/layouts/index.vue'),
  redirect: '/basic/dashboard',
  meta: {
    requiresAuth: true,
    title: '基础',
    icon: 'icon-home',
  },
  children: [
    {
      path: '/basic/dashboard',
      name: 'dashboard',
      component: () => import('@/views/basic/dashboard/index.vue'),
      meta: {
        title: '公告板',
        icon: 'icon-dashboard',
      },
    },
    {
      path: '/basic/doc',
      name: 'doc',
      component: () => import('@/views/basic/doc/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin'],
        title: '文档',
        icon: 'icon-file',
      },
    },
    {
      path: '/basic/qa',
      name: 'qa',
      meta: {
        title: '反馈页面',
        icon: 'icon-question-circle',
      },
      redirect: '/basic/qa/help',
      component: () => import('@/views/basic/qa/index.vue'),
      children: [
        {
          path: '/basic/qa/help',
          name: 'help-success',
          meta: {
            title: '操作成功',
            icon: 'icon-file',
          },
          redirect: '/basic/qa/help/success',
          component: () => import('@/views/basic/qa/success/index.vue'),
          children: [
            {
              path: '/basic/qa/help/success',
              name: 'successIndex',
              meta: {
                title: '深度菜单',
                icon: 'icon-file',
              },
              redirect: '/basic/qa/help/success/ok',
              component: () => import('@/views/basic/qa/success/index.vue'),
              children: [
                {
                  path: '/basic/qa/help/success/ok',
                  name: 'sssOkIndex',
                  meta: {
                    title: '再次成功',
                    icon: 'icon-file',
                  },
                  component: () => import('@/views/basic/qa/success/index.vue'),
                },
                {
                  path: '/basic/qa/help/success/no',
                  name: 'sssErrorIndex',
                  meta: {
                    title: '再次失败',
                    icon: 'icon-file',
                  },
                  component: () => import('@/views/basic/qa/error/index.vue'),
                },
              ],
            },
            {
              path: '/basic/qa/help/error',
              name: 'errorIndex',
              meta: {
                title: '深度菜单',
                icon: 'icon-file',
              },
              component: () => import('@/views/basic/qa/error/index.vue'),
            },
          ],
        },
        {
          path: '/basic/qa/error',
          name: 'error',
          meta: {
            title: '操作失败',
            icon: 'icon-file',
          },
          component: () => import('@/views/basic/qa/error/index.vue'),
        },
      ],
    },
  ],
}
