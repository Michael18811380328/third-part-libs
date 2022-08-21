import { useMount, useBoolean } from 'ahooks';
import { message } from 'antd';
import React from 'react';

const MyComponent = () => {
  // 只在组件初始化时执行的 Hook。
  useMount(() => {
    message.info('mount');
  });

  return <div>Hello World</div>;
};

export default () => {
  const [state, { toggle }] = useBoolean(false);

  return (
    <>
      <button type="button" onClick={toggle}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};
