import React, { FC } from 'react';
import { Redirect, Switch, withRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { RouteComponentProps } from 'react-router';
import routes from '@/router';
import { IRoute } from '@/typings/router'
import { flatRouters } from '@/utils'
import Source from './source';

const { Content } = Layout;

// APP 内容，主要是不同路由页面和重定向
const AppContent: FC<RouteComponentProps> = () => {
  const menus = flatRouters(routes);
  return (
    <Content className="app-content">
      <Switch>
        <Redirect exact from="/" to="/basic/dashboard" />
        {menus.map((route: IRoute) => {
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
          />
        })}
        <Redirect to="/error/404" />
      </Switch>
      <Source/>
    </Content>
  );
}

export default withRouter(AppContent);
