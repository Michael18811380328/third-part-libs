<!-- 全屏组件 -->
<script setup lang="ts">
  import { reactive, toRefs } from 'vue';
  // 这是一个全屏展示的第三方库
  import Screenfull from 'screenfull';
  // reactive 返回一个对象的响应式代理。
  // https://cn.vuejs.org/api/reactivity-core.html#reactive
  const state = reactive({
    title: '全屏',
    icon: true,
  });
  // toRefs https://cn.vuejs.org/api/reactivity-utilities.html#torefs
  // 将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 toRef() 创建的。
  // 当从组合式函数中返回响应式对象时，toRefs 相当有用。使用它，消费者组件可以解构/展开返回的对象而不会失去响应性：
  const { icon, title } = toRefs(state);
  // 切换全屏的回调函数
  const handleFullScreen = () => {
    if (!Screenfull.isEnabled) return false;
    Screenfull.toggle();
    const isFullscreen = Screenfull.isFullscreen;
    state.icon = isFullscreen;
    state.title = isFullscreen ? '全屏' : '退出';
  }
</script>

<template>
<!-- 点击切换全屏效果 -->
  <div class="app-fullscreen" @click="handleFullScreen">
    <a-tooltip :content="title">
      <a-button type="outline" :shape="'circle'">
        <!-- 根据状态渲染不同的图标 -->
        <icon-fullscreen v-if="icon" />
        <icon-fullscreen-exit v-else />
      </a-button>
    </a-tooltip>
  </div>
</template>
