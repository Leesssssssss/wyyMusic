<template>
  <div class="tab">
    <router-link class="tabItem" tag="div" to="/recommend">
      <span>个性推荐</span>
    </router-link>
    <router-link class="tabItem" tag="div" to="/rank">
      <span>排行榜</span>
    </router-link>
    <router-link class="tabItem" tag="div" to="/radio">
      <span>主播电台</span>
    </router-link>
    <router-link class="tabItem" tag="div" to="/singer">
      <span>歌手</span>
    </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.tab {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #d44439;
}
.tabItem {
  color: white;
  font-size: 16px;
}
.tabItem span {
  padding-bottom: 3px;
}
.router-link-active span{
  color: white;
  font-size: 16px;
  font-weight: bolder;
  border-bottom: 2px solid white;
}
</style>
