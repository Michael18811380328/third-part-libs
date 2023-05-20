import React from 'react'
import { Counter } from './features/counter/Counter'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* 引入计数器组件 */}
        <Counter />
        <span>learn</span>
      </header>
    </div>
  )
}

export default App
