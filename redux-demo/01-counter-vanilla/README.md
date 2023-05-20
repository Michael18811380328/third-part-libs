# Redux Counter Vanilla Example

Redux 最基本的案例(计数器，实现加减)，直接运行 index.html 即可，不需要 webpack 打包工具和其他框架。

## 基本实现

1、创建 action 更新函数 counter（不同 action 对 State 的更新）

2、创建 store = Redux.createStore(counter);

3、界面 DOM 从 store 渲染函数 dom = store.getState().toString()

4、首次渲染 render

5、渲染函数监听 store.subscribe(render)

6、用户点击事件，触发 action store.dispatch({ type: 'ADDITION' })
