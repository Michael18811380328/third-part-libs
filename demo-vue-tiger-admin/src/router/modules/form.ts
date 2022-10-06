export default {
  path: '/form',
  name: 'form',
  component: () => import('@/layouts/index.vue'),
  redirect: '/form/base',
  meta: {
    requiresAuth: true,
    icon: 'icon-find-replace',
    title: '表单',
  },
  children: [
    {
      path: '/form/base',
      name: 'form-base',
      component: () => import('@/views/form/base/index.vue'),
      meta: {
        title: '基础表单',
        icon: 'icon-dashboard',
      },
    },
    {
      path: '/form/step',
      name: 'form-step',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        title: '分步表单',
        icon: 'icon-file',
      },
    },
  ],
}
