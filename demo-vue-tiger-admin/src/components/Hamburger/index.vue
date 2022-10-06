<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
// 切换显示侧栏的回调函数
const toggleSiderBar = () => {
  appStore.setCollapsed(!appStore.collapsed)
}
</script>

<template>
  <!-- 汉堡包组件，切换侧栏 -->
  <div className="app-hamburger" @click="toggleSiderBar">
    <a-button size="mini">
      <!-- 根据折叠状态，显示不同的图标 -->
      <icon-menu-unfold v-if="appStore.collapsed" />
      <icon-menu-fold v-else />
    </a-button>
  </div>
</template>

<style>
.app-hamburger {
  cursor: pointer;
  margin-left: 20px;
}
</style>
