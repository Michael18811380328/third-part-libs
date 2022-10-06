<script setup lang="ts">
  import { Gitee } from '@/config/constants'
  import Hamburger from '@/components/Hamburger/index.vue'
  import FullScreen from '@/components/FullScreen/index.vue'
  import BreadCrumb from '@/components/BreadCrumb/index.vue'
  import useUserStore from '@/store/modules/user'
  import { useRouter } from 'vue-router'
  import { useAppStore } from '@/store'

  const userStore = useUserStore()
  const appStore = useAppStore()
  const router = useRouter()
  const nickname = 'admin'

  // 全局设置打开
  const setVisible = () => {
    appStore.updateSettings({ globalSettings: true })
  }

  // 登出
  const logout = async () => {
    await userStore.logout()
    router.push('/login')
  }
</script>

<template>
  <a-layout-header class="app-header">
    <!-- 汉堡组件和面包屑组件 -->
    <Hamburger />
    <BreadCrumb />
    
    <!-- 帮助菜单 -->
    <div class="app-helper-menu">
      <ul class="header-dropdown-wrap">
        <!-- 全屏 -->
        <li>
          <FullScreen />
        </li>

        <!-- 打开全局设置（设置变成可见） -->
        <li>
          <a-tooltip content="设置">
            <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setVisible">
              <template #icon>
                <icon-settings />
              </template>
            </a-button>
          </a-tooltip>
        </li>

        <li>
          <a-dropdown class="app-overlay-menu" trigger="hover">
            <div>
              <img class="app-header-avatar" alt="avatar" src="@/assets/default-head-02.png" />
              <span className="app-name">{{ nickname }}</span>
            </div>
            <template #content>
              <a-doption>
                <a-space>
                  <icon-home />
                  <a-link @click="$router.push({ name: 'dashboard' })">首页</a-link>
                </a-space>
              </a-doption>
              <a-doption>
                <a-space>
                  <icon-github />
                  <a-link :href="Gitee" target="_blank" rel="noopener noreferrer">项目地址</a-link>
                </a-space>
              </a-doption>
              <a-divider />
              <a-doption @click="logout">
                <a-space>
                  <icon-export />
                  <span>登出</span>
                </a-space>
              </a-doption>
            </template>
          </a-dropdown>
        </li>
      </ul>
    </div>
  </a-layout-header>
</template>
