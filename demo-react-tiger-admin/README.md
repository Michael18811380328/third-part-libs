# react-tiger-admin

### 1. 背景
 由于 [react-app-rewired](https://github.com/timarney/react-app-rewired)  当时有段时间不更新了，所以更换了 [ ant design](https://ant.design/docs/react/use-with-create-react-app-cn) 推荐的 [craco](https://github.com/gsoft-inc/craco)。但前两者一致的的问题是热更新、编译打包速度过慢。而 [umijs](https://umijs.org/zh-CN) 速度可以，但又引入新的技术栈。那有没有即是熟悉的、速度又是可观的工具呢，这时候 [vite](https://cn.vitejs.dev/guide/) 逐渐进入我的视野。
 此项目就是为了让 `vite` 能够无缝支持 [react](https://reactjs.org/) 的日常开发做的一次尝试和探索。

 `vite`有这么几个特点：

 - 快速的服务启动
 那其它工具启动慢的原因是什么呢，比如 [webpack](https://webpack.js.org/)，它是先进行一次打包过程，然后再启动开发服务器，最终浏览器访问的是打包后的结果。那另外一个问题就是，当时为什么要用这个工具呢？ `webpack` 虽然有很多的功能，而且主打的是 **在前端项目中更高效地管理和维护项目中的每一个资源**，对于开发者来说主要结合 `babel` 解决了让编程语言提前进入下一个标准直接使用用 [ES6+](https://es6.ruanyifeng.com/)的语法开发的便利。
 那 `vite` 快有快在那里，这就说到另外一个浏览器支持的重要技术 [ES Modules](https://segmentfault.com/a/1190000014318751) 的出现，它本身是 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 官方的标准化模块系统，简单说以前大家是引文件，文件里边是函数，函数是变量可访问的边界。函数的好处显而易见，不好也是一目了然：大工程的开发，跨函数变量的访问控制就显得举步维艰。那 `ES Modules` 就出现了，它可以从浏览器底层的角度让开发者能够以更好的方式来组织变量和函数，每个文件都是独立的作用域，变量污染不存在的。那 `vite` 利用这个特性，直接启动开发服务器，请求需要哪个模块再对哪个模块进行实时编译。
 - 快速的热更新
    `vite` 利用 `ES Modules`, 将开发环境下 `ES6+` 模块文件作为浏览器要执行的文件，当浏览器需要某个文件时，对文件对应的开发文件进行编译，分析模块依赖、编译。这种动态的模式，缩短了编译时间，项目越大，优势越明显。当某部分内容变化时，让浏览器直接去重新请求相关文件即可，而不是像 `webpack` 重新将该模块的所有依赖重新编译。其它的对比可以看看这个，[浅谈Vite 原理与 Webpack比较](https://juejin.cn/post/6923417451333959694)
 - 功能比较强大
 提供各种插件，[官方插件](https://cn.vitejs.dev/plugins/)
 - 配置易上手
 配置都是简单明了的，但是随着版本的更新，都有变化，开发时以 [官方文档](https://cn.vitejs.dev/config/) 为准。

 先看一下我们完成的效果

- [react-tiger-admin - Preivew](http://jsfront.gitee.io/react-tiger-admin)
- [react-tiger-admin - Gitee](https://gitee.com/jsfront/react-tiger-admin)

### 2. 相关介绍

#### 2.1 基本介绍
- `react-tiger-admin` 之外还有 [vue2-tiger-admin](https://gitee.com/jikey/vue-tiger-admin)，[vue3-tiger-admin](https://gitee.com/jsfront/vue3-tiger-admin) 正在紧张的赶工中，[angular-tiger-admin](https://gitee.com/jikey/angular-tiger-admin) 本人实在太菜 `ng` 的精髓没有能够短时间内掌握，所以这个还是一个半成品状态。
-  本项目全部由 `vite` 热更新，编译打包发布到 [gitee pages](https://gitee.com/help/articles/4136) 上。

#### 部署Gitee步骤
1. `.gitignore` 中删除dist，可以上传dist目录。
2. 运行 `npm run build` 目录生成 `dist` 目录。
3. `Git` 命令提交。
4. 打开项目主页地址，比如： [react-tiger-admin - Gitee](https://gitee.com/jsfront/react-tiger-admin)。
5. 点击 `Fork` 下面 `管理` 前面 `服务` 菜单，展开的菜单中选择 `Gitee Pages`，这时候第一次需要实名认证才可以进行下一步。
6. 实名认证完成之后就可以进入部署画面了，在 `部署分支` 里边选择分支，在 `部署目录` 里边填写您要部署的分支上的目录，按我们的约定就是 `dist`， 点击按钮提示成功之后点击页面上网站地址即可访问。


#### 2.2 技术栈

技术 | 说明 | 官网
----|----|----
Vite | 下一代前端开发与构建工具 | [https://cn.vitejs.dev/](https://cn.vitejs.dev/)
React | 用于构建用户界面的 JavaScript 库 | [https://reactjs.org/](https://reactjs.org/)
React-router | 官方的路由管理器 | [https://github.com/remix-run/react-router](https://github.com/remix-run/react-router)
Typescript |  类型约束 | [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
Mobx | 全局状态管理模式 | [https://mobx.js.org/](https://mobx.js.org/)
Axios | 基于promise 的HTTP 库 | [https://github.com/axios/axios](https://github.com/axios/axios)
Ant-design | UI组件库 | [https://ant-design.gitee.io/](https://ant-design.gitee.io/)
Ahooks | 一套高质量可靠的 React Hooks 库 | [https://ahooks.js.org/](https://ahooks.js.org/)
Easy-mock-bookset | 简单好用的在线接口 MOCK 平台 | [https://easy-mock.bookset.io/](https://easy-mock.bookset.io/)
Momentjs | JavaScript 日期处理类库 | [http://momentjs.cn/](http://momentjs.cn/)
 LESS | CSS预处理器 | [https://lesscss.org/](https://lesscss.org/)
Tinymce | 可视化HTML编辑器 | [https://www.tiny.cloud/](https://www.tiny.cloud/)
React-icons | 图标字体库  | [https://react-icons.github.io/react-icons/icons](https://react-icons.github.io/react-icons/icons)


#### 2.3 开发工具

系统 | 工具 | 官网
----|----|----
VScode | 主开发工具 | [https://code.visualstudio.com/](https://code.visualstudio.com/)
Webstorm | 辅开发工具 | [https://www.jetbrains.com/webstorm/](https://www.jetbrains.com/webstorm/)
Atom | 源码阅读 | [https://atom.io/](https://atom.io/)
Cmder | Cmd替代工具[windows] | [https://cmder.net/](https://cmder.net/)
Notepad2 | 单文件编辑[windows] | [http://www.flos-freeware.ch/notepad2.html](http://www.flos-freeware.ch/notepad2.html)
Coteditor | 单文件编辑[mac] | [https://coteditor.com/](https://coteditor.com/)
Chrome | 调试工具 | [https://www.google.com/intl/zh-CN/chrome/](https://www.google.com/intl/zh-CN/chrome/)

#### 2.4 文件结构

```javascript
├── LICENSE                // MIT 开源协议
├── dist                   // Gitee 发布依赖目录
├── index.html             // vite 入口目录
├── public                 // 公共资源
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── api                // 请求文件
│   ├── assets             // 静态资源
│   ├── common             // 公共资源
│   ├── components         // 公共组件
│   ├── hooks              // 公共 hooks
│   ├── index.tsx
│   ├── typings            // 公共 interface, type
│   ├── layouts            // 布局
│   ├── pages              // 所有页面
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── router             // 路由文件
│   ├── setupTests.ts
│   ├── store              // mobx 文件
│   ├── styles             // 所有 less 文件
│   └── utils              // 工具文件
├── tsconfig.json
└── vite.config.js
```



Michael AN 整理详细文件结构
```js

// 全局文件
├── App.test.tsx 测试文件
├── App.tsx 应用文件
├── api
│   └── user.ts 用户登录相关 API
├── index.tsx 入口文件
├── react-app-env.d.ts 环境配置文件
├── reportWebVitals.ts 测试性能
├── assets // 静态文件
├── common
│   └── constants.ts // 全局常量；错误信息返回值
├── setupTests.ts // 测试开始文件（引入 jest-dom）


// 图层
├── layouts
│   ├── Content
│   │   ├── index.tsx // APP 内容，主要是不同路由页面和重定向
│   │   └── source.jsx // 点击跳转到源代码的链接（原始仓库链接）
│   ├── Header
│   │   └── index.tsx // 头部组件
│   ├── Sider
│   │   ├── Menu
│   │   │   └── index.tsx // 菜单组件
│   │   └── index.tsx // 侧栏菜单组件
│   └── index.tsx // 把 antd 的 Layout 封装了一层，加上了左侧设置栏

// 路由
├── router
│   ├── index.tsx 整体的路由对象（包括下面的基本页面和我的页面）
│   └── modules
│       ├── basic.ts 基本界面路由功能
│       └── my-pages.ts 我的页面路由
// 存储
├── store
│   ├── index.ts 把存储统一到上下文中（可以获取存储）
│   └── modules
│       ├── app.ts 应用状态管理（整体状态）
│       └── user.ts 用户登录登出状态管理
// 页面
├── pages
│   ├── basic
│   │   ├── dashboard
│   │   │   ├── index.tsx // 仪表盘组件（包括订单等各项数据）
│   │   │   └── order-list.tsx // 订单列表（数据展示成一个表格实现）
│   │   ├── doc // 文档标准页面
│   │   └── qa
│   │       ├── error // 失败标准页面
│   │       └── success // 成功标准页面
│   ├── error
│   │   ├── 404.tsx // 错误页面（点击返回首页）
│   ├── login // 登录界面（输入框，前端加入用户的信息，发送给后端验证等）
│   └── my-pages // 这三个组件实际上是1个组件（重复）实际业务应该会调整组件内部的功能
│       ├── card-list // 就是一个表格渲染行列的数据
│       ├── standard // 同上
│       └── table // 同上

// 自定义 hook
├── hooks
│   └── common
│       └── index.ts // 自定义 hook 从存储中读写值

// 公共组件
├── components
│   ├── BreadCrumb // 面包屑组件（从 store 中获取到 menuList 进行渲染）
│   ├── FullScreen // 全屏组件
│   ├── Hamburger // 汉堡包组件（类似于其他组件的集合 状态维护在 store 中（boolean））
│   ├── Icon // 图标组件（封装了 antd 的默认图标）
│   ├── PageLoading // 页面加载中组件
│   └── index.tsx// 汉堡组件（类似其中子组件，用户组合多个组件）

// 全局样式
├── styles
│   ├── _mixins.less // 通用的样式和类名
│   ├── _variables.less // 定义样式变量（全局字号，行高，背景色）
│   ├── app.less // layout 的样式（布局）
│   ├── common.less // 通用样式
│   ├── global.less // 全局样式（使用自定义样式，覆盖antd样式）
│   └── override.less // 覆盖默认的 antd 的样式

// 类型声明
├── typings 
│   ├── api
│   │   ├── base.d.ts // 权限和当前的用户
│   │   └── user.d.ts // 用户信息
│   ├── global.d.ts // 全局 APP 的声明
│   ├── index.ts // 学生-学期-考试表
│   ├── login.ts // 登录信息
│   └── router.ts // 路由类型

// 工具函数
└── utils
    ├── auth.ts // token 相关工具函数
    ├── db.ts // 数据库相关工具函数 localStorage
    ├── index.ts // 全局相关工具函数
    └── request.ts // 请求相关的 API
```

### 3.  开发步骤
#### 3.1 创建项目
根据 `npx create-react-app my-app --template typescript` 命令创建支持 `typescript` 的项目，并安装依赖，如果是 `yarn` 工具同理。


#### 3.2 创建配置文件
- 根据 `vite` 官网格式，创建 `vite.config.js `，
- 安装 `vite` 支持 `react` 的插件 [@vitejs/plugin-react](https://github.com/vitejs/vite/tree/main/packages/plugin-react)
- `base` 路径配置，主要保证发布二级目录资源能够访问正确。比如，发布到 `http://jsfront.gitee.io/react-tiger-admin` 那这儿的 `base` `development`下是：`./`， `production` 就是 `/react-tiger-admin/`
- define，增加全量 `process.env` 支持，如果不增加，则 `process.env` 不能够被访问
- 增加别名支持 `alias`，从此在 `pages` 下访问资源可以以 `@`开始，比如访问某组件：`@/components/Icon`
```javascript
alias: [
    { find: '@', replacement: path.resolve(__dirname, 'src') },
],
```
- 为 `less` 增加全局变量支持
```javascript
css: {
    preprocessorOptions: {
        less: {
            additionalData: '@import "src/styles/_variables.less";',
            javascriptEnabled: true,
        },
    },
},
```
- 处理跨域问题
可以通过 server 入口来配置，[server.proxy](https://cn.vitejs.dev/config/#server-proxy)

#### 3.3  拷贝 `public` 下 `index.html`到根目录
由于 `vite`的特殊约定，所以不得不手动拷贝此文件，扩展阅读 [index.html 与项目根目录](https://cn.vitejs.dev/guide/#index-html-and-project-root)，如果不执行此操作，则项目页空白，虽然 `vite` 能够启动成功，但页面为空白。

#### 3.4  为 `index.html` 文件增加访问路径
增加可访问的路径入口，比如：
```javascript
<script type="module" src="/src/index.tsx"></script>
```


#### 3.5. 修改 `package.json script`

如下所示
```javascript
"scripts": {
    "start": "vite",
    "build": "vite build",
},
```

到此时，然后增加相关的 `eslint`，`prettierrc` 等等的配置之后，项目就可以完整的运行起来了，看见了熟悉的 `react logo` 心中难免一阵激动，然后随便修改个文件，hmr 秒更新，一句窝草脱口而出。

#### 3.6. 快速启动

```bash
// 切换环境

nvm install 16.0.0
nvm use 16.0.0

// 安装依赖

npm install

// 启动项目

npm start

```

### 4. 旧项目改造
无论之前项目是 [react-scripts](https://github.com/facebook/create-react-app)，还是 `react-app-rewired`， `craco` 都可以用 `vite` 来进行开发，具体的步骤如上 #3.2 - #3.5 所示，带来的不便，所有的错误信息不像以前直接打印在页面上，而是打印在 `Dev Tool` 的控制台中。

### 5.  FAQ

- [ReferenceError: React is not defined](https://stackoverflow.com/questions/70519656/referenceerror-react-is-not-defined-migrating-from-cra-to-vite-and-nx)
需要安装 `@vitejs/plugin-react` 插件，`@vitejs/plugin-react` 与 `@vitejs/plugin-react-resfresh` 冲突，用一个即可
- [Uncaught ReferenceError: process is not defined](https://github.com/vitejs/vite/issues/1973)
由于是 `vite` 不能识别环境变量中类似 `REACT` 的变量，理由是 **为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码。**，如 `REACT_APP_BASE_URL`，必须 `VITE` 开始，如 `VITE_BASE_URL`。扩展学习：[vite 环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)
- vite项目报错：**ReferenceError: require is not defined**
报错原因：require不属于vite里的方法，解决办法 [vite 静态资源处理](https://vitejs.cn/guide/assets.html#new-url-url-import-meta-url)

如果还想找回此文，您可以点右上角 💖Star 💖 收藏 + 支持
