# 01 React-router 入门案例

### Setup

使用 vite 构建工具初始化项目，然后安装 react-router-dom localforage match-sorter sort-by 存储和排序工具

~~~bash
npm create vite@latest demo -- --template react
cd demo
npm install react-router-dom localforage match-sorter sort-by
npm run dev
~~~

清理废弃文件，准备样式文件，工具函数等

### Adding a Router

入口文件，增加路由

~~~js
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);


// render
<RouterProvider router={router} />
~~~

### The Root Route

创建根目录的路由

src/routes/root.jsx

~~~jsx
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);
~~~

### Handling Not Found Errors

处理 404 界面

src/error-page.jsx

### The Contact Route UI

联系人界面的路由

src/routes/contact.jsx

~~~js
const router = createBrowserRouter([
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]);
~~~

### Nested Routes

嵌套路由

在路由函数中，增加一个 children 表示嵌套的子路由

~~~jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);
~~~

然后在根组件 Root 中，需要 Outlet 组件 渲染嵌套的内部组件——类似 React.children

~~~jsx
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
~~~

### Client Side Routing

客户端的路由，把 a 改成 Link 标签即可，这样从 a 点击后重新请求服务器，变成了点击 Link 请求客户端内部的路由

### Loading Data

加载数据，把 loader 加载函数，挂在到路由节点上，然后子组件从 loader 中获取数据，进行渲染

这里会用到 useLoaderData 拿数据

~~~js
const { contacts } = useLoaderData();
~~~

### Data Writes + HTML Forms

写入数据前，需要先了解一下传统表单写入数据的逻辑。

传统表单中，form 输入内容，点击提交，那么表单会自动向服务器提交数据，发出 POST 请求。

在这个案例中，没有部署 vite server 并连接数据库，所以就使用路由拦截形式，把用户的数据写入到本地存储中，实现数据写入。

然后本地数据可以实现数据的增删改查。

### Creating Contacts 创建联系人

使用 Form 组件代替传统的 form 组件提交表单，不是直接提交到服务器，而是实现路由拦截，使用 action 配置，将表单提交的数据，存储到本地

### URL Params in Loaders

使用 URL 中 params 进行传参，：进行分割，然后在子组件中，拿到 ID 获取对应的数据（网络请求，或者本地存储实现）

### Updating Data

更新数据，需要增加新的路由，增加了一个 edit page 编辑页面，然后可以实现页面路由跳转。

### Updating Contacts with FormData

edit 页面中使用表单数据，新增 action 函数，获取表单数据，并更新联系人信息，更新后，重定向到联系人界面。

### Mutation Discussion 深入讨论

说明了表单提交的具体过程：表单收集（name属性），统一提交到 formData 对象中，等 updateContact 这个异步操作结束后，界面重定向。

### Redirecting new records to the edit page

新建记录后，重定向到编辑页面

### Active Link Styling

高亮链接 NavLink 替代了 Link 标签

### Global Pending UI

全局等待状态，loading 通过 useNavigation 获取到，然后子节点显示加载状态

### Deleting Records

删除记录，按钮在 form 中，对应的一个 router，然后执行对应 action: destroyAction

When the user clicks the submit button:

1. `<Form>` prevents the default browser behavior of sending a new POST request to the server, but instead emulates the browser by creating a POST request with client side routing

Form 阻止了浏览器默认的 POST 请求，而是通过创建具有客户端路由的POST请求，来模拟浏览器行为

2. The `<Form action="destroy">` matches the new route at "contacts/:contactId/destroy" and sends it the request

action 匹配路由，浏览器端发送请求

3. After the action redirects, React Router calls all of the loaders for the data on the page to get the latest values (this is "revalidation"). useLoaderData returns new values and causes the components to update!

在操作重定向之后，React Router会重新获取页面数据，加载页面，以获取最新的值（这就是“重新验证”）。useLoaderData返回新值并导致组件更新！

Add a form, add an action, React Router does the rest.

添加一个表单，添加一个动作，剩下的由React Router完成。

### Contextual Errors

上下文错误处理，包括全局页面的错误处理，和某个路由，或者某个 action 造成的错误处理

### Index Routes

默认的路由界面

### Cancel Button

回退按钮的实现 navagate(-1) 函数

### URL Search Params and GET Submissions

URL 查询字段和 GET 提交方式

传统 form 提交的方法是 get(method 不说明是 post 的情况)

然后会把字段作为 query 字段提交到 GRT 请求 URL 中

### GET Submissions with Client Side Routing

使用客户端路由的方式，提交 GET 请求

### Synchronizing URLs to Form State

同步 URL 和表单的状态

我们会遇到一些 UX 的问题：

我们点击搜索后，出现一个页面。点进去这个页面，然后点击返回，那么这个页面中的搜索是空的。

或者我们在URL 中增加请求字段，然后刷新界面，这个字段不会被填充到默认的表单中

解决办法，就是查询时，把查询结果和查询字段都返回来，然后 input 设置默认值即可。

在 componentDidMount 阶段，获取到请求字段，并改变 input 的值——或者使用 useEffect hook 实现同样的功能

### Submitting Forms onChange

onChange 时，自动提交表单（不需要用户频繁点击表单的提交按钮）

### Adding Search Spinner

增加搜索的旋转图标

### Managing the History Stack

管理历史栈（历史记录）

当搜索输入时，不应该每次都把 GET 的 URL 记录存储在历史栈中

应该使用 replace 模式，而不是 push 模式

### Mutations Without Navigation

更多思考：没有导航的情况

之前我们的案例，各种请求都是通过 URL 实现的，我们也可以直接使用 fetch 发出请求，不会记录到 URL 历史栈中。

we have the useFetcher hook.

### Optimistic UI

乐观 UI

我们处理表单时，例如（添加收藏），我们期待网络正常，可以添加收藏。实际上网络可能延迟，界面上等待的时间就比较多。

解决思路：先把界面上渲染成功的状态。然后当网络请求正常返回后，界面不动。当网络请求返回错误，界面再提示错误的情况。

### Not Found Data

没有联系人数据的处理，返回一个 404

~~~js
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
~~~

### Pathless Routes

无路径路由，用于处理错误页面

There's a cleaner way. Routes can be used without a path, which lets them participate in the UI layout without requiring new path segments in the URL.

这个需要改造整个 router，代码中没有动

main.jsx

~~~jsx
createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        // 这里拦截全部的错误情况，并显示错误页面
        errorElement: <ErrorPage />,
        children: [
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
          /* the rest of the routes */
        ],
      },
    ],
  },
]);
~~~

### JSX Routes

JSX 路由，语法略有不同，这个和默认的 JS 路由功能相同

~~~jsx
import {
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);
~~~

