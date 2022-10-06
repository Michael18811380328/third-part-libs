// interface Options {
//   value?: string
//   tinymceId: string
//   BaseUrl: string
//   width?: string | number
//   height?: string | number
//   toolbar: Array<string>
//   plugins: Array<string>
//   emit: any
// }


// 新建编辑器选项的接口（定义类型）
interface Options {
  value?: string
  tinymceId: string
  BaseUrl: string
  width?: string | number
  height?: string | number
  toolbar: Array<string>
  plugins: Array<string>
  emit: any
}

// 这里借用第三方富文本编辑器实现功能（传参即可）
export function useEditor({ value, tinymceId, width, height, toolbar, plugins, emit, BaseUrl }: Options) {
  // 初始化编辑器
  function initTinymce() {
    window.tinymce.init({
      selector: `#${tinymceId}`,
      width,
      height,
      language: 'zh_CN',
      body_class: 'panel-body ',
      object_resizing: false,
      // toolbar: toolbar.length > 0 ? toolbar : toolbar, // 没有必要这样写
      toolbar,
      menubar: true,
      plugins,
      end_container_on_empty_block: true,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      default_link_target: '_blank',
      skin_url: BaseUrl + '/tinymce4.7.5/skins/lightgray',
      link_title: false,
      init_instance_callback: (editor: any) => {
        if (value) {
          editor.setContent(value)
        }
        editor.on('NodeChange Change KeyUp SetContent', () => {
          emit('update:content', editor.getContent())
        })
      },
    })
  }

  // 销毁编辑器(卸载编辑器)
  // function destroyTinymce() {
  //   if (window.tinymce.get(tinymceId)) {
  //     window.tinymce.get(tinymceId).destroy()
  //   }
  // }
  function destroyTinymce() {
    if (window.tinymce.get(tinymceId)) {
      window.tinymce.get(tinymceId).destroy();
    }
  }

  // 设置编辑器内容
  // function setContent(value: string) {
  //   window.tinymce.get(tinymceId).setContent(value)
  // }
  function setContent(value: string) {
    if (window.tinymce.get(tinymceId)) {
      window.tinymce.get(tinymceId).setContent(value);
    }
  }

  // 获取编辑器内容
  // function getContent() {
  //   window.tinymce.get(tinymceId).getContent()
  // }
  function getContent() {
    window.tinymce.get(tinymceId).getContent();
  }

  // 处理图片（插入图片到富文本编辑器中）
  // function imageSuccessCBK(arr: Array<string>) {
  //   arr.forEach((v: any) => {
  //     window.tinymce.get(tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
  //   })
  // }
  function imageSuccessCBK(arr: Array<string>) {
    arr.forEach((v: any) => {
      window.tinymce.get(tinymceId).insertContent(`<img class="wscnph src="${v.url}" />`);
    });
  }

  // 对外暴露相关的函数和方法
  return {
    initTinymce,
    destroyTinymce,
    setContent,
    getContent,
    imageSuccessCBK,
  }
}
