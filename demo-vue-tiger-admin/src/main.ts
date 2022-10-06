import { createApp } from 'vue'
// UI 组件库
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html'

// 引入使用主题的样式
import '@kangc/v-md-editor/lib/style/preview-html.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/permission'

import '@arco-design/web-vue/dist/arco.css'
import '@/styles/app.scss'
import 'animate.css'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// 创建应用（配置图标、路由、存储等）
const app = createApp(App)

app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(router)
app.use(store)
app.use(VMdPreviewHtml)

app.mount('#app')
