import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import RootRoutes from './modules/root'
import Login from './modules/login'
import Basic from './modules/basic'
import MyPages from './modules/my-pages'
import Form from './modules/form'
import MyComponent from './modules/my-component'
import { HomePath } from '@/config/constants'

export const rootRoutes = RootRoutes

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: HomePath,
  },
  Login,
  Basic,
  MyComponent,
  Form,
  MyPages,
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/my-pages/error/404',
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL as string),
  routes,
})

export default router
