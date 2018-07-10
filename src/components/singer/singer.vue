<template>
  <div>
    <ul>
      <li class="singerList" v-for="singer in singers" :key="singer.id">
        <img :src="singer.picUrl" alt="">
        <span class="singerName">{{singer.name}}</span>
      </li>
    </ul>

    
  </div>
</template>

<script>
import { getSinger } from '../../api/singer'

export default {
  data() {
    return {
      singers:[]
    } 
  },
  created() {
    this._getSinger();
  },
  methods: {
    _getSinger() {
      getSinger().then(res => {
        this.singers = res.data.artists;
        console.log(this.singers);
      });
    }
  }
}
</script>

<style scoped>
.singerList {
  display: flex;
  align-items: center;
}
.singerList img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin: 10px;
}
.singerName {
  font-size: 17px;
  font-family: "华文细黑";
  font-weight: 600;
  color: #3c3c3c;
  margin-left: 30px;
}
</style>
