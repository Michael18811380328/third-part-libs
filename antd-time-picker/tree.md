## 目录结构

js 和 jsx 后缀文件省略

~~~
├── README.md 说明文件
├── assets
│   ├── index
│   │   ├── Header.less 选择器头部的样式
│   │   ├── Panel.less 选择器侧栏的样式
│   │   ├── Picker.less 拾取器样式（贝塞尔函数）
│   │   └── Select.less 选择器样式
│   └── index.less 全局的样式
├── examples 案例文件
│   ├── 12hours
│   ├── disabled
│   ├── format
│   ├── hidden
│   ├── open
│   ├── pick-time
│   ├── step
│   └── value-and-defaultValue
├── index.d.ts 声明文件（处理 TS 和JS moment 参数验证）
├── index 入口文件
├── src 主文件
│   ├── index 入口文件
│   ├── Select 时间选择框组件
│   ├── Combobox 组合组件（选择小时、分钟、秒、上下午，回调函数和时间对象的处理）
│   ├── Header 组件头部
│   ├── Panel 组件侧栏组件
│   ├── TimePicker 时间选择组件
│   └── placements 位置对象（四个边的坐标）
├── tests 镜像测试文件（略过）
│   ├── Header.spec
│   ├── Select.spec
│   ├── TimePicker.spec
│   ├── index
│   └── util 测试工具函数
~~~