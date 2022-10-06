<script lang="ts" setup name="TableToolBar">
import { set } from '@vueuse/core'

// props 使用接口验证
export interface ToolBarProps {
  showSearch: boolean
  columns?: any
}

// 默认 props 的值
const props = withDefaults(defineProps<ToolBarProps>(), {
  showSearch: true,
  columns: [],
})

// 是否显示弹出层
const open = ref(false)
const emit = defineEmits(['update:showSearch', 'query-table']);
const show = () => emit('update:showSearch', !props.showSearch);

// 搜索
const toggleSearch = () => {
  show()
}

// 刷新
const refresh = () => {
  emit('query-table')
}

// 打开显隐列对话框
const showColumn = () => {
  set(open, true)
}
</script>

<template>
<!-- 表格工具栏 -->
  <div class="app-table-action-button">
    <a-space :size="15">
      <!-- 搜索按钮 -->
      <a-tooltip class="item" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
        <a-button shape="circle" @click="toggleSearch()">
          <template #icon>
            <icon-search />
          </template>
        </a-button>
      </a-tooltip>
      <!-- 刷新按钮 -->
      <a-tooltip class="item" content="刷新" placement="top">
        <a-button shape="circle" @click="refresh()">
          <template #icon>
            <icon-refresh />
          </template>
        </a-button>
      </a-tooltip>
      <!-- 隐藏显示列按钮 -->
      <a-tooltip class="item" content="显隐列" placement="top" v-if="columns">
        <a-button shape="circle" @click="showColumn()">
          <template #icon>
            <icon-list />
          </template>
        </a-button>
      </a-tooltip>
    </a-space>
  </div>
</template>
