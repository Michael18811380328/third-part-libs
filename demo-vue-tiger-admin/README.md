# vue3-tiger-admin

感谢豪情大佬提供的 vue 后台管理项目模板（VUE）

### 项目文件说明（Michael An）

主要练习项目中的 vue 和 ts 结构，其他忽略

不少 Vue 的 API 不太熟悉，全部看懂的话需要一点时间 

```
├── auto-imports.d.ts 全局引入声明文件（全局引入第三方组件）
├── env.d.ts 环境变量接口声明
├── index.html 全局入口HTML
├── package.json 脚本文件
├── tsconfig.json TS 配置文件
├── tsconfig.vite-config.json TS-vite框架配置文件
└── vite.config.js vite配置文件（类似webpack，需要设置入口文件，本地服务器配置等）


├── src
│   ├── App.vue 路由视图（全局路由总接口）
│   ├── api
│   │   └── user.ts 登录、登出、获取用户信息
│   ├── main.ts 引入全局的存储；路由；组件化等

组件
│   ├── components
│   │   ├── BreadCrumb 面包屑组件
│   │   ├── Footer 页脚组件（动态加载古诗）
│   │   ├── FullScreen 全屏组件（点击切换全屏或者半屏）
│   │   ├── Hamburger 汉堡包组件（切换侧栏）
│   │   ├── Icon 图标组件
│   │   ├── TableToolBar 表格工具栏（是否显示搜索框，是否隐藏列等）
│   │   ├── Tinymce
│   │   │   ├── index.vue 富文本编辑器（初始化、更新，对应生命周期函数）
│   │   │   └── settings.ts 富文本编辑器的设置选项
│   │   └── View 卡片视图的容器和页脚

配置
│   ├── config
│   │   ├── constants.ts 全局的常量（服务器的返回值常量）
│   │   └── settings.json 全局的配置（主题色，名称，链接 URL等）

HOOKs
│   ├── hooks
│   │   ├── core
│   │   │   ├── useEditor.ts 富文本编辑器
│   │   │   └── useStorage.ts 从本地数据库中获取或者设置数据（模拟网络请求）
│   │   └── loading.ts 加载函数

样式
│   ├── styles
│   │   ├── _mixins.scss // 混入样式（加入动态变量）
│   │   ├── _variables.scss // 定义常量颜色
│   │   ├── app.scss // 全部样式的组合（common + override + main）
│   │   ├── common.scss // 通用样式
│   │   ├── main.scss // 主要样式
│   │   └── override.scss // 覆盖第三方组件的样式

类型声明
│   ├── types
│   │   └── global.ts 全局类型定义

图层
│   ├── layouts
│   │   ├── Content
│   │   │   ├── index.vue 内容的入口（设置了内容的切换动画效果）
│   │   │   ├── right.vue 右侧栏（表单提交保存）
│   │   │   └── source.vue 点击内容跳转源码
│   │   ├── Header
│   │   │   └── index.vue 头部组件（设置，全局下拉按钮）
│   │   ├── RootSider
│   │   │   └── index.vue 根目录下侧栏（显示全部菜单，点击菜单可以切换路由）
│   │   ├── Settings 设置组件
│   │   │   ├── column.vue 切换列的显示开关
│   │   │   ├── index.vue 设置栏（全局设置和内容设置，点击的回调函数）
│   │   │   └── item.vue 数值输入框
│   │   ├── SiderBar 侧栏组件
│   │   │   ├── index.vue 侧栏及点击后回调函数
│   │   │   └── sub-menu.vue 渲染次级菜单
│   │   ├── TagsView
│   │   │   ├── TagList 标签列表
│   │   │   └── index.vue 标签视图（全部的样式）
│   │   ├── css
│   │   │   └── index.scss 全部图层的样式
│   │   └── index.vue 图层入口文件

视图层
│   └── views
│       ├── basic
│       │   ├── dashboard 信息面板
│       │   ├── doc 文档面板
│       │   └── qa
│       │       ├── error 错误页面
│       │       ├── index.vue 入口页面
│       │       └── success 成功页面
│       ├── form
│       │   ├── base 基本表单
│       │   └── step 渐进式表单
│       ├── login 登录界面（输入，登录验证）
│       ├── my-component 我的组件（三种编辑器）
│       │   ├── codemirror 代码编辑组件（第三方库）
│       │   ├── markdown markdown 编辑组件（第三方库）
│       │   └── tinymce 富文本编辑组件
│       ├── my-pages
│       │   ├── error
│       │   │   ├── 403 没有权限
│       │   │   ├── 404 界面错误
│       │   │   └── index.vue 错误界面入口
│       │   ├── standard 标准界面
│       │   └── table 表格界面
│       └── other
│           └── tpl.vue 模板文件

<!-- 路由部分 -->
│   ├── router
│   │   ├── index.ts 全部路由的集合
│   │   ├── modules 全部的路由模块
│   │   │   ├── basic.ts 基本路由
│   │   │   ├── form.ts 表单路由
│   │   │   ├── login.ts 登录路由
│   │   │   ├── my-component.ts 我的组件路由
│   │   │   ├── my-pages.ts 我的页面路由
│   │   │   └── root.ts 根组件路由
│   │   └── permission.ts 权限检查（在路由前后加入中间件，如果没有登录，那么现实界面未登录，不进入路由界面——django实现权限检查）

<!-- 存储部分 -->
│   ├── store
│   │   ├── index.ts 使用pinia管理存储部分（导入全部的存储）
│   │   └── modules 全部的存储
│   │       ├── app
│   │       │   ├── index.ts 存储触发不同的action
│   │       │   └── types.ts 状态类型声明
│   │       ├── tag
│   │       │   ├── index.ts 存储触发不同的action
│   │       │   └── types.ts 状态类型声明
│   │       └── user
│   │           ├── index.ts 存储触发不同的action
│   │           └── types.ts 状态类型声明

│   ├── utils
│   │   ├── auth.ts 认证登录相关工具函数
│   │   ├── db.ts 数据库工具函数（通过本地数据库存储，模拟网络请求）
│   │   ├── index.ts 其他工具函数（uuid）
│   │   └── request.ts 请求相关工具函数（axios）

```

### 1. 背景

 先看一下我们完成的效果

- [vue3-tiger-admin - Preivew](http://jsfront.gitee.io/vue3-tiger-admin)
- [vue3-tiger-admin - Gitee](https://gitee.com/jsfront/vue3-tiger-admin)

### 2. 相关介绍

#### 2.1 基本介绍
- `vue3-tiger-admin` 之外还有 [react-tiger-admin](https://gitee.com/jsfront/react-tiger-admin)。
-  本项目全部由 `vite` 开发编译打包后 `dist` 目录发布到 [gitee pages](https://gitee.com/help/articles/4136) 上。


#### 2.2 技术栈

技术 | 说明 | 官网
----|----|----
Vite | 下一代前端开发与构建工具 | [https://cn.vitejs.dev/](https://cn.vitejs.dev/)
Vue3 | 渐进式JavaScript 框架 | [https://vuejs.org/](https://vuejs.org/)
Vue-router | 官方的路由管理器 | [https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)
Typescript |  类型约束 | [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
Pinia | 全局状态管理模式 | [https://pinia.vuejs.org/](https://pinia.vuejs.org/)
Axios | 基于promise 的HTTP 库 | [https://github.com/axios/axios](https://github.com/axios/axios)
Arco-Vue | UI组件库 | [https://arco.design/vue/docs/start](https://arco.design/vue/docs/start)
Vueuse | 一套高质量的 Vue Hooks 库 | [https://vueuse.org/](https://vueuse.org/)
Easy-mock-bookset | 简单好用的在线接口 MOCK 平台 | [https://easy-mock.bookset.io/](https://easy-mock.bookset.io/)
Dayjs | JavaScript 日期处理类库 | [https://day.js.org/](https://day.js.org/)
SCSS | CSS预处理器 | [https://sass-lang.com/](https://sass-lang.com/)
Tinymce | 可视化HTML编辑器 | [https://www.tiny.cloud/](https://www.tiny.cloud/)


### 3.  开发步骤

#### 3.1. 插件安装

先安装 `Vscode` 插件

- [Volar - Explore high-performance tooling for Vue](https://github.com/johnsoncodehk/volar)
- [TypeScript Vue Plugin (Volar)](https://github.com/johnsoncodehk/volar/tree/master/extensions/vscode-typescript-vue-plugin)

否则会报很多莫明的错误。

#### 3.2. 快速启动

- node 版本管理工具

    - [nvm](https://github.com/nvm-sh/nvm)
    - [nvm-windows](https://github.com/coreybutler/nvm-windows)

- 备选工具

    - [node 版本管理工具 - n](https://github.com/tj/n)
    - [npm 源管理工具 - nrm](https://github.com/Pana/nrm)

- 教程

    - [使用 nvm 管理不同版本的 node 与 npm](https://www.runoob.com/w3cnote/nvm-manager-node-versions.html)
    - [npm 源管理器 nrm 使用教程](https://segmentfault.com/a/1190000017419993)


```bash
// 切换环境
nvm install 16.0.0
nvm use 16.0.0

// 安装依赖
npm install

// 启动项目
npm start

// 清除 node_modules
npm run clean

// 全局安装 rimraf 之后方可使用
npm i rimraf -g

// 清除 node_modules 重新安装依赖
// 等同于 npm run clean && npm install
npm run reinstall

```
