<template>
  <div id="app">
    <headers></headers>
    <tab></tab>

    <!-- 渲染匹配的组件 -->
    <router-view></router-view>
    
  </div>
</template>

<script>
import Headers from './components/headers/headers.vue'
import Tab from './components/tab/tab.vue'

export default {
  components: {
    Headers,
    Tab
  }
}
</script>

<style>
#app {
  /* position: fixed;
  top: 0; */
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
