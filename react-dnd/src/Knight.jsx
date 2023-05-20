// import React from 'react'

// export default function Knight() {
//   return <span style={{fontSize: '40px'}}>♘</span>
// }

import React from 'react'
import { ItemTypes } from './Constants'
// 可以拖动，拖动预览图片
import { useDrag, DragPreviewImage } from 'react-dnd'
import { knightImage } from './Constants';

function Knight() {

  // 返回三个参数：props，拖动的DOM，拖动预览的DOM
  const [{isDragging}, drag, preview] = useDrag(() => ({
    // 传参：拖动类型
    type: ItemTypes.KNIGHT,
    // 收集函数（把 react-dnd 的 state 传递给当前组件作为 props）
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <>
    {/* 这是预览的图片，需要设置 connect={预览节点} src 是图片路径 */}
      <DragPreviewImage connect={preview} src={knightImage} />
      {/* 这是可以拖动的组件，ref={拖动的DOM} */}
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 40,
          fontWeight: 'bold',
          cursor: 'move',
        }}
      >
        ♘
      </div>
    </>
  )
}

export default Knight