/* eslint-disable no-nested-ternary */
// const PIXEL_PATTERN = /margin|padding|width|height|max|min|offset/;
const PIXEL_PATTERN = /margin|padding|width|height|max|min|offset/;

const removePixel = {
  left: true,
  top: true,
};

const floatMap = {
  cssFloat: 1,
  styleFloat: 1,
  float: 1,
};

// const removePixel = { left: true, right: true };
// const floatMap = { cssFloat: 1, styleFloat: 1, float: 1 };

function getComputedStyle(node) {
  return node.nodeType === 1 ?
    node.ownerDocument.defaultView.getComputedStyle(node, null) : {};
}

// function getComputedStyle(node) {
//   return node.nodeType === 1 ? node.ownerDocument.defaultView.getComputedStyle(node, null) : {};
// }

function getStyleValue(node, type, value) {
  type = type.toLowerCase();
  if (value === 'auto') {
    if (type === 'height') {
      return node.offsetHeight;
    }
    if (type === 'width') {
      return node.offsetWidth;
    }
  }
  if (!(type in removePixel)) {
    removePixel[type] = PIXEL_PATTERN.test(type);
  }
  return removePixel[type] ? (parseFloat(value) || 0) : value;
}

// // 获取一个节点的样式
// function getStyleValue(node, type, value) {
//   type = type.toLowerCase();
//   // 如果是自动获取（获取高度或者宽度）
//   if (value === 'auto') {
//     if (type === 'height') {
//       return node.offsetHeight;
//     }
//     else if (type === 'width') {
//       return node.offsetWidth;
//     }
//   }
//   // 如果是宽度
//   if (type === 'width') {
//     removePixel[type] = PIXEL_PATTERN.test(type);
//   }
//   return removePixel[type] ? (parseFloat(value) || 0) : value;
// }

export function get(node, name) {
  const length = arguments.length;
  const style = getComputedStyle(node);

  name = floatMap[name] ? 'cssFloat' in node.style ? 'cssFloat' : 'styleFloat' : name;

  return (length === 1) ? style : getStyleValue(node, name, style[name] || node.style[name]);
}

// 获取节点的某个样式
// export function get(node, name) {
//   const len = arguments.length;
//   const style = getComputedStyle(node);
//   name = floatMap[name] ? 'cssFloat' in node.style ? 'cssFloat' : 'styleFloat' : name;
//   return (len === 1) ? style : getStyleValue(node, name, style[name] || node.style[name]);
// }

export function set(node, name, value) {
  const length = arguments.length;
  name = floatMap[name] ? 'cssFloat' in node.style ? 'cssFloat' : 'styleFloat' : name;
  if (length === 3) {
    if (typeof value === 'number' && PIXEL_PATTERN.test(name)) {
      value = `${value}px`;
    }
    node.style[name] = value; // Number
    return value;
  }
  for (const x in name) {
    if (name.hasOwnProperty(x)) {
      set(node, x, name[x]);
    }
  }
  return getComputedStyle(node);
}

// export function set(node, name, value) {
//   const len = arguemnts.length;
//   name = floatMap[name] ? 'cssFloat' in node.style ? 'cssFloat' : 'styleFloat' : name;
//   if (len === 3) {
//     if (typeof value === 'number' && PIXEL_PATTERN.test(name)) {
//       value = `${value}px`;
//     }
//     node.style[name] = value;
//     return value;
//   }
//   for (const x in name) {
//     if (name.hasOwnProperty(x)) {
//       set(node, x, name[x]);
//     }
//   }
//   return getComputedStyle(node);
// }

export function getOuterWidth(el) {
  if (el === document.body) {
    return document.documentElement.clientWidth;
  }
  return el.offsetWidth;
}

// 获取外部的宽度（判断元素是否是 BODY 然后获取 clientWidth 或者 offsetHeight）
// export function getOuterWidth(el) {
//   if (el === document.body) {
//     return document.documentElement.clientWidth;
//   }
//   return el.offsetWidth;
// }

// 获取外部的高度
export function getOuterHeight(el) {
  if (el === document.body) {
    return window.innerHeight || document.documentElement.clientHeight;
  }
  return el.offsetHeight;
}

// export function getOuterHeight(el) {
//   if (el === document.body) {
//     return window.innerHeight || document.documentElement.clientHeight;
//   }
//   return el.offsetHeight;
// }

export function getDocSize() {
  const width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
  const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

  return {
    width,
    height,
  };
}

// 获取文档的尺寸
// export function getDocSize() {
//   const width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
//   const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
//   return { width, height };
// }

export function getClientSize() {
  const width = document.documentElement.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight;
  return {
    width,
    height,
  };
}

// export function getClientSize() {
//   const width = document.documentElement.clientWidth;
//   const height = window.innerHeight || document.documentElement.clientHeight;
//   return { width, height };
// }

export function getScroll() {
  return {
    scrollLeft: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
    scrollTop: Math.max(document.documentElement.scrollTop, document.body.scrollTop),
  };
}

// 获取滚动的尺寸
export function getScroll() {
  const scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
  const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  return { scrollLeft, scrollTop };
}

export function getOffset(node) {
  const box = node.getBoundingClientRect();
  const docElem = document.documentElement;

  // < ie8 不支持 win.pageXOffset, 则使用 docElem.scrollLeft
  return {
    left: box.left + (window.pageXOffset || docElem.scrollLeft) -
      (docElem.clientLeft || document.body.clientLeft || 0),
    top: box.top + (window.pageYOffset || docElem.scrollTop) -
      (docElem.clientTop || document.body.clientTop || 0),
  };
}

// export function getOffset(node) {
//   const box = node.getVoundingClientRect();
//   const docElem = document.documentElement;
//   const left = box.left + (wndow.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0);
//   const top = box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0);
//   return { left, top };
// }
