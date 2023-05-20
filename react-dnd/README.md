# 说明

这是 react-dnd 官方demo练习

https://react-dnd.github.io/react-dnd/docs/tutorial#adding-drag-and-drop-interaction

因为 react-dnd 版本更新太快了，这里已经使用了 16.x 版本，其他项目中有的还在用 2.x 版本，或者 8.x 版本，中间隔了 14 个大版本，造成很多文档说明不对应的问题。

所以再次学习一下官方文档，熟悉最新的版本。不要求背过各种 API，要求基本理解原理，熟悉配置，参考文档即可使用。



## 项目说明

### Setup

使用 create-react-app 创建应用，并安装 react-dnd 

### Building the Game

一个国际象棋的案例，可以拖动更改棋子的位置

### Identifying the Components 组件说明

- Knight, our lonely knight piece; 骑士（未来可以被拖拽），不存储任何状态

- Square, a single square on the board; 方块（棋盘的每一个方格，未来可以被释放）只显示背景色是白色还是黑色

- Board, the whole board with 64 squares. 棋盘（有8*8个方格组成）存储放在这部分。真实的象棋中有很多很多棋子，为了案例简单，这里只模拟一个棋子，实现拖动效果。（未来作为拖拽的层）

### Creating the Components 创建静态组件

Knight 是无状态组件（骑士），渲染一个图标

Square 是单元格组件，有前景色和背景色两个状态

Board 是棋盘，渲染一个 8 * 8 的矩阵，然后判断是黑色还是白色，并传递给单元组件，然后对匹配的骑士位置，显示骑士

### Adding Game State

移动象棋，需要增加状态，这里使用 react-redux 的观察者模式处理状态，状态就是当前骑士的位置

这里新加一个状态，使用 observer 进行维护，然后点击单元格，可以切换

1、先创建一个随机数函数，定时生成随机的位置，然后使用 observe 函数，将随机位置直接传递到根组件中（store 传递到界面上），实现单向数据流，非受控情况。

2、单元格增加监听函数，点击单元格时，把当前单元格的位置，作为回调函数传给 dispatch 动作，然后判断位置是否允许，然后 emit 发出，更新全局的状态，棋盘更新。



### Adding Drag-and-Drop Interaction

增加拖放功能的交互（需要了解拖放的基本概念），安装 react-dnd 和 react-dnd-html5-backend

### 重点：Setting up the Drag-and-Drop Context

在顶层组件中，增加一个 dnd 的提供者

~~~js
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// 在需要拖拽的组件外部，使用 DndProvider 包裹，并传参 backend={HTML5Backend}
<DndProvider backend={HTML5Backend}></DndProvider>
~~~

### Define Drag Types

定义拖拽的类型（避免不同拖拽对象互相干扰）

### 重点：Make the Knight Draggable

让骑士对象可以拖拽，先分析一下 hook 函数，用在可以拖动的 DOM 上面

~~~js
const [{ isDragging }, drag] = useDrag(() => ({
  type: ItemTypes.KNIGHT,
  collect: (monitor) => ({
    isDragging: !!monitor.isDragging()
  })
}))
~~~

The useDrag hook accepts a memoization function that returns a specification object. 接受返回规范对象的记忆函数。

useDrag的参数，是一个规范化的函数，返回一个对象，其中包括
- type 拖动的类型（骑士）
- collect 定义了一个收集器函数，就是把 react-dnd 的 State, 转换成子组件骑士的 props，类似 react-redux 的 mapStateToProps 函数

函数的返回值有两个
- props(isDragging) 是收集函数从 react-dnd 收集到的状态，并返回子组件的 props
- ref函数(drag) 将 DOM 和 react-dnd 连接器

~~~js
import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'

function Knight() {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      ♘
    </div>,
  )
}

export default Knight
~~~

### 重点：Make the Board Squares Droppable

让棋盘可以释放

首先把 Board 和 BoardSquare 组件拆分开，Board 是整个棋盘，BoardSquare 是可以拖动的单元格，然后增加可以释放

~~~js
import React from 'react'
import Square from './Square'
import { canMoveKnight, moveKnight } from './Game'
import { ItemTypes } from './Constants'
import { useDrop } from 'react-dnd'

function BoardSquare({ x, y, children }) {
  const black = (x + y) % 2 === 1
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
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
      ref={drop}
    >
      <Square black={black}>{children}</Square>
      {isOver && (
        <div/>
      )}
    </div>
  )
}
~~~

### 重点：Add a Drag Preview Image

增加一个拖动的预览图

增加 DragPreviewImage, useDrag 返回值的第三个参数就是预览的部分

~~~js
import { useDrag, DragPreviewImage } from 'react-dnd'
import { knightImage } from './Constants';

const [{isDragging}, drag, preview] = useDrag(() => ({
  type: ItemTypes.KNIGHT,
  collect: monitor => ({
    isDragging: !!monitor.isDragging(),
  }),
}))

<DragPreviewImage connect={preview} src={knightImage} />

~~~

### Concluding Words 总结

本教程指导您创建React组件，对它们和应用程序状态做出设计决策，最后添加拖放交互。本教程的目的是向您展示React nd与React的理念非常契合，并且在深入实现复杂的交互之前，您应该首先考虑应用程序架构。
