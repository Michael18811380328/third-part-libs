import React from "react"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

// 维护状态
class Timer {
  // 初始值为0
  secondsPassed = 0

  // 构造器中自动监听（观察者）
  constructor() {
    makeAutoObservable(this)
  }

  /**
   * 定时器增加1（这个相当于 reducer）
   */
  increaseTimer() {
    this.secondsPassed += 1
  }

  /**
   * 重置定时器
   */
  resetTimer() {
    this.secondsPassed = 0;
  }
}

// 需要实例化类
const myTimer = new Timer();

// 被`observer`包裹的函数式组件会被监听在它每一次调用前发生的任何变化
// observer 高阶函数，接受一个函数，函数的参数是 timer，函数返回了视图层
const TimerView = observer(
  ({ timer }) => {
    // 直接可以从 timer 中获取属性和方法（一个属性对应一个timer）
    return (
      <div>
        <span>Seconds passed: {timer.secondsPassed}</span>
        <br/>
        <button onClick={() => timer.resetTimer()}>清空定时器</button>
      </div>
    );
  }
);

// 这里触发数据变化
setInterval(() => {
  myTimer.increaseTimer()
}, 1000)

export { TimerView, myTimer };
