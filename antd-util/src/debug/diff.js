/* eslint no-proto: 0 */

// 自定义了创建数组的函数（改写了内部的原型对象，改写了自定义的属性和方法）
// 为了下面的 diff 函数改写的方法
function createArray() {
  const arr = [];
  arr.__proto__ = new Array;
  // 更改 format 增加了 path 属性
  arr.__proto__.format = function toString() {
    return this.map(obj => ({
      ...obj,
      path: obj.path.join(' > '),
    }));
  };
  // 改写了 toString 方法
  arr.__proto__.toString = function toString() {
    return JSON.stringify(this.format(), null, 2);
  };
  return arr;
}

// function createArray() {
//   const arr = [];
//   arr.__proto__ = new Array;
//   arr.__proto__.format = function toString() {
//     return this.map(obj => ({
//       ...obj,
//       path: obj.path.join(' > '),
//     }));
//   };
//   arr.__proto__.toString = function toString() {
//     return JSON.stringify(this.format(), null, 2);
//   }
// }

export default function diff(obj1, obj2, depth = 10, path = [], diffList = createArray()) {
  if (depth <= 0) return diffList;
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  keys.forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    // Same value
    if (value1 === value2) return;
    const type1 = typeof value1;
    const type2 = typeof value2;
    // Diff type
    if (type1 !== type2) {
      diffList.push({
        path: path.concat(key),
        value1,
        value2,
      });
      return;
    }
    // NaN
    if (Number.isNaN(value1) && Number.isNaN(value2)) {
      return;
    }
    // Object & Array
    if (type1 === 'object' && value1 !== null && value2 !== null) {
      diff(value1, value2, depth - 1, path.concat(key), diffList);
      return;
    }
    // Rest
    diffList.push({
      path: path.concat(key),
      value1,
      value2,
    });
  });
  return diffList;
}

// export default function diff(obj1, obj2, depth = 10, path = [], diffList = createArray()) {
  //   if (depth <= 0) return diffList;
  //   const keys = new Set([
  //     ...Object.keys(obj1),
  //     ...Object.keys(obj2),
  //   ]);
  //   keys.forEach((key) => {
  //     const value1 = obj1[key];
  //     const value2 = obj2[key];
  //     if (value1 === value2) return;
  //     const type1 = typeof value1;
  //     const type2 = typeof value2;
  //     if (type1 !== type2) {
  //       diffList.push({
  //         path: path.concat(key),
  //         value1,
  //         value2,
  //       });
  //       return;
  //     }
  //     if (Number.isNaN(value1) && Number.isNaN(value2)) {
  //       return;
  //     }
  //     // obj arr
  //     if (type1 === 'object' && value1 !== null && value2 !== null) {
  //       diff(value1, value2, depth - 1, path.concat(key));
  //       return;
  //     }
  //     diffList.push({
  //       path: path.concat(key),
  //       value1,
  //       value2,
  //     });
  //   });
  //   return diffList;
  // }
