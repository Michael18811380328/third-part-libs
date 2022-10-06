import { HomePath } from '@/config/constants'
import { useStorage } from '@/hooks/core/useStorage'
import { isPlainObject } from '@vue/shared'
import { defineStore } from 'pinia'
import type { TagState } from './types'

export interface ITag {
  // name: string
  path: string
  // fullPath: string
  title: string
}
const fixed = { title: '公告板', path: HomePath }
const { localSet, localGet } = useStorage()

const useTagStore = defineStore('tag', {
  state: (): TagState => {
    const opened: any = localGet({ path: 'tags.opened' })

    return {
      tagList: isPlainObject(opened) ? [fixed] : [...opened],
    }
  },
  getters: {
    tagInfo(state: TagState): TagState {
      return { ...state }
    },
  },

  actions: {
    // Reset tag information
    resetTag() {
      this.$reset()
    },

    save(value: any) {
      localSet({ path: 'tags.opened', value })
    },

    addTag(tag: any) {
      const hasTag = this.tagList.some((item: any) => item.path === tag.path)
      const newTag = hasTag ? this.tagList : [...this.tagList, tag]

      this.tagList = newTag
      this.save(newTag)
    },

    deleteTag(tag: any) {
      const newTag = [...this.tagList.filter((item: any) => item !== tag)]

      this.tagList = newTag
      this.save(newTag)
    },

    emptyTag() {
      const newTag = [...this.tagList.filter((item: any) => item.path === HomePath)]
      this.tagList = newTag
      this.save(newTag)
    },

    closeLeftTags(path: string, index: number) {
      const curIndex = index ?? this.tagList.findIndex((item: any) => item.path === path)
      const newTag = this.tagList.filter((item: any, i: number) => i >= curIndex)

      this.tagList = newTag
      this.save(newTag)
    },

    closeRightTags(path: string, index: number) {
      const curIndex = index ?? this.tagList.findIndex((item: any) => item.path === path)
      const newTag = this.tagList.filter((item: any, i: number) => i <= curIndex)

      this.tagList = newTag
      this.save(newTag)
    },

    closeOtherTag(action: any) {
      const newTag = [...this.tagList.filter((item: any) => item.path === HomePath || item === action.tag)]

      this.tagList = newTag
      this.save(newTag)
    },
  },
})

export default useTagStore
