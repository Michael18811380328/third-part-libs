<script setup lang="ts">
import AppHeader from './Header/index.vue'
import RootSider from './RootSider/index.vue'
import SiderBar from './SiderBar/index.vue'
import AppContent from './Content/index.vue'
import Settings from './Settings/index.vue'
import TagsView from './TagsView/index.vue'
import './css/index.scss'

import { useAppStore } from '@/store'
import { computed } from 'vue'

const appStore = useAppStore()
const navbar = computed(() => appStore.navbar)
const menu = computed(() => appStore.menu)
</script>

<template>
  <a-layout class="app-layout" style="min-height: 100vh">
    <a-layout>
      <RootSider />
      <SiderBar v-if="menu" />
      <a-layout>
        <AppHeader v-if="navbar" />
        <TagsView />
        <AppContent />
      </a-layout>
    </a-layout>
  </a-layout>
  <Settings />
</template>
