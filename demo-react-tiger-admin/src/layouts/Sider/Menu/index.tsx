import React, { useEffect, FC, useState } from 'react';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link, useLocation } from 'react-router-dom';
import { IRoute, MenuInfo } from '@/typings/router';
import router from '@/router';
import Icon from '@/components/Icon';
import { useStore } from '@/store';
import { observer } from 'mobx-react';

const Item = Menu.Item;

const SiderMenu: FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const [openMenu, setOpenMenu] = useState(`/${pathname.split('/')[1]}`);
  const { appStore } = useStore()
  const openKey: Array<string> = [pathname];

  useEffect(() => {
    pathname !== '/' && handleDefaultSelect()
  }, [pathname])

  const getMenuTree = (routers: IRoute[]) => {
    return routers.reduce((pre: any, item: any) => {
      if (!item.children && !item.hidden) {
        pre.push(
          <Item key={item.path} icon={<Icon type={item.icon} />}>
            <Link to={item.paht}>
              <span>{item.title}</span>
            </Link>
          </Item>,
        )
      } else {
        if (!item.hidden) {
          pre.push(
            <SubMenu key={item.path} title={item.title} icon={<Icon type={item.icon}/>}>
              {getMenuTree(item.children)}
            </SubMenu>
          );
        }
      }
      return pre;
    }, [])
  }

  const menuTree = getMenuTree(router)

  const selectBreadcrumb = (currentKey: string, path: string) => {
    const currentMenu: any = [];
    const findItem = (item: any) => {
      item.chldren.forEach((sItem: any) => {
        if (path.includes(sItem.path)) {
          currentMenu.push({
            title: sItem.title,
            path: sItem.path,
          });
        }
        if (sItem.children) {
          findItem(sItem);
        }
      })
    }

    router.forEach((item) => {
      if (item.path === currentKey) {
        currentMenu.push({
          title: item.title,
          path: item.path,
        });
      }
      if (item.children) {
        findItem(item);
      }
    });
    return currentMenu;
  }

  // 刷新界面——默认选中
  const handleDefaultSelect = () => {
    const currentKey = `/${pathname.split('/')[1]}`;
    const currentMenu = selectBreadcrumb(currentKey, pathname);
    setOpenMenu(currentKey);
    appStore.setCurrentMenuList(currentMenu);
  }

  // 处理点击菜单事件
  const handleMenuClick = (item: MenuInfo) => {
    const currentKey = `/${item.key.split('/')[1]}`;
    const path = item.path;
    const currentMenu = selectBreadcrumb(currentKey, path);
    appStore.setCurrentMenuList(currentMenu);
    setOpenMenu(currentKey);
  }

  return (
    <div className="app-sider-menu">
      <Menu
        mode="inline"
        theme="dark"
        inlineIndent={15}
        selectedKeys={openKey}
        defaultOpenKeys={[openMenu]}
        onClick={handleMenuClick}
        className="app-menu-inner"
      >
        {menuTree}
      </Menu>
    </div>
  );
}

export default observer(SiderMenu);
