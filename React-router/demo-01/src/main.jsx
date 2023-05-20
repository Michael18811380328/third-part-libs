import React from 'react'
import ReactDOM from 'react-dom/client'
// 引入路由组件
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 引入不同的页面路由
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import Contact, { loader as contactLoader, action as contactAction } from "./routes/contact";
import EditContact, { action as editAction } from './routes/edit';
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

import ErrorPage from "./error-page";

import './index.css'

// 初始化路由和对应的页面
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // 加载数据（获取到联系人，并挂在到这个路由上）
    loader: rootLoader,
    // 提交表单，内部组件使用 Form 组件，向路由节点提交表单
    action: rootAction,
    // 嵌套路由
    children: [
      // 初始路由（路径是/）
      // Note the { index:true } instead of { path: "" }.
      // That tells the router to match and render this route when the user is at the parent route's exact path
      // so there are no other child routes to render in the <Outlet>.
      { 
        index: true,
        element: <Index />
      },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact/>,
        // 理论上这里应该使用另一个 editLoader，教程中直接复用了这个
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        // 这里处理 delete 请求，没有对应的界面，所以 element 参数是空的
        action: destroyAction,
        // 这个在当前 Action 出错后返回的错误提示，界面部分显示错误，不会造成整个界面崩溃，其他部分用户还能操作
        errorElement: <div>Oops! There was an error.</div>,
      },
    ],
  },
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
