## 目录结构

~~~
├── examples
│   └── portal.tsx 获取外部 dom 的例子

下面是核心文件，建议抄写3次以上

├── src
│   ├── Children 子节点工具
│   │   ├── mapSelf 复制 React 节点数组的工具
│   │   └── toArray.ts 把 react 节点树转换成数组
│   ├── ContainerRender 容器渲染组（渲染一个类似 Modal-portal 的组件，把某些组件统一放在一个容器中）
│   ├── Dom
│   │   ├── addEventListener 增加事件监听函数（使用reactDOM batch_update 优化的函数）
│   │   ├── canUseDom.ts 是否可以使用 DOM（nodeJS环境不可以）
│   │   ├── class 类名处理（增加，删除，判断是否有类名）
│   │   ├── contains.ts 一个节点是否包括另一个节点（contains）
│   │   ├── css 获取 css 相关工具函数
│   │   ├── findDOMNode.ts 找到DOM节点
│   │   ├── focus 获取元素聚焦的样式
│   │   ├── isVisible.ts 判断某个元素是否可见
│   │   └── support 动画和变换是否支持
│   ├── KeyCode.ts 键盘输入工具函数
│   ├── Portal.tsx 入口门户函数（通过 ref 获取节点的 dom）
├   ├── PureRenderMixin 纯组件渲染的浅对比实现（shouldComponentUpdate实现）
│   ├── deprecated 处理废弃的方法
│   ├── PortalWrapper.tsx 全局函数包装器（记录打开次数等）
│   ├── createChainedFunction 创建链式函数
│   ├── debug
│   │   └── diff 两个变量求 DIFF 
│   ├── guid 生成全局唯一标识符
│   ├── getScrollBarSize 获取滚动条的宽度（尺寸）
│   ├── getContainerRenderMixinx 混入函数（混入不同类型的生命周期函数）
│   ├── hooks
│   │   ├── useEffect.ts 改写 React 官方的 UseEffect 支持传值 callback 回调函数
│   │   ├── useMemo.ts 改写原生 useMemo 函数
│   │   └── useMergedState.ts 合并状态
│   ├── pickAttrs.ts 获取属性
│   ├── raf.ts requestAnimationFrame 动画函数处理
│   ├── ref.ts 获取 ref 的工具函数
│   ├── switchScrollingEffect 切换滚动效果
│   ├── setStyle.ts 设置样式
│   ├── test
│   │   └── domHook.ts dom操作hook
│   ├── unsafeLifecyclesPolyfill 处理废弃的 componentWillReceiveProps 生命周期函数
│   ├── utils
│   │   ├── get.ts 获取属性
│   │   └── set.ts 递归设置全部的属性
│   ├── warn 原生console函数的改写（适合node环境）
│   └── warning.ts 控制台警告函数的改写
~~~
