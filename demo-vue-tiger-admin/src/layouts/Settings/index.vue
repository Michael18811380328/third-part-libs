<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store'
import Column from './column.vue'

// 如果 visible 那么现实设置栏
const appStore = useAppStore()
const visible = computed(() => appStore.globalSettings)

// 一个是内容的设置，一个是样式的设置
const contentOpts = [
  { name: '导航栏', key: 'navbar', defaultVal: true },
  { name: '菜单栏', key: 'menu', defaultVal: true },
]

const othersOpts = [
  { name: '暗黑模式', key: 'colorWeek', defaultVal: false }
];

// 点击关闭设置栏
const handleCancel = () => {
  appStore.updateSettings({ globalSettings: false })
}

</script>

<template>
  <a-drawer :visible="visible" @cancel="handleCancel" unmount-on-close :footer="false">
    <template #title>全局配置</template>
    <Column :options="contentOpts" title="内容区域" />
    <a-divider class="app-drawer-div" />
    <Column :options="othersOpts" title="其它设置" />
  </a-drawer>
</template>

<style lang="scss">
.arco-drawer {
  .arco-drawer-header {
    display: none;
  }
}
.app-drawer-div {
  border-bottom-style: dashed;
  margin: 10px 0 15px;
}
</style>
