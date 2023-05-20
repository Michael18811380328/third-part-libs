import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Board from './Board'
import { observe } from './Game'

const root = ReactDOM.createRoot(document.getElementById('root'));

// 如果出现了下面的报错，这是 react 18.x 语法的报错。react-dnd 语法是 ReactDOM.render(JSX, dom) 改成 dom.render(jsx);
// ERROR
// react_dom_client__WEBPACK_IMPORTED_MODULE_1__.render is not a function
// TypeError: react_dom_client__WEBPACK_IMPORTED_MODULE_1__.render is not a function at http://localhost:3000

// observe((knightPosition) =>
//   ReactDOM.render(<Board knightPosition={knightPosition} />, root)
// )

observe((knightPosition) => {
    return root.render(<Board knightPosition={knightPosition} />)
  }
)
