<template>
  <transition name="fade" mode="out-in">
    <div class="search">
      <!-- 搜索头部 -->
      <div class="searchHeader">
        <img src="../../../static/img/back.png" alt="" @click="back">
        <input class="inputText" type="text" placeholder="搜索音乐、歌手、歌单、电台" v-model="inputText">
      </div>

      <!-- 选择搜索的内容是单曲、歌手、歌单还是电台 -->
      <ul v-show="tab" class="tab">
        <li v-for="(list, index) in list" :class="{'active':ind === index}" @click="changeClass(index)">{{list}}</li>
      </ul>

      <div class="searchBox">

        <!-- 热门搜索内容 -->
        <div v-show="hotSearch" class="hotSearch">
          <div class="hot">热门搜索</div>
          <div class="hotList">
            <div class="hotListItem" v-for="hot in hotList">{{hot.first}}</div>
          </div>
        </div>

        <!-- 下面关于搜索不同类目的地方写的贼麻烦，又懒得改，望见谅 -->
        <!-- 搜索单曲 -->
        <!-- <div class="bscroll" ref="bscroll"> -->
          <div v-show="danqu" v-for="song in songs">
            <div class="danqu">
              <div class="songName">{{song.name}}</div>
              <div class="songFrom">{{song.artists[0].name}} - {{song.album.name}}</div>
            </div>

            <div class="line"></div>
          </div>
        <!-- </div> -->

        <!-- 搜索歌手 -->
        <!-- <div class="bscroll" ref="bscroll"> -->
          <div v-show="geshou" v-for="artist in artists">
            <div class="geshou">
              <img :src="artist.picUrl" alt="">
              <span class="geshouName">{{artist.name}}</span>
            </div>

            <div class="line"></div>
          </div>
        <!-- </div> -->

        <!-- 搜索歌单 -->
        <!-- <div class="bscroll" ref="bscroll"> -->
          <div v-show="gedan" v-for="playlist in playlists">
            <div class="gedan">
              <img :src="playlist.coverImgUrl" alt="">
              <div>
                <div class="gedanName">{{playlist.name}}</div>
                <div class="gedanFrom">{{playlist.trackCount}}首音乐  by {{playlist.creator.nickname}}，播放{{playlist.playCount}}次</div>
              </div>
            </div>

            <div class="line"></div>
          </div>
        <!-- </div> -->

        <!-- 搜索电台 -->
        <!-- <div class="bscroll" ref="bscroll"> -->
          <div v-show="diantai" v-for="djRadio in djRadios">
            <div class="diantai">
              <img :src="djRadio.picUrl" alt="">
              <div>
                <div class="diantaiName">{{djRadio.name}}</div>
                <div class="diantaiFrom">{{djRadio.dj.nickname}}</div>
              </div>
            </div>

            <div class="line"></div>
          </div>
        <!-- </div> -->

      </div>
    </div>
  </transition>
</template>

<script>
import { getHotSearch, getSearch } from '../../api/search.js'
import BScroll from "better-scroll"

export default {
  data() {
    return {
      hotList: [],
      inputText: '',
      tab: false,
      hotSearch: true,
      list: ['单曲', '歌手', '歌单', '电台'],
      ind: 0,
      danqu: false,
      songs: [],
      geshou: false,
      artists: [],
      gedan: false,
      playlists: [],
      diantai: false,
      djRadios: []
    }
  },
  created() {
    this._getHotSearch();
  },
  watch: {
    inputText: function(val, oldval) {
      if (val !== ''){
        this.ind = 0;
        this.tab = this.danqu = this.geshou = this.gedan = this.diantai = true;
        this.hotSearch = false;
        getSearch(1, this.inputText).then(res => {
          this.songs = res.data.result.songs;
          // console.log(this.songs);
        });
      } else {
        this.hotSearch = true;
        this.tab = this.danqu = this.geshou = this.gedan = this.diantai = false;
      }
    }
  },
  methods: {
    _getHotSearch() {
      getHotSearch().then(res => {
        this.hotList = res.data.result.hots;
      });
    },
    back() {
      this.$router.push({ path: "/recommend" });
    },

    // 根据选择搜索的不同类目调用不同的api地址获取数据，并改变当前选中的类目样式
    changeClass(index) {
      this.ind = index;
      // ind === 0代表搜索单曲，1代表搜索歌手，2代表搜索歌单，3代表搜索电台
      if (this.ind === 1) {
        this.danqu = this.gedan = this.diantai = false;
        this.geshou = true;
        getSearch(100, this.inputText).then(res => {
          this.artists = res.data.result.artists;
        });
      } else if (this.ind === 2) {
        this.danqu = this.geshou = this.diantai = false;
        this.gedan = true;
        getSearch(1000, this.inputText).then(res => {
          this.playlists = res.data.result.playlists;
        });
      } else if (this.ind === 3) {
        this.danqu  = this.geshou = this.gedan = false;
        this.diantai = true;
        getSearch(1009, this.inputText).then(res => {
          this.djRadios = res.data.result.djRadios;
        });
      } else if (this.ind === 0) {
        this.geshou = this.gedan = this.diantai = false;
        this.danqu = true;
        getSearch(1, this.inputText).then(res => {
          this.songs = res.data.result.songs;
        });
      }
    }
  }
}
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
.search {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.searchHeader {
  width: 100%;
  height: 44px;
  background: #d44439;
  display: flex;
  align-items: center;
}
.searchHeader img {
  width: 20px;
  height: 20px;
  margin: 10px;
}
.inputText {
  width: 80%;
  height: 30px;
  background: #d44439;
  color: white;
  outline: none;
  border-bottom: 1px solid #eeb4af;
}
.searchBox {
  background: #f2f3f4;
  width: 100%;
  height: 100%;
  position: absolute;
}
.tab {
  width: 100%;
  height: 35px;
  background: #d44439;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.active {
  padding: 3px;
  font-weight: bolder;
  border-bottom: 2px solid white;
}
.danqu {
  padding: 10px;
  margin-left: 10px;
}
.songName {
  font-size: 18px;
  margin-bottom: 10px;
}
.songFrom {
  font-size: 14px;
  color: #8a8a8a;
}
.geshou {
  display: flex;
  align-items: center;
}
.geshou img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin: 5px 15px;
}
.gedan {
  display: flex;
  align-items: center;
}
.gedan img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin: 5px 15px;
}
.gedanName {
  font-size: 17px;
  margin-bottom: 10px;
}
.gedanFrom {
  font-size: 13px;
  color: #8a8a8a;
}
.diantai {
  display: flex;
  align-items: center;
}
.diantai img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin: 5px 15px;
}
.diantaiName {
  font-size: 17px;
  margin-bottom: 10px;
}
.diantaiFrom {
  font-size: 13px;
  color: #8a8a8a;
}
.line {
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
}
.hot {
  color: #8a8a8a;
  margin-top: 40px;
  margin-left: 20px;
  font-size: 14px;
}
.hotList {
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
}
.hotListItem {
  padding: 5px;
  margin: 8px;
  border-radius: 5px;
  border: 1px solid #dcdcdd;
}

/* 设置输入框默认字体在各个浏览器中的颜色 */
::-webkit-input-placeholder { /* WebKit browsers */ 
color: #eeb4af; 
} 
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
color: #eeb4af; 
} 
::-moz-placeholder { /* Mozilla Firefox 19+ */ 
color: #eeb4af; 
} 
:-ms-input-placeholder { /* Internet Explorer 10+ */ 
color: #eeb4af; 
} 
</style>
