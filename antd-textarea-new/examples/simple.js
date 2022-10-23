import React, { useState } from 'react';
import Textarea from '../src/index';

export default function App() {
  // 使用Hook，设置初始值为空
  const [value, setValue] = useState('');

  // 当文本变化时，改变当前的值（state）
  const onChange = (e) => {
    const {
      target: { value: currentValue },
    } = e;
    setValue(currentValue);
  };

  // 当缩放或者点击回车时，触发回调函数
  const onResize = ({ width, height }) => {
    console.log(`size is changed, width:${width} height:${height}`);
  };

  const onPressEnter = (e) => {
    console.log(`enter key is pressed`);
  };

  return (
    <div>
      <Textarea
        prefixCls="custom-textarea"
        onPressEnter={onPressEnter}
        onResize={onResize}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
