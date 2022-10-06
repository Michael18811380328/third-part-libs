<script lang="ts" setup>
import Source from './source.vue'
</script>

<template>
  <a-layout-content class="app-layout-content">
    <router-view v-slot="{ Component }">
      <!-- 这里是几种不同的变换效果（类名） -->
      <transition name="fade-transform" mode="out-in">
        <!-- <transition name="fade" mode="out-in"> -->
        <!-- <transition name="zoom-in-top" mode="out-in"> -->
        <!-- <transition name="fade-slide" mode="out-in"> -->
        <component :is="Component" />
      </transition>
    </router-view>
  </a-layout-content>
  <!-- 下面渲染源内容 -->
  <Source />
</template>
