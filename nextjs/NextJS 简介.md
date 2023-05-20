# NextJS 入门简介

2023-05-07

## 1、React 有哪些局限？为什么使用 nextJS ？

React 是前端渲染框架，适合单页应用（关注数据如何渲染成DOM结构），重在前端渲染，浏览器渲染耗费时间，造成首页白屏时间较长（服务器传来一个 app.bundle.js，react先渲染成 DOM 树，然后浏览器渲染成网页的过程）。客户端渲染也不利于SEO。

nextJS 是一个生产环境下的 React 框架（类似 create-react-app + SSR），可以解决上面的问题。

SSR 服务端渲染 render

SSG 服务端生成 generate

## 2、nextJS 历史发展

nextJs 的公司是 Vercel 早期主要做 CI CD 部署，2020年完成千万美金的 A 轮融资，是一个迅速发展的创业公司。nextJS 主要作者 CEO 是Rauch，创建了 nextJS, socket.to 和 mongoose 库。谷歌也参与了 nextJS 代码的提交。

NextJS github 上星星也 80K，是一个成熟的项目。从2016年开始这个项目，截止现在已经 12 版本，可以说基本功能成熟并且稳定了。

## 3、nextJS 基本使用

通过脚手架命令安装

~~~bash
npx create-next-app@lastest nextjs-demo
~~~

然后安装依赖 react react-dom next 库，项目基本架构类似 react

~~~
pages 页面
styles 样式
api
next.config.js 配置文件
~~~

使用案例（从 URL query 中获取 ID 并渲染到界面上）

~~~jsx
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <p>{id}</p>
  );
}

export default Post;
~~~

## 4、nextJS 如何实现服务端渲染 SSR SSG

主要依靠三个函数

1. getServerSideProps() 服务端渲染（发出请求，执行API）
2. getStaticProps() 服务端生成网页（build 阶段构建网页）
3. getStaticPaths() 服务端生成网页

这三个函数的代码永远在服务端执行

示例如下

~~~jsx
import { useRouter } from 'next/router';

const Post = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <p>{id}</p>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetcht('http://xxx.api');
  // 这个是服务端渲染，然后把请求的结果，作为 props 返回到上面的 POST 组件中
  return {
    props: { data: res };
  };
}
~~~

这个代码的实际效果时，客户端传过来一个 ID，然后服务器端发出请求并获取请求结果，然后服务端实现渲染。当客户端 ID 变化后，服务端重新发出请求等。

然后对比一下 getStaticProps 服务端生成网页，可以枚举用户全部的ID，然后预先生成很多个界面，用户使用哪个直接加载页面。示例如下

~~~jsx
import { useRouter } from 'next/router';
import _ from 'lodash';

const Post = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <p>{id}</p>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetcht('http://xxx.api');
  // 这个是服务端渲染，然后把请求的结果，作为 props 返回到上面的 POST 组件中
  return {
    props: { data: res };
  };
}

export async function getStaticPaths() {
  return {
    // 预先生成 ID 从1-20 的全部情况（生成20个静态页面）
    paths: _.range(1, 20).map(id => {
      return {
        params: { id: id + "" }
      }
    }),
    fallback: "blocking",//配置如果 ID 不在这个范围内的情况
  };
}
~~~

fallback 参数说明：

- 'Blocking' 表示，如果超出范围，变成 serverSideRending 服务器端渲染
- false 超出范围渲染404
- true 超出范围，返回 props = {} 然后渲染界面（例如POST 组件内部渲染Loading）

## 5、扩展——ISR 增量静态生成

getStaticProps 函数的返回值中，增加属性 revalidate: 10 秒

这个用来保证我们静态生成的界面，当后台数据变化后，每隔 10秒整体生成一次静态页面，确保静态页面的数据是最新的——例如网站首页。

这个可以自动更新，也可以手动通过API更新页面（用户点击更新按钮，发送API，重新生成页面），示例如下

增加一个 api/revalidate.js

~~~js
export default async function handler(req, res) {
  // 验证 API token
  if (req.query.token !== '567chxs') {
    return res.status(401).json({ message: "Invalid token" })
  }
  try {
    await res.revalidate('/posts/');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
}
~~~

这样可以实现手动静态生成页面

