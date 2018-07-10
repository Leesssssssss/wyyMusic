<template>
  <transition name="fade" mode="out-in">
    <div class="songList">
      <div class="songListBackground" :style="{backgroundImage: 'url(' + background + ')' }">
        <div class="songListGray">

          <div class="songListHeader">
            <img src="../../../static/img/back.png" alt="" @click="back">
            <span>歌单</span>
          </div>
          <div class="songListContent">
            <div class="songListName">{{songListName}}</div>
            <div class="creator">
              <img :src="avatarUrl" alt="">
              {{songListCreator}}
            </div>
            <div class="playCount">
              <img src="../../../static/img/listen.png" alt="">
              {{songListPlayCount}}
            </div>
          </div>

        </div>
      </div>

      <div class="bscroll" ref="bscroll">

        <div class="song">
          <div class="runAll">
            <img src="../../../static/img/runblack.png" alt="">
            <span>播放全部</span>
            <span style="color:#8a8a8a;">（共 {{count}} 首）</span>
          </div>
          <div class="line"></div>

          <div v-for="(song, index) in songListDetail.tracks" :key="index">
            <div class="songNameList">
              <div class="index">{{index + 1}}</div>
              <div>
                <div class="songName">{{song.name}}</div>
                <div class="songFrom">{{song.ar[0].name}} - {{song.al.name}}</div>
              </div>
            </div>
            
            <div class="line"></div>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
import { getSongListDetail } from "../../api/recommend";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      songListDetail: [],
      background: "",
      songListName: "",
      avatarUrl: "",
      songListCreator: "",
      songListPlayCount: 0,
      count: 0
    };
  },
  created() {
    this._getSongListDetail();
  },
  mounted() {
    this.$nextTick(() => {
      let bscrollDom = this.$refs.bscroll;
      this.aBScroll = new BScroll(bscrollDom, {});
      console.log(this.aBScroll);
    });
  },
  methods: {
    _getSongListDetail() {
      getSongListDetail(this.$route.params.id).then(res => {
        this.songListDetail = res.data.playlist;
        this.background = res.data.playlist.coverImgUrl;
        this.songListName = res.data.playlist.name;
        this.avatarUrl = res.data.playlist.creator.avatarUrl;
        this.songListCreator = res.data.playlist.creator.nickname;
        this.songListPlayCount = res.data.playlist.playCount;
        this.count = res.data.playlist.tracks.length;
        // console.log(this.songListDetail);
      });
    },
    back() {
      this.$router.push({ path: "/recommend" });
    }
  }
};
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.bscroll {
  /* position: absolute;
  left: 0;
  top: 0;
  overflow: hidden; */
  height: 50%;
  /* position: relative; */
  /* top: -80px; */
}
.songList {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.songListBackground {
  width: 100%;
  height: 50%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.songListGray {
  width: 100%;
  height: 100%;
  background-color: rgba(43, 40, 40, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.songListHeader {
  display: flex;
  align-items: center;
  color: white;
}
.songListHeader img {
  width: 20px;
  height: 20px;
  margin: 10px;
}
.songListContent {
  margin: 0 auto 80px 20px;
}
.songListName {
  color: white;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 5px;
}
.creator {
  display: flex;
  align-items: center;
  color: white;
}
.creator img {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin: 4px;
}
.playCount {
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
}
.playCount img {
  width: 18px;
  height: 18px;
  margin: 7px;
}
.song {
  position: relative;
  top: -80px;
  background: #f2f3f4;
  border-radius: 10px;
}
.runAll {
  display: flex;
  align-items: center;
}
.runAll img {
  width: 25px;
  height: 25px;
  margin: 18px;
}
.songNameList {
  display: flex;
  align-items: center;
}
.index {
  color: #8a8a8a;
  margin: 25px;
}
.songName {
  font-size: 18px;
  margin-bottom: 10px;
}
.songFrom {
  font-size: 14px;
  color: #8a8a8a;
}
.line {
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
}
</style>
