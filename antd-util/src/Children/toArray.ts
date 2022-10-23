import React from 'react';
import { isFragment } from 'react-is';

// 选项接口
export interface Option {
  keepEmpty?: boolean;
}
/**
 * 把 react 节点树转换成数组
 * @param children react 节点树
 * @param option 选项对象，是否保留空节点
 * @returns 数组形式的子节点
 */
export default function toArray(
  children: React.ReactNode,
  option: Option = {},
): React.ReactElement[] {
  let ret: React.ReactElement[] = [];
  React.Children.forEach(children, (child: any) => {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }
    // 如果子节点是数组，那么递归转换成数组
    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    }
    // 如果子节点是片段，并且有 props，那么转换 props.children
    // 基本是树的 DFS 遍历思路
    else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    }
    // 否则直接将这个节点放在返回值中
    else {
      ret.push(child);
    }
  });
  return ret;
}

// import React from 'react';
// import { isFragment } from 'react-is';
// import { resourceLimits } from 'worker_threads';

// export interface Option {
//   keepEmpty?: boolean;
// }

// export default function toArray(
//   children: React.ReactNode,
//   option: Option = {},
// ): React.ReactElement[] {
//   let result: React.ReactElement[] = [];
//   React.Children.forEach(children, (child: any) => {
//     if ((child === undefined || child === null) && !option.keepEmpty) {
//       return;
//     }
//     if (Array.isArray(child)) {
//       result = result.concat(toArrat(child));
//     }
//     else if (isFragment(child) && child.props) {
//       result = result.concat(toArray(child.props.children, option));
//     }
//     else {
//       result.push(child);
//     }
//   });
//   return result;
// }
