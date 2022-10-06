<!-- 页脚组件 -->

<script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  // 这是工具函数
  import { set } from '@vueuse/core';

  const content = ref();
  // 页脚获取古诗
  const getPoem = () => {
    const t = new Date().getTime();
    const url = 'https://v2.jinrishici.com/one.json?client=browser-sdk/1.2?t=' + t;
    axios.get(url).then(res => {
      // 把获取的结果设置到页面中
      set(content, res.data.data.content);
    })
  }
  // 初始化获取古诗
  getPoem();
  // 页面刷新的回调函数
  const onRefresh = () => {
    getPoem();
  }
</script>

<template>
  <a-layout-footer class="app-footer">
    <a-space>
      <!-- 显示今日诗句 -->
      <div id="jinrishici-sentence">
        <template v-if="!content">加载今日诗句中......</template>
        {{ content }}
      </div>
      <!-- 点击重新加载 -->
      <icon-refresh @click="onRefresh" class="app-refresh" />
    </a-space>
  </a-layout-footer>
</template>

<!-- scoped 表示样式只存在这个组件，组件作用域（它的 CSS 只会影响当前组件的元素） -->
<style lang="scss" scoped>
.app-footer {
  color: #555;
}
.app-refresh {
  cursor: pointer;
  color: #666;
}
</style>
