let cached;

export default function getScrollBarSize(fresh) {
  if (typeof document === 'undefined') {
    return 0;
  }

  if (fresh || cached === undefined) {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    const outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = 0;
    outerStyle.left = 0;
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '200px';
    outerStyle.height = '150px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }
  return cached;
}

let cached;

// // 获取滚动条的尺寸
// export default function getScrollBarSize(fresh) {
//   if (typeof document === 'undefined') {
//     return 0;
//   }
//   if (fresh || cached === undefined) {
//     // 创建内部的DIV
//     const inner = document.createElement('div');
//     inner.style.width = '100%';
//     inner.style.height = '200px';
//     // 创建外部DIV
//     const outer = document.createElement('div');
//     const outerStyle = outer.style;
//     outerStyle.position = 'absolute';
//     outerStyle.top = 0;
//     outerStyle.left = 0;
//     outerStyle.pointerEvents = 'none';
//     outerStyle.visibility = 'hidden';
//     outerStyle.width = '200px';
//     outerStyle.height = '150px';
//     outerStyle.overflow = 'hidden';

//     // 设置父子DIV的关系，并绑定在 body 上面
//     outer.appendChild(inner);
//     document.body.appendChild(outer);
//     // 设置界面滚动，然后看默认情况下，和滚动情况下 offsetWidth 的不同，获取滚动条宽度
//     const widthContained = inner.offsetWidth;
//     outer.style.overflow = 'scroll';
//     let widthScroll = inner.offsetWidth;
//     if (widthContained === widthScroll) {
//       widthScroll = outer.clientWidth;
//     }
//     document.body.removeChild(outer);
//     cached = widthContained - widthScroll;
//   }
//   // 如果有缓存，直接读取缓存
//   return cached;
// }
