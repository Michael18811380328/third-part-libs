// 这是原来的观察着函数，默认返回一个随机的位置
// export function observe(receive) {
//   const randPos = () => Math.floor(Math.random() * 8)
//   setInterval(() => receive([randPos(), randPos()]), 500)
// }

// 只有一个变量，所以这里直接写成全局变量
let knightPosition = [0, 0]
let observer = null

function emitChange() {
  observer(knightPosition)
}

// o 是一个函数，参数是未知，返回值是渲染的根组件，这样就把状态传递到整个组件树上面了
// 这个函数只执行一次，在顶层组件初始化就执行，然后把 observer 函数挂载到全局
// 每次执行 emitChange 就用新的 store，重新顶层更新 root.render(<Board knightPosition={knightPosition} />)
export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.')
  }

  observer = o
  emitChange()
}

export function moveKnight(toX, toY) {
  knightPosition = [toX, toY]
  emitChange()
}

// The last missing piece right now is the Chess rule check. The Knightcan't just move to an arbitrary square, it is only allowed to make L-shaped moves. I'm adding a canMoveKnight(toX, toY)function to the Gameand changing the initial position to B1 to match the Chess rules:
export function canMoveKnight(toX, toY) {
  const [x, y] = knightPosition
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}
