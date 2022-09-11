import React, { FC } from 'react';
import { Layout } from 'antd';
import { RouteComponentProps } from 'react-router'

import AppSider from './Sider';
import AppHeader from './Header';
import AppContent from './Content';

import './index.less';

// 把 antd 的 Layout 封装了一层，加上了左侧设置栏
const AppLayout: FC<RouteComponentProps> = () => {
  return (
    <Layout>
      <AppSider />
      <Layout style={{ maxHeight: '100vh' }}>
        <AppHeader/>
        <AppContent/>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
