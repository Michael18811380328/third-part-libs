# mobx —— react 的状态管理工具

MobX 是一个身经百战的库，它通过运用透明的函数式响应编程（Transparent Functional Reactive Programming，TFRP）使状态管理变得简单和可扩展。

围绕 React 组件 TimerView 的 observer 包装会自动侦测到依赖于 observable timer.secondsPassed 的渲染——即使这种依赖关系没有被明确定义出来。 响应性系统会负责在未来恰好那个字段被更新的时候将组件重新渲染。

每个事件（onClick 或 setInterval）都会调用一个用来更新 observable 状态 myTimer.secondsPassed 的 action（myTimer.increase 或 myTimer.reset）。Observable 状态的变更会被精确地传送到 TimerView 中所有依赖于它们的计算和副作用里。

https://zh.mobx.js.org/assets/zh.flow.png


## 集成React

https://zh.mobx.js.org/react-integration.html

~~~js
import { observer } from "mobx-react-lite" // Or "mobx-react".

const MyComponent = observer(props => ReactElement)
~~~

observer HOC 将自动订阅 React components 中任何 在渲染期间 被使用的 可被观察的对象 。 因此, 当任何可被观察的对象 变化 发生时候 组件会自动进行重新渲染（re-render）。 它还会确保组件在 没有变化 发生的时候不会进行重新渲染（re-render）。 但是, 更改组件的可观察对象的不可读属性, 也不会触发重新渲染（re-render）。
