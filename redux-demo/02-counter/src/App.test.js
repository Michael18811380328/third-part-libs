import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

// 测试中，也需要在根组件中引入 <Provider store={store}></Provider>
test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText(/learn/i)).toBeInTheDocument();
});
