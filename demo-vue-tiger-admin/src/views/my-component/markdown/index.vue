<script lang="ts" setup>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ref } from 'vue'

const text = ref(`
## 虞美人·春花秋月何时了
### 李煜

春花秋月何时了？
往事知多少。
小楼昨夜又东风，
故国不堪回首月明中。

雕栏玉砌应犹在，
只是朱颜改。
问君能有几多愁？
恰似一江春水向东流。
`)
// const text = `::: tip
//   你可以点击 toolbar 中的 tip 来快速插入
// :::

// ::: warning
//   这是一段警告
// :::

// ::: danger
//   这是一个危险警告
// :::

// ::: details
//   这是一个详情块，在 IE / Edge 中不生效
// :::

// ::: tip 自定义标题
//   你也可以自定义块中的标题
// :::

// ::: danger STOP
//   危险区域，禁止通行
// :::
// `
const onUploadImg = (files: any) => {
  console.log(Array.from(files))
}
</script>
<template>
  <a-card class="app-markdown">
    <md-editor v-model="text" theme="dark" style="height: calc(100vh - 200px)" @on-upload-img="onUploadImg" />
  </a-card>
</template>
<style lang="scss"></style>
