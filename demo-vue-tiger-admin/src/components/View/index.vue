<script lang="ts" setup>
import { useSlots } from 'vue';
const slots = useSlots()
</script>

<!-- 卡片视图的页脚和容器（容器通过 slot 处理） -->
<template>
  <a-card class="app-card-view-container">
    <slot></slot>
    <div class="app-card-view-footer" v-if="slots.footer">
      <slot name="footer"></slot>
    </div>
  </a-card>
</template>

<style lang="scss">
.app-card-view-container {
  .app-card-view-footer {
    position: absolute;
    bottom: 0;
  }
}
</style>
