import React from 'react';
import { createRoot } from 'react-dom/client';

// 引入 Provider 和 store，顶层组件中绑定 props <Provider store={store}>
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
