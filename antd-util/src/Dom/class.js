// 类名判断工具函数
// export function hasClass(node, className) {
//   if (node.classList) {
//     return node.classList.contains(className);
//   }
//   const originClass = node.className;
//   return ` ${originClass} `.indexOf(` ${className} `) > -1;
// }

export function hasClass(node, className) {
  if (node.classList) {
    return node.classList.contains(className);
  }
  // 这里处理兼容性问题（没有 classList 属性的情况）
  const originClass = node.className;
  return ` ${originClass} `.indexOf(` ${className} `) > -1;
}

// export function addClass(node, className) {
//   if (node.classList) {
//     node.classList.add(className);
//   } else {
//     if (!hasClass(node, className)) {
//       node.className = `${node.className} ${className}`;
//     }
//   }
// }

export function addClass(node, className) {
  if (node.classList) {
    node.classList.add(className);
  } else {
    if (!hasClass(node, className)) {
      node.className = `${node.className} ${className}`;
    }
  }
}

// export function removeClass(node, className) {
//   if (node.classList) {
//     node.classList.remove(className);
//   } else {
//     if (hasClass(node, className)) {
//       const originClass = node.className;
//       node.className = ` ${originClass} `.replace(` ${className} `, ' ');
//     }
//   }
// }

export function removeClass(node, className) {
  if (node.classList) {
    node.classList.remove(className);
  } else {
    if (hasClass(node, className)) {
      const originClass = node.className;
      node.className =  ` ${originClass} `.replace(` ${className} `, ' ');
    }
  }
}
