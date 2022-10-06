<script lang="ts" setup>
import View from '@/components/View/index.vue'
import Tinymce from '@/components/Tinymce/index.vue'
import { onActivated, ref } from 'vue'

const content = ref(`
<h3>春江花月夜</h3>
<h4>作者：张若虚</h4>

<div>春江潮水连海平，海上明月共潮生。</div>
<div>滟滟随波千万里，何处春江无月明！</div>
<div>江流宛转绕芳甸，月照花林皆似霰；</div>
<div>空里流霜不觉飞，汀上白沙看不见。</div> 
<div>江天一色无纤尘，皎皎空中孤月轮。</div> 
<div>江畔何人初见月？江月何年初照人？</div> 
<div>人生代代无穷已，江月年年望相似。</div>
<div>不知江月待何人，但见长江送流水。</div>
<div>白云一片去悠悠，青枫浦上不胜愁。</div>
<div>谁家今夜扁舟子？何处相思明月楼？</div>
<div>可怜楼上月徘徊，应照离人妆镜台。</div>
<div>玉户帘中卷不去，捣衣砧上拂还来。</div>
<div>此时相望不相闻，愿逐月华流照君。</div>
<div>鸿雁长飞光不度，鱼龙潜跃水成文。</div>
<div>昨夜闲潭梦落花，可怜春半不还家。</div>
<div>江水流春去欲尽，江潭落月复西斜。</div>
<div>斜月沉沉藏海雾，碣石潇湘无限路。</div>
<div>不知乘月几人归，落月摇情满江树。</div>
`)

const tinymceKey = ref(1)

onActivated(() => {
  tinymceKey.value++
})
</script>
<template>
  <View class="app-text-editor" title="富文本编辑器">
    <a-row :gutter="24">
      <a-col :span="12"><Tinymce :key="tinymceKey" v-model:content="content" :value="content" width="100%" height="440" /></a-col>
      <a-col :span="12">
        <div class="content" v-html="content"></div>
      </a-col>
    </a-row>
  </View>
</template>
<style lang="scss">
.app-text-editor {
  .content {
    padding-top: 5px;
    line-height: 1.8;
  }
}
</style>
