import React, { FC, useEffect } from 'react';
import { Avatar, Layout, Menu, Dropdown } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import FullScreen from '@/components/FullScreen';
import Hamburger from '@/components/Hamburger';
import headImg from '@assets/default-head-02.png';
import BreadCrumb from '@/components/BreadCrumb';
import { useStore } from '@/store';
import { useStorage } from '@/hooks/common';
import { Gitee } from '@/common/constants';

const { Header } = Layout

type Props = {
  token?: string
}

const Item = Menu.Item;

// 头部组件
const AppHeader: FC<Props> = () => {
  const history = useHistory();
  const { userStore } = useStore()
  const storage = useStorage();
  const { nickname } = storage.get({path: 'info'});

  const toLogin = () => {
    history.push('/login');
  }

  useEffect(() => {
    if (!nickname) {
      toLogin();
    }
  }, [nickname])

  const onDropMenu = (e: any) => {
    if (e.key === 'uppassword') {
      console.log('up');
    }
    if (e.key === 'logout') {
      userStore.logout();
      toLogin();
    }
  }

  // 下拉菜单组件
  const dropMenu = (
    <Menu className="app-overlay-menu" onClick={onDropMenu}>
      <Item key="index" style={{display: 'none'}}>
        <Link to="/">首页</Link>
      </Item>
      <Item key="gitee">
        <a href={Gitee} target="_blank" rel="noopener noreferrer">项目地址</a>
      </Item>
      <Item key="uppassword" style={{display: 'none'}}>
        修改密码
      </Item>
      <Menu.Divider/>
      <Item key="loggout">登出</Item>
    </Menu>
  );

  return (
    <Header className="app-header">
      <Hamburger/>
      <BreadCrumb/>
      <div className="app-helper-menu">
        <FullScreen/>
        <div className="header-dropdown-wrap">
          <Dropdown overlayClassName="app-header-down" arrow overlay={dropMenu} overlayStyle={{ right: '-30px', left: 0}}>
            <div>
              <Avatar size={32} src={headImg} />
              <span className="app-name">{nickname}</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}

export default AppHeader;
