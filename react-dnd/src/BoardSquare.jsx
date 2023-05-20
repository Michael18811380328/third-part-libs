import React from 'react'
import Square from './Square'
import { canMoveKnight, moveKnight } from './Game'
import { ItemTypes } from './Constants'

// 可以释放的组件
import { useDrop } from 'react-dnd'

// export default function BoardSquare({ x, y, children }) {
//   const black = (x + y) % 2 === 1
//   return <Square black={black}>{children}</Square>
// }

// 处理拖动的逻辑组件
function BoardSquare({ x, y, children }) {
  const black = (x + y) % 2 === 1

  // useDrop hook 函数，返回了 props 和 dropDOM 节点
  const [{ isOver }, drop] = useDrop(
    () => ({
      // 把 react-dnd 的 State 转换成 子组件的 Props 函数
      accept: ItemTypes.KNIGHT,
      canDrop: () => canMoveKnight(x, y),
      drop: () => moveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    }),
    [x, y]
  )

  return (
    <div
      // 可以释放的组件
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Square black={black}>{children}</Square>
      {/* 经过时显示图片样式 */}
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
    </div>
  )
}

export default BoardSquare
