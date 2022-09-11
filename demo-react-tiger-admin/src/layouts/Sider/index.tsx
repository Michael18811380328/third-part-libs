import React from 'react';
import {Layout} from 'antd';
import {useStore} from '@/store';
import {observer} from 'mobx-react';
import Logo from '@/assets/logo.svg';
import SideMenu from './Menu';

// 侧栏组件
const {Sider} = Layout;

const AppSider = () => {
  const { appStore } = useStore();
  const { collapsed } = appStore;
  return (
    <Sider width={200} theme="dark" collapsed={collapsed} className="app-sider">
      <div className={`app-logo ${collapsed ? 'app-logo-on' : ''}`}>
        <div className="logo-wrap">
          <img src={Logo} className="app-logo-img" alt=""/>
        </div>
      </div>
      <SideMenu />
    </Sider>
  );
}

export default observer(AppSider);
