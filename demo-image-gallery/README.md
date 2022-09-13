# 图片预览案例

这是一个点击图片，预览大图的小案例，使用原生 JS 实现（功能类似简化的 react-image-lightbox）。

## 产品需求

- 创建代码仓库
- 提交任务有两个链接：源文件和工作页面（GitHub 网页）。
- 访问作业的工作页面（GitHub页面）时，控制台没有错误和警告。
- 变量和函数的名称清晰，且具有描述性。
- 代码使用 Prettier 格式化。

## 实现步骤

创建一个能够单击其元素，并查看完整尺寸的预览图片组件，展示在模态窗口中。

将任务分解为几个子任务：

- 基于 `app.js` 中的 `galleryItems` 提供的模板和静态数据，创建和呈现图片。
- 在`ul.js-gallery`图库并获取大图的“url”。
- 通过单击图片，打开模式窗口。
- 替换 `img.lightbox__image` 元素的 `src` 属性值。
- 单击按钮时，关闭模式窗口 `button[data-action="close-lightbox"]`。
- 清除 `img.lightbox__image` 元素的 `src` 属性值。 这是必要的，以便下次打开模态窗口时，在加载图像时，看不到前一个图片。

## 启动文件

- 在文件夹 src 中，有包含基本 HTML 和现成 CSS 的项目的启动文件。
- 在 `app.js` 文件中有一个 `galleryItems` 数组，其中包含带有图像信息的对象：thumbnail、source_link 和 description。

## 使用案例

原始图像的链接必须存储在 `img` 元素的 `source` 数据属性中，并在链接的 `href` 中给出（链接可访问性）。

```html
<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>
```

## 可选功能

提交项目时不需要以下功能，但这将是一个好习惯，用于处理事件。

- 单击“div.lightbox__overlay”，关闭模态窗口。
- 按“ESC”键，关闭模式窗口。
- 使用“上下左右”方向键，在打开的模式窗口中，滚动浏览画廊图像。


## 参考

- https://github.com/frontend-collective/react-image-lightbox
- https://github.com/Ponomaleks/goit-js-hw-08-gallery

