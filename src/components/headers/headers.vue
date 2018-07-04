<template>
  <div class="header">
    <img class="headerImg" src="../../../static/img/category.png" alt="">
    <h1 class="text">MUSIC</h1>
    <img class="headerImg" src="../../../static/img/search-sm.png" alt="">
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.header {
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #d44439;
}
.headerImg {
  width: 25px;
  height: 25px;
  margin: 10px;
}
.text {
  font-size: 24px;
  font-family: 'Times New Roman', Times, serif;
  color: white;
  letter-spacing: 3px;
}
</style>
