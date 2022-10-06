<script lang="ts" setup>
import { useAppStore } from '@/store'
import item from './item.vue'

interface Porps {
  title: string
  options: any
}

const props = defineProps<Porps>()

const appStore = useAppStore()

// 切换列的回调函数（然后改动页面的类名，并存储）
const handleChange = ({ key, value }: { key: string; value: string }) => {
  if (value && key === 'colorWeek') {
    document.body.classList.add('app-color-week')
    document.body.setAttribute('arco-theme', 'dark')
  }
  if (!value && key === 'colorWeek') {
    document.body.classList.remove('app-color-week')
    document.body.removeAttribute('arco-theme')
  }
  appStore.updateSettings({ [key]: value })
}
</script>

<template>
  <div class="app-settings-column">
    <h5 class="title">{{ props.title }}</h5>
    <a-space direction="vertical" fill>
      <div v-for="option in props.options" :key="option.name" class="switch-wrapper">
        <span>{{ option.name }}</span>
        <item :type="option.type || 'switch'" :name="option.key" :default-value="option.defaultVal" @input-change="handleChange" />
      </div>
    </a-space>
  </div>
</template>

<style lang="scss">
.title {
  margin: 10px 0;
  padding: 0;
  font-size: 16px;
}
.switch-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
}
</style>
