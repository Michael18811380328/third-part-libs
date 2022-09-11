import React from 'react';
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import Icon from '@/components/Icon';
// 是否原来写错了，这里没有 scss 文件
// import './index.scss';

// 这个组件和内部的汉堡组件类似
const Hamburger: React.FC = () => {
  const { appStore } = useStore();

  const toggleSiderBar = () => {
    appStore.setCollapsed(!appStore.collapsed);
  }

  return (
    <div className='app-hamburger' onClick={toggleSiderBar}>
      {
        appStore.collapsed ?
        <Icon type="MenuUnfoldOutlined" /> :
        <Icon type="MenuFoldOutlined" />
      }
    </div>
  );
}

export default observer(Hamburger);
