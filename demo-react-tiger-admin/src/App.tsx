import React, { FC, lazy } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import { flatRouters, setPageTitle } from './utils';
import routes from '@/router';

// 懒加载全部组件
const AppLayout = lazy(() => import('@/layouts'));
const Login = lazy(() => import('@/pages/login'));
const Loader = <div className="spinner" />

// Hash 路由匹配
const App: FC = () => {
  const token = 1;
  const menus = flatRouters(routes);
  return (
    <HashRouter>
      <React.Suspense fallback={Loader}>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props}/>}
          />
          <Route
            path="/"
            render={(props) => {
              const {location: {pathname}} = props;
              const cur = menus.find(({path}: any) => path === pathname)
              cur?.title && setPageTitle(cur.title)
              if (!token) {
                return (
                  <Redirect exact to="/login" {...props}/>
                );
              }
              return <AppLayout {...props} />
            }}
          />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
