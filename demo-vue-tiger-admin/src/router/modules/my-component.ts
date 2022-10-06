export default {
  path: '/my-component',
  name: 'my-component',
  component: () => import('@/layouts/index.vue'),
  redirect: '/my-component/tinymce',
  meta: {
    requiresAuth: true,
    icon: 'icon-apps',
    title: '组件',
  },
  children: [
    {
      path: '/my-component/tinymce',
      name: 'tinymce',
      component: () => import('@/views/my-component/tinymce/index.vue'),
      meta: {
        title: '富文体',
        icon: 'icon-dashboard',
      },
    },
    {
      path: '/my-component/markdown',
      name: 'markdown',
      component: () => import('@/views/my-component/markdown/index.vue'),
      meta: {
        title: 'Markdown',
        icon: 'icon-file',
      },
    },
    {
      path: '/my-component/codemirror',
      name: 'Codemirror',
      component: () => import('@/views/my-component/codemirror/index.vue'),
      meta: {
        title: 'Codemirror',
        icon: 'icon-file',
      },
    },
  ],
}
