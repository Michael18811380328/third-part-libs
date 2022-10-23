function hidden(node) {
  return node.style.display === 'none';
}

// function hidden(node) {
//   return node.style.display === 'none';
// }

function visible(node) {
  while (node) {
    if (node === document.body) {
      break;
    }
    if (hidden(node)) {
      return false;
    }
    node = node.parentNode;
  }
  return true;
}

// 判断一个元素是否是隐藏的，递归遍历到body节点，判断其中任何一个是隐藏的，那么这个元素的全部子节点都是隐藏的
// function visible(node) {
//   while (node) {
//     if (node === document.body) {
//       break;
//     }
//     if (hidden(node)) {
//       return false;
//     }
//     node = node.parentNode;
//   }
//   return true;
// }

function focusable(node) {
  const nodeName = node.nodeName.toLowerCase();
  const tabIndex = parseInt(node.getAttribute('tabindex'), 10);
  const hasTabIndex = !isNaN(tabIndex) && tabIndex > -1;

  if (visible(node)) {
    if (['input', 'select', 'textarea', 'button'].indexOf(nodeName) > -1) {
      return !node.disabled;
    } else if (nodeName === 'a') {
      return (node.getAttribute('href') || hasTabIndex);
    }
    return node.isContentEditable || hasTabIndex;
  }
}

// 判断一个节点是否获取焦点
// function focusable(node) {
//   const nodeName = node.nodeName.toLowerCase();
//   const tabIndex = parseInt(node.getAttribute('tabindex'), 10);
//   const hasTabIndex = !isNaN(tabIndex) && tabIndex > -1;
//   // 必须是显示节点才能获取焦点（可视节点）
//   if (visible(node)) {
//     // 表单节点（直接返回可编辑）
//     if (['input', 'select', 'textarea', 'button'].indexOf(nodeName) > -1) {
//       return !node.disabled;
//     }
//     // 如果是A节点，需要获取 HREF 属性
//     else if (nodeName === 'a') {
//       return (node.getAttribute('href') || hasTabIndex);
//     }
//     // 其他节点，需要获取是否是编辑状态
//     else {
//       return node.isContentEditable || hasTabIndex;
//     }
//   }
// }

export function getFocusNodeList(node) {
  const res = [].slice.call(node.querySelectorAll('*'), 0).filter((child) => {
    return focusable(child);
  });
  if (focusable(node)) {
    res.unshift(node);
  }
  return res;
}

// export function getFocusNodeList(node) {
//   const res = [].slice.call(node.querySelectorAll('*'), 0).filter((child) => {
//     return focusable(child);
//   });
//   if (focusable(node)) {
//     res.unshift(node);
//   }
//   return res;
// }


let lastFocusElement = null;

export function saveLastFocusNode() {
  lastFocusElement = document.activeElement;
}

export function clearLastFocusNode() {
  lastFocusElement = null;
}

// let lastFocusElement = null;
// export function saveLastFocusNode() {
//   lastFocusElement = document.activeElement;
// }
// export function clearLastFocusNode() {
//   lastFocusElement = null
// }

export function backLastFocusNode() {
  if (lastFocusElement) {
    try {
      // 元素可能已经被移动了
      lastFocusElement.focus();

    /* eslint-disable no-empty */
    } catch (e) {
      // empty
    }
    /* eslint-enable no-empty */
  }
}

// export function backLastFocusNode() {
//   if (lastFocusElement) {
//     try {
//       lastFocusElement.focus();
//     } catch (e) {
//       //
//     }
//   }
// }

// export function limitTabRange(node, e) {
//   if (e.keyCode === 9) {
//     const tabNodeList = getFocusNodeList(node);
//     const lastTabNode = tabNodeList[e.shiftKey ? 0 : tabNodeList.length - 1];
//     const leavingTab = (lastTabNode === document.activeElement || node === document.activeElement);

//     if (leavingTab) {
//       const target = tabNodeList[e.shiftKey ? tabNodeList.length - 1 : 0];
//       target.focus();
//       e.preventDefault();
//     }
//   }
// }

export function limitTabRange(node, e) {
  if (e.keyCode === 9) {
    const tabNodeList = getFocusNodeList(node);
    const lastTabNode = tabNodeList[e.shiftKey ? 0 : tabNodeList.length - 1];
    const leavingTab = (lastTabNode === document.activeElement || node === document.activeElement);
    if (leavingTab) {
      const target = tabNodeList[e.shiftKey ? tabNodeList.length - 1 : 0];
      target.focus();
      e.preventDefault();
    }
  }
}
