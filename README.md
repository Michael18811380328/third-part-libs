# third party libs

这个仓库用于常用第三方库的示例代码

最好和第三方库的文档匹配

https://michael18811380328.github.io/frontend/site/third-part-lib/000-dir/

### Arco

3.3K

https://github.com/arco-design

https://arco.design/

字节跳动出品的一个 UI 库，和 React Vue 框架可以结合使用;60多个开箱即用的高质量组件, 可以覆盖绝大部分的业务场景。

兼容性问题：项目中同时存在 `antd` 和 `arco-design`，出现样式问题。如果项目中同时使用 `antd` 和 `arco-design`，并且都使用 `less` 的引用方式，那么在编译的时候，`less` 变量会出现相互覆盖的情况。可以使用 `css` 的方式来引入样式，这样就不会有 `less` 变量被覆盖的情况了。最好一个项目中，不要引入多个 UI 组件库。

### vueuse

11.3K

Collection of essential Vue Composition Utilities for Vue 2 and 3,Vue 的工具函数库，具体的工具函数和状态管理，可能将近100个

https://vueuse.org/

### vite

星星 46K 是一个构建工具，支持各种常见框架，类似 webpack 和 rollup，比前者更快

https://vitejs.cn/guide/

### ahooks

星星 10K

传统 Raect Hook 的使用场景优先，所以阿里增加了这个 hooks

A high-quality & reliable React Hooks library

https://github.com/alibaba/hooks

- 易学易用
- 支持 SSR
- 对输入输出函数做了特殊处理，避免闭包问题
- 包含大量提炼自业务的高级 Hooks
- 包含丰富的基础 Hooks
- 使用 TypeScript 构建，提供完整的类型定义文件











## TODO

vite+react 17.x+mobx+antd+ahooks+axios+ts

vite+vue3.x+pinia+arco+vueuse+axios+ts

### mobx

星星 25.6K

https://zh.mobx.js.org/README.html

简单，可扩展的状态管理（类似 redux）支持和 react 框架混合使用

~~~js
import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

class Timer {
  secondsPassed = 0
  constructor() {
    makeAutoObservable(this)
  }
  increaseTimer() {
    this.secondsPassed += 1
  }
}

const myTimer = new Timer()

//被`observer`包裹的函数式组件会被监听在它每一次调用前发生的任何变化
const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

ReactDOM.render(<TimerView timer={myTimer} />, document.body)

setInterval(() => {
  myTimer.increaseTimer()
}, 1000)
~~~

### Pinia 

8.4K 是 VUE 框架的状态管理库

https://pinia.web3doc.top/getting-started.html#%E5%AE%89%E8%A3%85







## 其他常用第三方库

qs
Vconsole
qrcode
react-dnd
react-response
reactstrap
ant-design
flv.js
Animate.css
animejs
lodash
moment
dayjs
mescroll.js
chart.js
g4

