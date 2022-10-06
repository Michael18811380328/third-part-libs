<!-- 面包屑组件 -->

<script lang="ts" setup>
// 引入存储和计算 api
import { useAppStore } from '@/store';
import { computed } from 'vue';

// 获取存储的实例 并拿到面包屑列表
const appStore = useAppStore();
const breadcrumbList: any = computed(() => appStore.breadcrumbList)
</script>

<template>
  <div class="app-breadcrumb">
    <a-breadcrumb>
      <!-- 这里从 breadcrumbList 循环渲染组件，并增加 index -->
      <a-breadcrumb-item
        v-for="(bread, index) in breadcrumbList"
        :key="index"
      >
        {{ bread.title }}
      </a-breadcrumb-item>
      <!-- 渲染分割线 -->
      <template #separator>
        <icon-right />
      </template>
    </a-breadcrumb>
  </div>
</template>

<style lang="scss">
.app-breadcrumb {
  display: inline-block;
  margin-left: 20px;
  .ant-breadcrumb {
    line-height: 64px;
  }
}
</style>

<!--
Vue 和 jsx 的对比：
vue 设计组件比较方便，一个组件对应的 HTML CSS JS 可以写入一个文件，便于维护，也避免了 css 互相引用影响的问题
具体 2 或者 3 版本中的 API 变化比较多，应该把常用的 API 经常翻看一下
-->
