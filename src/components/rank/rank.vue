<template>
  <div>
    <div class="rank" v-for="item in rankList" :key="item.id">
      <div class="rankList">

        <div class="songImg">
          <img :src="item.coverImgUrl" alt="">
        </div>
        <div class="songList">
          <div v-for="(songName, index) in item.song" :key="index">
            <span>{{index + 1}}.</span>
            <span>{{songName.name}} - {{songName.ar[0].name}}</span>
          </div>
        </div>

        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRank } from "../../api/rank";

export default {
  data() {
    return {
      rankList: []
    };
  },
  created() {
    this._getRank();
  },
  methods: {
    _getRank() {
      for (var i = 0; i < 18; i++) {
        getRank(i).then(res => {
          var list = res.data.playlist;
          list.song = res.data.playlist.tracks.slice(0, 3);
          this.rankList.push(list);
        });
      }
    }
  }
};
</script>

<style>
.rank {
  margin: 10px;
}
.rankList {
  display: flex;
  flex-wrap: wrap;
}
.songImg {
  width: 120px;
}
.songList {
  flex: 1;
  /* width: 55%; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 30px;
  line-height: 22px;
  font-size: 1rem;
  font-family: "华文细黑";
  color: #3c3c3c;
}
.rank img {
  width: 130px;
  height: 130px;
  border-radius: 5px;
}
.line {
  width: 98%;
  margin: 1% 1%;
  border-bottom: 5px solid #f2f3f4;
}
</style>
