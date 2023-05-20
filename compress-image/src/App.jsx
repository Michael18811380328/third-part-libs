import React from 'react';
import { compressFile } from './compress-img';

class App extends React.Component {

  onChange = (e) => {
    const file = e.target.files[0];
    // 超过 0.5MB 的文件会压缩
    compressFile(file, 0.5).then(res => {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static
      // objectURL = URL.createObjectURL(File or Blob Object);
      var preview = document.querySelector('img');
      // 返回一个 img 对象格式，然后图片需要的是 URL 路径，使用这个方法生成一个路径即可实现
      const url = URL.createObjectURL(res);
      preview.src = url;
      
      // 1s 后在新窗口打开图片
      setTimeout(() => {
        window.open(url);
      }, 1000)
    }).catch(err => {
      console.log(err);
    })
  }

  // 这个可以封装一下函数参数，设置最大上限，然后写一个使用方案
  render() {
    return (
      <>
        <input type="file" onChange={this.onChange}/>
        <img src="" alt=""/>
      </>
    )
  }
}

export default App
