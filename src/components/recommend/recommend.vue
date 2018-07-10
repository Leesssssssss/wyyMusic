<template>
  <div>
    <div class="wrapper" ref="wrapper">
      <!-- 轮播图 -->
      <!-- <div v-show="bannersList.length" class="decorate" v-if="bannersList.length"></div> -->
      <!-- <div v-if="bannersList.length" class="slider-wrapper">
        <slider>
          <div v-for="banner in bannersList" :key="banner.id">
            <img :src="banner.picUrl">
          </div>
        </slider>
      </div> -->

      <!-- <div class="wrapper">
        <ul class="content">
          <li></li>
        </ul>
      </div> -->

      <!-- 推荐歌单 -->
      <div class="songList">
        <h1 class="songList_text">推荐歌单</h1>
        <div v-if="songList.length" class="songList_box">
          <div v-for="song in songList" :key="song.id" @click="songListDetail(song)">
            <img :src="song.picUrl" alt="">
            <h1 class="songList_name">{{song.name}}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner, getSongList, getSongListDetail } from "../../api/recommend";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      bannersList: [],
      songList: []
    };
  },
  created() {
    this._getBanner();
    this._getSongList();
  },
  methods: {
    _getBanner() {
      getBanner().then(res => {
        this.bannersList = res.data.banners;
      });
    },
    _getSongList() {
      getSongList().then(res => {
        this.songList = res.data.result;
      });
    },
    songListDetail(song) {
      getSongListDetail(song.id).then(res => {
        this.$router.push({ name: 'recommend', params: { id: song.id } });
      });
    }
  }
};
</script>

<style scoped>
.songList_text {
  margin: 20px;
  font-weight: 700;
  font-size: 18px;
}
.songList_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.songList_box img {
  width: 130px;
  height: 130px;
  border-radius: 5px;
}
.songList_name {
  width: 130px;
  font-family: "华文细黑";
  color: #3c3c3c;
  font-size: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
  line-height: 19px;
  letter-spacing: 1px;
}
</style>

