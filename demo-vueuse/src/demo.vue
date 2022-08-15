<template>
  <div id="app">
    <h1>使用 Vue3 + VueUse</h1>
    <!-- 界面显示鼠标的位置 -->
    <h3>Mouse position {{x}} {{y}}</h3>
    <!-- 界面显示计数器次数 -->
    <h3>Counter times {{count}}</h3>
    <!-- 点击触发增加或者减少次数 -->
    <a @click='increase()'>+</a>
    <br/>
    <a @click='decrease()'>-</a>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useMouse, useCounter, useLocalStorage, usePreferredDark } from '@vueues/core';

export default {
  setup() {
    // 获取鼠标的位置
    const { x, y } = useMouse();

    // 计数器设置变量和增减
    const { count, inc, dec } = useCounter();

    // is user prefers dark theme
    const isDark = usePreferredDark()

    // persist state in localStorage
    const store = useLocalStorage(
      'my-storage',
      {
        name: 'Apple',
        color: 'red',
      },
    )

    return {
      x,
      y,
      count,
      increase: inc,
      decrease: dec,
      isDark,
      store,
    };
  }
}
</script>

<style scoped>
</style>
