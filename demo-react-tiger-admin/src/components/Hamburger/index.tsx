import React, { FC } from 'react';
// React.FC 表示函数式组件，是在 TypeScript 中使用的一个泛型
import { useStore } from '@/store';
import { observer } from 'mobx-react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './index.less';

// 状态维护在 store 中（boolean）
const Hamburger: FC = () => {
  const { appStore } = useStore();
  const toggleSideBar = () => {
    appStore.setCollapsed(!appStore.collapsed);
  }
  return (
    <div className="app-hamburger" onClick={toggleSideBar}>
      {
        appStore.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>
      }
    </div>
  );
}

export default observer(Hamburger);
