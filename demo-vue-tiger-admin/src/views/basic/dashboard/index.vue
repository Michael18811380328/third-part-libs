<script setup lang="ts">
import View from '@/components/View/index.vue'

const title = 'dashboard'
const data = [
  {
    label: 'Name',
    value: 'Socrates',
  },
  {
    label: 'Mobile',
    value: '123-1234-1234',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
  {
    label: 'Residence',
    value: 'Beijing',
  },
  {
    label: 'Hometown',
    value: 'Beijing',
  },
  {
    label: 'Address',
    value: 'Yingdu Building, Zhichun Road, Beijing',
  },
]
</script>

<!-- 信息面板 -->
<template>
  <a-space direction="vertical" :size="15">
    <View style="min-height: 150px" class="app-dashboard">
      <a-descriptions :data="data" title="项目信息" />
    </View>
    <View title="项目信息" style="min-height: calc(100vh - 320px)" class="app-dashboard">211212 {{ title }}</View>
  </a-space>
</template>
<style></style>
