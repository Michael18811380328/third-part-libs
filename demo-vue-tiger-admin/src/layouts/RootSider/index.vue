<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { rootRoutes } from '@/router'
  import { useRouter } from 'vue-router'
  import Icon from '@/components/Icon/index.vue'
  import { routes } from '@/router'
  import { useAppStore } from '@/store'

  // 获取存储和路由
  const appStore = useAppStore()
  const router = useRouter()
  const collapsed = ref(false)
  const openedMenu = computed(() => router.currentRoute.value.matched[0].path)

  // 点击按钮毁掉函数
  const handleMenu = (path: string) => {
    setPath(path)
    router.push(path)
  }

  // 获取当前的菜单
  const getCurrentMenu = (routers: any, path: string) => {
    return routers.find((item: any) => item.path === path)
  }

  // 设置路径
  const setPath = (path: string) => {
    const current = getCurrentMenu(routes, path)
    current && appStore.setRoutes(current)
  }

  setPath(router.currentRoute.value.matched[0].path)
</script>

<template>
  <a-layout-sider style="width: 100px" class="app-root-sider">
    <a-menu theme="dark" :collapsed="collapsed" :default-selected-keys="[openedMenu]" @menu-item-click="handleMenu">
      <a-menu-item v-for="item in rootRoutes" :key="item.path">
        <Icon :type="item.icon" />
        <span class="name">{{ item.name }} </span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
