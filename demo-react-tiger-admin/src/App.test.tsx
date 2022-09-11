import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// 测试渲染了连接（节点在文档树中）
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
