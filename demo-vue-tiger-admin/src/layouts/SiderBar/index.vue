<script setup lang="ts">
  import { useAppStore, useTagStore } from '@/store'
  import { computed, ref, watch } from 'vue'
  import { RouteLocationNormalized, useRoute, useRouter } from 'vue-router'
  import Icon from '@/components/Icon/index.vue'
  import { set } from '@vueuse/core'
  import SubMenu from './sub-menu.vue'

  const appStore = useAppStore()
  const tagStore = useTagStore()
  const router = useRouter()
  const route = useRoute()
  const menu: any = computed(() => appStore.routes)
  const openKeys = ref<string>('')
  const selectedKeys = ref<string>('')
  
  // 选择面包屑组件 
  const selectBreadcrumb = (routes: any) => routes.map(({ path, meta: { title } }: any) => ({ title, path }))

  // 设置按钮的键
  const setMenuKeys = (r: RouteLocationNormalized) => {
    set(openKeys, r.matched.length >= 2 ? r.matched.slice(-2, -1)[0].path : '')
    set(selectedKeys, r.path)
    const currentMenu = selectBreadcrumb(r.matched)
    const tag = r.matched.slice(-1)[0]
    appStore.setBreadcrumbList(currentMenu)
    tagStore.addTag({ title: tag.meta.title, path: tag.path })
  }

  // 按钮点击回调函数（路由切换到对应的页面）
  const onMenuClick = (key: string) => {
    router.push(key)
  }

  // 监听事件
  watch(() => route, setMenuKeys, {
    immediate: true,
    deep: true,
  })

</script>

<!-- 侧栏组件 -->
<template>
  <a-layout-sider class="app-sider" :collapsed="appStore.collapsed">
    <a-menu :style="{ height: '100%' }" :default-open-keys="[openKeys]" :auto-open-selected="true" :selected-keys="[selectedKeys]" breakpoint="xl" @menu-item-click="onMenuClick">
      <template v-for="nav in menu.children" :key="nav.path">
        <template v-if="nav?.children?.length === 1">
          <a-menu-item :key="nav.path" :title="nav.children[0].meta.title">
            <Icon :type="nav.children[0].meta.icon" />
            <span>{{ nav.children[0].meta.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <a-menu-item v-if="!nav.children" :key="nav.path" :path="nav.path" :title="nav.meta.title">
            <Icon :type="nav.meta.icon" />
            <span class="name">{{ nav.meta.title }} </span>
          </a-menu-item>
          <SubMenu v-else :nav="nav" />
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
