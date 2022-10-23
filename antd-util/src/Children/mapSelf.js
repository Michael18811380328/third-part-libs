import React from 'react';

// 直接返回这个对象
function mirror(o) {
  return o;
}
// 遍历React节点数组并返回
export default function mapSelf(children) {
  // return React Fragment
  return React.Children.map(children, mirror);
}
// 不太清楚这个组件的功能是什么

// import React from 'react';

// function mirror(o) {
//   return o;
// }

// export default function mapSelf(children) {
//   return React.Children.map(children, mirror);
// }
