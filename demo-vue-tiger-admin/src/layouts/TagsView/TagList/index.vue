<script lang="ts" setup>
import { useTagStore } from '@/store'
import { computed, ref, watch } from 'vue'
import { HomePath } from '@/config/constants'
import type { ITag } from '@/store/modules/tag'
import { useRoute, useRouter } from 'vue-router'
import { set } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const tagStore = useTagStore()
const tagList: any = computed(() => tagStore.tagList)
const pathname = ref(router.currentRoute.value.path)
const tagListCls = (tag: ITag) => [{ 'tag-active': pathname.value === tag.path }, { 'tag-home': HomePath === tag.path }]
const closable = (tag: ITag) => tag.path !== HomePath

// 监听事件（三个参数）
watch(
  () => route.path,
  (val: any) => {
    set(pathname, val)
  },
  {
    immediate: true,
    deep: true,
  }
)

// 点击回调函数：切换路由
const handleClick = (path: string) => {
  router.push(path)
}

const toRid = (tag: ITag) => {
  const { path } = tag
  let to = HomePath
  if (path === pathname.value) {
    // 处理关闭当前标签
    tagList.value.some((item: any, index: number) => {
      if (item.path === path) {
        to = index < tagList.value.length - 1 ? tagList.value[index + 1]?.path : tagList.value[index - 1]?.path
        return true
      }
      return false
    })
    router.push(to)
  }
}

// 关闭回调事件
const onClose = (tag: ITag) => {
  toRid(tag)
  tagStore.deleteTag(tag)
}

// 点击菜单回调事件
const onContextMenu = (val: string, tag: any, index: number) => {
  switch (val) {
    case '1':
      tagStore.closeRightTags(tag.path, index)
      break
    case '2':
      tagStore.closeOtherTag({ tag })
      break
    case '3':
      tagStore.emptyTag()
      break
    default:
      console.log('default')
  }
}
</script>

<!-- 标签列表 -->
<template>
  <ul class="tags-wrap">
    <li v-for="(tag, index) in tagList" :key="tag.path" :class="tagListCls(tag)">
      <a-dropdown trigger="contextMenu" :style="{ display: 'block' }" @select="(v: any) => onContextMenu(v, tag, index)">
        <a-tag :closable="closable(tag)" @close="onClose(tag)" @click="handleClick(tag)">
          <template v-if="tag.path === HomePath"><icon-home /></template>
          <template v-else>{{ tag.title }}</template>
        </a-tag>
        <template #content>
          <a-doption value="1">关闭右侧</a-doption>
          <a-doption value="2">关闭其它</a-doption>
          <a-doption value="3">关闭全部</a-doption>
        </template>
      </a-dropdown>
    </li>
  </ul>
</template>

<style lang="scss"></style>
