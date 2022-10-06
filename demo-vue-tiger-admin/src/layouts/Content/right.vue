<script lang="ts" setup>
import { watch, ref, unref, computed, reactive } from 'vue'
import { set } from '@vueuse/core'
import { Message } from '@arco-design/web-vue'
import { useAppStore } from '@/store'

// props 是否可见-布尔值
interface Props {
  visible: boolean
}

const appStore = useAppStore()
const show = ref(false)
const props = defineProps<Props>()

// 观察者
watch(
  () => props.visible,
  (val: boolean) => {
    set(show, val)
  }
)

const emit = defineEmits(['update:visible'])
const close = () => emit('update:visible', false)

const formRef = ref<any>(null)
const handleCancel = () => {
  close()
}

const sourceSettings: any = computed(() => appStore.sourceSettings)
const formData = reactive(sourceSettings)

// 表单提交前验证
const handleBeforeOk = async (done: (closed: boolean) => void) => {
  const form = unref(formRef);
  // 验证表单有效性
  form
    .validate(async (valid: any) => {
      if (valid) return false
      console.log(formData)
      // 把表单数据保存（正常情况是发送网络请求）
      appStore.setSourceSettings(formData)
      Message.success('设置成功')
      done(true)
      close()
    })
    .catch((error: any) => {
      console.log('error', error)
    })
    .finally(() => {
      done(false)
    })
}
// 表单关闭后回调函数
const afterClose = () => {
  console.log('afterClose')
}
</script>

<template>
  <a-modal v-model:visible="show" :on-before-ok="handleBeforeOk" @cancel="handleCancel" @close="afterClose">
    <template #title>按钮设置</template>
    <a-form ref="formRef" :model="formData">
      <a-form-item field="action" label="拖动方式" :hide-asterisk="true" :show-colon="true" :rules="[{ required: true, message: '至少选一个' }]" :validate-trigger="['change']">
        <a-radio-group v-model="formData.action">
          <a-radio value="y">沿 Y 轴拖动</a-radio>
          <a-radio value="freedom">自由拖动</a-radio>
          <!-- <a-radio value="physics">物理运动</a-radio> -->
        </a-radio-group>
      </a-form-item>
      <a-form-item field="shape" label="形状" :hide-asterisk="true" :show-colon="true" :rules="[{ required: true, message: '至少选一个' }]" :validate-trigger="['change']">
        <a-radio-group v-model="formData.shape">
          <a-radio value="rect">长方形</a-radio>
          <a-radio value="square">正方形</a-radio>
          <a-radio value="round">圆形</a-radio>
          <a-radio value="rhomb">菱形</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item field="color" label="颜色" :hide-asterisk="true" :show-colon="true" :rules="[{ required: true, message: '至少选一个' }]" :validate-trigger="['change']">
        <a-radio-group v-model="formData.color">
          <a-radio value="black">黑色</a-radio>
          <a-radio value="blue">蓝色</a-radio>
          <a-radio value="green">绿色</a-radio>
          <a-radio value="red">红色</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<style lang="scss"></style>
