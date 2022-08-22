import React from "react"
import { TimerView, myTimer } from './timer';

export default function App() {
  return (
    <div className="App">
      {/* 需要把 timer 作为 props 传入组件内部 */}
      <TimerView timer={myTimer} />
    </div>
  );
}
