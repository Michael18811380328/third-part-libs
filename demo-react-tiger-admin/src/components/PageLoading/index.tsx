import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{fontSize: 35}} spin />

// 页面加载中组件(这个语法不常见)
const PageLoading: React.FC<{ tip?: string }> = ({ tip }) => (
  <div style={{ paddingTop: 100, textAlign: 'center'}}>
    <Spin size="large" indicator={antIcon} tip={tip} />
  </div>
)

export default PageLoading;
