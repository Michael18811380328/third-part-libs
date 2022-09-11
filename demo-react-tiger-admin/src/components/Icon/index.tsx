import React from 'react';
import * as Icons from '@ant-design/icons';
import { isValidKey } from '@/utils';

type IProps = {
  [type: string]: string
}

export default function Icon(props: IProps) {
  const { type } = props;
  // 这里应该是原作者故意这样写（实际可以使用 jsx 完成）
  let dynamicIcon = React.createElement('div');
  if (isValidKey(type, Icons)) {
    dynamicIcon = React.createElement(
      Icons[type],
      props,
    );
  }
  return <>{dynamicIcon}</>;
}
