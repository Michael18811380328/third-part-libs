import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Knight from './Knight'
// 这里把整体棋盘和可以拖动的一个节点拆分成不同组件
import BoardSquare from './BoardSquare'

// import Square from './Square'
// import { canMoveKnight, moveKnight } from './Game'

// function handleSquareClick(toX, toY) {
//   if (canMoveKnight(toX, toY)) {
//     moveKnight(toX, toY)
//   }
// }

// function renderSquare(i, [knightX, knightY]) {
//   const x = i % 8
//   const y = Math.floor(i / 8)
//   const isKnightHere = x === knightX && y === knightY
//   const black = (x + y) % 2 === 1
//   const piece = isKnightHere ? <Knight /> : null
//   return (
//     <div onClick={() => handleSquareClick(x, y)} key={i} style={{ width: '12.5%', height: '12.5%' }}>
//       <Square black={black}>{piece}</Square>
//     </div>
//   )
// }
function renderSquare(i, knightPosition) {
  const x = i % 8
  const y = Math.floor(i / 8)
  return (
    <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
      <BoardSquare x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  )
}

// 是否渲染骑士
function renderPiece(x, y, [knightX, knightY]) {
  if (x === knightX && y === knightY) {
    return <Knight />
  }
}

export default function Board({ knightPosition }) {
  const squares = []
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition))
  }

  // 在可拖动的根组件中，使用 DndProvider 包裹，并传递 backend={HTML5Backend} 参数
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {squares}
      </div>
    </DndProvider>
  )
}
