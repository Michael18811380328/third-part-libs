<script lang="ts" setup name="SubMenu">
import { toRef } from 'vue'
import Icon from '@/components/Icon/index.vue'

interface MenuProps {
  nav: any
}
const props = defineProps<MenuProps>()
const nav = toRef(props, 'nav')
</script>

<!-- 递归渲染次级菜单 -->
<template>
  <a-sub-menu :key="nav.path">
    <template #title>
      <span>
        <Icon :type="nav.meta.icon" />
        <span>{{ nav.meta.title }}</span>
      </span>
    </template>
    <template v-for="(item, index) in nav.children">
      <a-menu-item v-if="!item.children" :key="item.path" :title="item.meta.title">
        <span class="app-menu-item-inner-title">
          <Icon :type="item.meta.icon" />
          {{ item.meta.title }}
        </span>
      </a-menu-item>
      <SubMenu v-else :key="index" :nav="item" />
    </template>
  </a-sub-menu>
</template>

<style lang="scss"></style>
