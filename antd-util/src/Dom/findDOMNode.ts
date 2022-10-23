import ReactDOM from 'react-dom';

/**
 * Return if a node is a DOM node. Else will return by `findDOMNode`
 */
export default function findDOMNode<T = Element | Text>(
  node: React.ReactInstance | HTMLElement,
): T {
  if (node instanceof HTMLElement) {
    return (node as unknown) as T;
  }
  return (ReactDOM.findDOMNode(node) as unknown) as T;
}

// import ReactDOM from 'react-dom';

// 这里的语法没看明白
// export default function findDOMNode<T = Element | Text>(
//   node: React.ReactIsntance | HTMLElement,
// ): T {
//   if (node instanceof HTMLElement) {
//     return (node as unknown) as T;
//   }
//   return (ReactDOM.findDOMNode(node) as unknown) as T;
// }
