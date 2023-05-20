/**
 * 压缩图片
 * @param file 需要压缩的文件
 * @param compressThreshold 开启压缩的阈值，默认 5M
 * @param openCompress 是否开启压缩，默认 true
 * @param pictureQuality 压缩比，默认 0.92
 * @returns
 */
export const compressFile = (
  file,
  compressThreshold = 5,
  openCompress = true,
  pictureQuality = 0.92
) => {
  console.log('========== Entry Compress File Function ==========');
  console.log('before compress file: ', file);

  //判断是否是图片类型
  const isAccept = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.type);

  if (!isAccept) {
    //非图片文件,不进行压缩,直接返回原file对象
    return file;
  }

  const fileSize = file.size / 1024 / 1024;
  console.log('before compress, the file size is : ', fileSize.toFixed(2) + ' M');
  //当开启图片压缩且图片大小大于等于压缩阈值,进行压缩
  console.log(fileSize, compressThreshold)


  if (fileSize >= compressThreshold && openCompress) {
    //判断浏览器内核是否支持base64图片压缩
    if (typeof FileReader === 'undefined') {
      return file;
    } else {
      try {
        return new Promise(resolve => {
          //声明FileReader文件读取对象
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            // 生成canvas画布
            const canvas = document.createElement('canvas');
            // 生成img
            // const img = document.createElement('img');
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
              
              //原始图片宽度、高度
              const originImageWidth = img.width, originImageHeight = img.height;
              //默认最大尺度的尺寸限制在（1920 * 1080）
              const maxWidth = 1920, maxHeight = 1080, ratio = maxWidth / maxHeight;
              //目标尺寸
              let targetWidth = originImageWidth, targetHeight = originImageHeight;

              //当图片的宽度或者高度大于指定的最大宽度或者最大高度时,进行缩放图片
              if (originImageWidth > maxWidth || originImageHeight > maxHeight) {
                //超过最大宽高比例
                if (originImageWidth / originImageHeight > ratio) {
                  //宽度取最大宽度值maxWidth,缩放高度
                  targetWidth = maxWidth;
                  targetHeight = Math.round(maxWidth * (originImageHeight / originImageWidth));
                } else {
                  //高度取最大高度值maxHeight,缩放宽度
                  targetHeight = maxHeight;
                  targetWidth = Math.round(maxHeight * (originImageWidth / originImageHeight));
                }
              }

              const ctx = canvas.getContext('2d');
              // canvas对图片进行缩放
              canvas.width = targetWidth;
              canvas.height = targetHeight;
              // 清除画布
              ctx.clearRect(0, 0, targetWidth, targetHeight);
              // 绘制图片
              ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

              // quality值越小,图像越模糊,默认图片质量为0.92
              const imageDataURL = canvas.toDataURL(file.type || 'image/jpeg', pictureQuality);

              // 去掉URL的头,并转换为byte
              const imageBytes = window.atob(imageDataURL.split(',')[1]);

              // 处理异常,将ascii码小于0的转换为大于0
              const arrayBuffer = new ArrayBuffer(imageBytes.length);
              const uint8Array = new Uint8Array(arrayBuffer);

              for (let i = 0; i < imageBytes.length; i++) {
                uint8Array[i] = imageBytes.charCodeAt(i);
              }
              const mimeType = imageDataURL?.split(',')?.[0]?.match(/:(.*?);/)?.[1];
              const newFile = new File([uint8Array], file.name, {
                type: mimeType || 'image/jpeg'
              });
              console.log('after compress, the file size is : ',(newFile.size / 1024 / 1024).toFixed(2) + 'M');
              console.log('after compress file: ', newFile);
              resolve(newFile);
            };
          };
          reader.onerror = () => {
            return file;
          };
        })
        .then(res => {
          return res;
        })
        .catch(() => {
          return file;
        });
      } catch (e) {
        //压缩出错,直接返回原file对象
        return file;
      }
    }
  } else {
    //不需要压缩，直接返回原file对象
    console.log('不进行压缩，返回原始文件')
    return file;
  }
};
