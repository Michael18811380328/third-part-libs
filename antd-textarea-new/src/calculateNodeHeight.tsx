// Thanks to https://github.com/andreypopp/react-textarea-autosize/

/**
 * calculateNodeHeight(uiTextNode, useCache = false)
 */

const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
];

// NodeType 接口
export interface NodeType {
  sizingStyle: string;
  paddingSize: number;
  borderSize: number;
  boxSizing: string;
}

// 计算的样式对象：键值字符串，值是上面的接口）
const computedStyleCache: { [key: string]: NodeType } = {};
let hiddenTextarea: HTMLTextAreaElement;

/**
 * 对外函数：计算节点的样式
 * @param node DOM节点（判断类型）
 * @param useCache 是否使用缓存
 */
export function calculateNodeStyling(node: HTMLElement, useCache = false) {

  // 获取REF
  const nodeRef = (node.getAttribute('id') || node.getAttribute('data-reactid') || node.getAttribute('name')) as string;

  // 如果使用了缓存，并且缓存已经获取这个节点，那么直接从缓存中获取节点样式
  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }

  // 获取节点的样式对象
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
  const style = window.getComputedStyle(node);

  // 获取盒子属性（兼容不同浏览器）
  const boxSizing = style.getPropertyValue('box-sizing') || style.getPropertyValue('-moz-box-sizing') || style.getPropertyValue('-webkit-box-sizing');

  const paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));

  const borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));

  // 把缩放的样式对象拼接成字符串数组，然后链接成字符串
  const sizingStyle = SIZING_STYLE.map(
    (name) => `${name}:${style.getPropertyValue(name)}`,
  ).join(';');

  // 返回节点的样式信息
  const nodeInfo: NodeType = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing,
  };

  // 如果使用缓存，将这个节点样式信息存放在环迅内部
  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }

  // 返回节点信息
  return nodeInfo;
}

/**
 * 对外函数：计算节点的高度
 * @param uiTextNode 文本Node节点
 * @param useCache 使用缓存
 * @param minRows 最小行数
 * @param maxRows 最大行数
 */
export default function calculateNodeHeight(
  uiTextNode: HTMLTextAreaElement,
  useCache = false,
  minRows: number | null = null,
  maxRows: number | null = null,
) {
  // 如果没有隐藏的长文本，那么创建一个并增加到body后面
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('tab-index', '-1');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    document.body.appendChild(hiddenTextarea);
  }

  // Fix wrap="off" issue
  // https://github.com/ant-design/ant-design/issues/6577
  if (uiTextNode.getAttribute('wrap')) {
    hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap') as string, );
  } else {
    hiddenTextarea.removeAttribute('wrap');
  }

  // Copy all CSS properties that have an impact on the height of the content in the textbox
  const {
    paddingSize,
    borderSize,
    boxSizing,
    sizingStyle,
  } = calculateNodeStyling(uiTextNode, useCache);

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be narrower for content
  hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`,);
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';

  let minHeight = Number.MIN_SAFE_INTEGER;
  let maxHeight = Number.MAX_SAFE_INTEGER;
  let height = hiddenTextarea.scrollHeight;
  let overflowY: any;

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    height += borderSize;
  } else if (boxSizing === 'content-box') {
    // remove padding, since height = content
    height -= paddingSize;
  }

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = ' ';
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      overflowY = height > maxHeight ? '' : 'hidden';
      height = Math.min(maxHeight, height);
    }
  }
  return { height, minHeight, maxHeight, overflowY };
}
