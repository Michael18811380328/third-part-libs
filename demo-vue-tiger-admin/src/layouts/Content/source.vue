<script lang="ts" setup>
  import { Gitee } from '@/config/constants'
  import { useRoute } from 'vue-router'
  import { ref, computed } from 'vue'
  import { Position, set, useDraggable } from '@vueuse/core'
  import Right from './right.vue'
  import { useAppStore } from '@/store'

  const visible = ref(false)
  const el = ref<HTMLElement | null>(null)
  const { fullPath } = useRoute()
  // 这是代码源码（点击跳转源码）
  const url = `${Gitee}/blob/master/src/views${fullPath}/index.vue`

  const appStore = useAppStore()
  const settings: any = computed(() => appStore.sourceSettings)

  const x = window.innerWidth - 110
  const y = window.innerHeight - 155

  const { style } = useDraggable(el, {
    initialValue: { x, y },
    onMove(position: Position) {
      settings.value.action === 'y' && (position.x = x)
    },
  })

  const onRight = () => {
    set(visible, true)
  }
</script>

<template>
  <div class="app-source" :class="[settings.action, settings.shape, settings.color]" ref="el" :style="style" @click.right.prevent="onRight">
    <icon-drag-dot-vertical />
    <a :href="url" target="_blank" rel="noopener noreferrer"> &lt; code /&gt;</a>
  </div>
  <Right v-model:visible="visible" />
</template>

<style lang="scss">
  @mixin base-shape {
    width: 110px;
    height: 110px;
    line-height: 110px;
    // transition: all 0.3s linear;
  }
  .app-source {
    position: fixed;
    cursor: move;
    user-select: none;
    width: 110px;
    height: 22px;
    line-height: 20px;
    bottom: 20px;
    font-size: 12px;
    border-radius: 3px;
    background-color: rgba(#000, 0.7);
    z-index: 999;
    transition: none;
    &.red {
      background-color: rgba(var(--red-6), 0.8);
    }
    &.blue {
      background-color: rgba(var(--blue-6), 0.8);
    }
    &.green {
      background-color: rgba(var(--green-6), 0.8);
    }
    &.square {
      @include base-shape;
    }
    &.round {
      @include base-shape;
      border-radius: 110px;
    }
    &.rhomb {
      @include base-shape;
      transform: rotate(45deg);
      a {
        transform: rotate(-45deg);
      }
    }
    .arco-icon {
      color: #bbb;
    }
    a {
      color: #fff;
      display: inline-block;
      text-align: center;
      width: 80%;
      // padding: 0 10px;
      // &:hover {
      // background-color: rgba(#000, 0.9);
      // }
    }
  }
</style>
