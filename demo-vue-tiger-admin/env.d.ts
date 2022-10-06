// / <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  tinymce: any
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@kangc/v-md-editor'
declare module '@kangc/v-md-editor/lib/preview-html'
declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
