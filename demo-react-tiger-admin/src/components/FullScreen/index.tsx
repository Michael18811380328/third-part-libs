import React, { useEffect, useState } from 'react';
import screenfull from 'screenfull';
import { message, Tooltip } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import './index.less';

// 处理点击事件
const handleClick = () => {
  // 如果不支持全屏，弹出警告
  if (screenfull.isEnabled) {
    return screenfull.toggle();
  } else {
    message.warning('你的浏览器不支持全屏');
  }
}

const FullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 当变化时，取反
  const onChange = () => {
    setIsFullscreen(screenfull.isFullscreen);
  }

  // 监听变化事件，然后改变全屏状态
  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', onChange);
    }
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', onChange);
      }
    }
  }, [])

  const title = isFullscreen ? '退出全屏' : '全屏';

  return (
    <div className="app-fullscreen" onClick={handleClick}>
      <Tooltip title={title}>
        <div>
          {
            isFullscreen ? <FullscreenExitOutlined/> : <FullscreenOutlined/>
          }
        </div>
      </Tooltip>
    </div>
  );
}

export default FullScreen;
