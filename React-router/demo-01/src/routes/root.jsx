import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  NavLink,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";

// We need to tell the root route where we want it to render its child routes. We do that with <Outlet>.

// 界面中 a 标签默认跳转到新的界面，这是服务端路由
// Link 可以实现页面内部跳转（客户端路由）

// 辅助函数，获取联系人数组并返回（默认的 POST 提交函数）
export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

// 这是通过 GET 请求获取参数
export async function loader({ request }) {
  // 先规范 URL
  const url = new URL(request.url);
  // 解析 query 字段
  const q = url.searchParams.get("q");
  // 获取联系人并返回
  const contacts = await getContacts(q);
  return { contacts, q };
}

// Because this is a GET, not a POST, React Router does not call the action.
// Submitting a GET form is the same as clicking a link: only the URL changes.
// That's why the code we added for filtering is in the loader, not the action of this route.

export async function action() {
  const contact = await createContact();
  // 原来会直接返回创建的空联系人
  // return { contact };
  // 现在改成直接重定向到新建的联系人单页面中
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  // 从外部路由中拿到联系人的数组，并渲染
  const { contacts, q } = useLoaderData();
  // 获取当前导航的状态，提交中，加载中，默认状态
  const navigation = useNavigation();
  // useNavigation returns the current navigation state: it can be one of "idle" | "submitting" | "loading".

  const submit = useSubmit();

  // 这是把查询字段中的值，作为默认搜索框的值
  useEffect(() => {
    // q 从 loader 中传参过来
    document.getElementById("q").value = q;
  }, [q]);

  // 增加搜索转圈图标
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          {/* 这是默认的提交 post */}
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              // 改变后，自动触发提交事件
              // currentTarget.form is the input's parent form node.
              // The submit function will serialize and submit any form you pass to it.
              // 默认这种情况，每次输入都会把搜索的历史推入到历史栈中
              // onChange={(event) => {
              //   submit(event.currentTarget.form);
              // }}
              // 改成这种，当 firstSearch 是空，就写入历史记录；当有内容时，直接使用 replace 替代历史，避免记录多个搜索历史
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
              className={searching ? "loading" : ""}
            />
            <div
              id="search-spinner"
              aria-hidden
              // hidden={true}
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          {/* 更改后的提交 get */}
          {/* <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form> */}

          {/* 默认的 form 向服务器提交 */}
          {/* <form method="post">
            <button type="submit">New</button>
          </form> */}
          {/* 使用 Form 组件，向路由节点提交表单 */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {/* 上面是静态的链接 */}
          <ul>
            <li>
              {/* 这里处理服务端路由，还是客户端路由，界面是否整体加载 */}
              {/* <a href={`/contacts/1`}>Your Name</a> */}
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              {/* <a href={`/contacts/2`}>Your Friend</a> */}
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
          {/* 下面是动态的联系人，是从 loader 函数中获取到，然后绑定在父组件loader 中
          子组件 const { contacts } = useLoaderData(); 拿到的 */}
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  {/* <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link> */}
                  {/* 上面是普通的链接，没有样式效果，所以改成下面的导航链接，当活动时，显示高亮的颜色 */}
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive? "active" : (isPending ? "pending" : "")
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      {/* Find the <div id="detail"> and put an outlet inside 这是嵌套路由 */}
      <div
        id="detail"
        // 当界面时加载状态时，联系人详情显示加载状态
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
}
