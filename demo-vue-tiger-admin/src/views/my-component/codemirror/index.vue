<script lang="ts" setup>
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/dracula.css'
import { ref, reactive } from 'vue'

const html = ref(`
var i = 0;
for (; i < 9; i++) {
  console.log(i);
  // more statements
}`)
const cmOptions = reactive({
  mode: 'text/javascript', // Language mode
  theme: 'dracula', // Theme
  lineNumbers: true, // Show line number
  smartIndent: true, // Smart indent
  indentUnit: 2, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  styleActiveLine: true, // Display the style of the selected row
})
</script>
<template>
  <div class="editor-container">
    <a-row gutter="20">
      <a-col span="12"><Codemirror v-model:value="html" :options="cmOptions" class="code-container" /> </a-col>
      <a-col span="12"><v-md-preview-html :v-model="html" preview-class="vuepress-markdown-body" :html="html" /></a-col>
    </a-row>
  </div>
</template>
<style lang="scss">
textarea {
  color: #000;
  resize: none;
}
.code-container {
  border: 1px solid #999;
  font-size: 20px;
}
</style>
