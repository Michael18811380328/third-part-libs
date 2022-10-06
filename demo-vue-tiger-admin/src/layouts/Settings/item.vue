<script lang="ts" setup>

interface Props {
  type: string
  name: string
  defaultValue: string | boolean | number
}
const props = defineProps<Props>()
const emit = defineEmits(['inputChange'])

const handleChange = (value: unknown) => {
  emit('inputChange', { value, key: props.name })
}
</script>

<template>
  <a-input-number v-if="type === 'number'" :style="{ width: '80px' }" size="small" :default-value="defaultValue" @change="handleChange" />
  <a-switch v-else :default-checked="defaultValue" size="small" @change="handleChange" />
</template>
