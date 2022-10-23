# rc-textarea demo

这个项目主要学习基本的 TS 组件化功能。Pretty Textarea react component used in ant design。


## 使用

install with npm

~~~bash
npm install rc-textarea
~~~

```js
import Textarea from 'rc-textarea';
import { render } from 'react-dom';

render(<Textarea />, mountNode);
```

## API

| Property     | Type                        | Default     | Description                                                                                    |
| ------------ | --------------------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| prefixCls    | string                      | rc-textarea |                                                                                                |
| className    | string                      | ''          | additional class name of textarea                                                              |
| style        | React.CSSProperties         | -           | style properties of textarea                                                                   |
| autoSize     | boolean \| object           | -           | Height autosize feature, can be set to `true\|false` or an object `{ minRows: 2, maxRows: 6 }` |
| onPressEnter | function(e)                 | -           | The callback function that is triggered when Enter key is pressed                              |
| onResize     | function({ width, height }) | -           | The callback function that is triggered when resize                                            |

## package.json

~~~json
{
  "name": "rc-textarea",
  "version": "0.3.0",
  "description": "Pretty Textarea react component used in used in ant.design",
  "scripts": {
    "start": "cross-env NODE_ENV=development father doc dev --storybook",
    "build": "father doc build --storybook",
    "compile": "father build && lessc assets/index.less assets/index.css",
    "gh-pages": "npm run build && father doc deploy",
    "prepublishOnly": "npm run compile && np --yolo --no-publish && npm run gh-pages",
    "lint": "eslint src/ --ext .ts,.tsx,.jsx,.js,.md",
    "prettier": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "pretty-quick": "pretty-quick",
    "test": "father test",
    "coverage": "father test --coverage"
  },
  "dependencies": {
    "@babel/runtime": "^7.10.1",
    "classnames": "^2.2.1",
    "omit.js": "^2.0.0",
    "rc-resize-observer": "^0.2.3"
  },
  "devDependencies": {
    "@types/classnames": "^2.2.9",
    "@types/react": "^16.9.2",
    "@types/react-dom": "^16.9.0",
    "@umijs/fabric": "^2.0.8",
    "coveralls": "^3.0.6",
    "cross-env": "^7.0.2",
    "enzyme": "^3.0.0",
    "enzyme-adapter-react-16": "^1.0.1",
    "enzyme-to-json": "^3.4.0",
    "eslint": "^7.0.0",
    "father": "^2.13.4",
    "husky": "^4.2.5",
    "less": "^3.10.3",
    "np": "^5.1.0",
    "prettier": "^2.0.5",
    "pretty-quick": "^2.0.1",
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "react-test-renderer": "^16.0.0"
  },
  "peerDependencies": {
    "react": "^16.0.0",
    "react-dom": "^16.0.0"
  },
  "husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged"
    }
  },
  "cnpm": {
    "mode": "npm"
  },
  "tnpm": {
    "mode": "npm"
  }
}

~~~

## 项目目录

~~~txt

项目配置

测试代码
├── examples
│   ├── autoSize.js 自动尺寸的文本输入框
│   └── simple.js 简单使用

主要代码
├── assets
│   └── index.less 配置类名前缀
├── index.js 入口文件（src根目录）
└── src
    ├── ResizableTextArea.tsx 缩放文本输入框
    ├── calculateNodeHeight.tsx 计算节点的高度
    └── index.tsx 文本输入框组件
~~~
