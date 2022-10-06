<script lang="ts" setup>

// 富文本编辑器组件
import { onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'
import { useEditor } from '@/hooks/core/useEditor'
import Settings from './settings'
import { useScriptTag } from '@vueuse/core'

// 定义 props 数据类型
const props = defineProps({
  id: String,
  width: String,
  height: String,
  value: String,
  disabled: Boolean,
  debug: Boolean,
})

// 这个 API 不太熟
const emit = defineEmits(['onClick', 'update:content']);

// ID 是常量+时间戳
const tinymceId = props.id || 'vue-tinymce-' + new Date();

const { toolbar, plugins } = Settings;

const BaseUrl = import.meta.env.VITE_BASE_URL as string

// 这里引入 tinymce4.7.5 这个库实现富文本编辑器功能（加入时间戳的目的是避免缓存）
const SCRIPT_URL = BaseUrl + '/tinymce4.7.5/tinymce.min.js?&t=' + new Date().getTime();

// 创建富文本编辑器的实例
const editor = useEditor({
  ...props,
  tinymceId,
  toolbar,
  plugins,
  BaseUrl,
  value: props.value,
  emit,
})

// vue 的生命周期函数
onMounted(async () => {
  // 组件加载后，初始化组件
  const { load } = useScriptTag(SCRIPT_URL, () => {}, {
    manual: true,
  })
  await load()

  editor.initTinymce()
})

// 当活跃状态，初始化编辑器
onActivated(() => {
  editor.initTinymce()
})

// 当取消活跃状态或者卸载组件时，卸载这个富文本编辑器
onDeactivated(() => {
  editor.destroyTinymce()
})

onUnmounted(() => {
  editor.destroyTinymce()
})
</script>

<template>
  <div class="tinymce-container editor-container">
    <!-- 编辑富文本的区域 -->
    <textarea :id="tinymceId" class="tinymce-textarea"></textarea>
    <div class="editor-custom-btn-container">
      <!-- <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" /> -->
    </div>
  </div>
</template>

<style lang="scss">
.tinymce-container {
  position: relative;
}
.tinymce-container ::v-deep(.mce-fullscreen) {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 10px;
  top: 2px;
  /*z-index: 2005;*/
}
.editor-upload-btn {
  display: inline-block;
}
</style>
