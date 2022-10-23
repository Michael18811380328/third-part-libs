import ReactDOM from 'react-dom';

// 增加事件监听的包装函数
export default function addEventListenerWrap(target, eventType, cb, option) {
  /* eslint camelcase: 2 */
  // 批量更新state（如果支持批量更新就执行，否则直接返回回调函数）
  const callback = ReactDOM.unstable_batchedUpdates
    ? function run(e) {
        ReactDOM.unstable_batchedUpdates(cb, e);
      }
    : cb;
  // 如果目标支持增加事件监听（就增加）
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, option);
  }
  // 返回移除事件监听
  return {
    remove: () => {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, callback);
      }
    },
  };
}

// import ReactDOM from 'react-dom';

// export default function addEventListenerWrap(target, eventType, cb, option) {
//   /* eslint camelcase: 2 */
//   const callback = ReactDOM.unstable_batchedUpdates ? function run(e) {
//     ReactDOM.unstable_batchedUpdates(cb, e);
//   } : cb;
//   if (target.addEventListener) {
//     target.addEventListener(eventType, callback, option);
//   }
//   return {
//     remove: () => {
//       if (target.removeEventListener) {
//         target.removeEventListener(eventType, callback);
//       }
//     }
//   };
// }