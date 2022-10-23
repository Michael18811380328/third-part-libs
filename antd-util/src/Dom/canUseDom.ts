// export default function canUseDom() {
//   return !!(
//     typeof window !== 'undefined' &&
//     window.document &&
//     window.document.createElement
//   );
// }

/**
 * 是否使用 DOM
 * @returns boolean
 */
export default function canUseDom() {
  // 如果是 nodeJS 环境中，没有 window 或者其他情况下，不支持 createElement 就不能使用 DOM
  return !!(
    typeof window !== 'undefined' && window.document && window.document.createElement
  );
}
