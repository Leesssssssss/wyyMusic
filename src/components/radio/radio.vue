<template>
  <div>
    <div>
      <h1 class="recommendRadio">推荐电台</h1>
      <div class="radio" v-for="item in radioList" :key="item.id">
        <div class="radioList">

          <div class="radioImg">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="radioName">
            <span class="Name">{{item.name}}</span><br>
            <span>{{item.copywriter}}</span>
          </div>

          <div class="line"></div>
        </div>
      </div>
    </div>

    <div>
      <h1 class="recommendRadio">推荐节目</h1>
      <div class="program" v-if="radioProgram.length">
        <div v-for="program in radioProgram" :key="program.radio.id">
          <img :src="program.radio.picUrl" alt="">
          <h1 class="programName">{{program.radio.name}}</h1>
        </div>
      </div>
    </div>
    
    <div>
      <h1 class="recommendRadio">独家放送</h1>
      <div class="program" v-if="dujia.length">
        <div v-for="du in dujia" :key="du.id">
          <img :src="du.sPicUrl" alt="">
          <h1 class="programName">{{du.name}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRadio, getProgram, getDujia } from '../../api/radio'

export default {
  data() {
    return {
      radioList: [],
      radioProgram: [],
      dujia: []
    }
  },
  created() {
    this._getRadio();
    this._getProgram();
    this._getDujia();
  },
  methods: {
    _getRadio() {
      getRadio().then(res => {
        this.radioList = res.data.result;
      });
    },
    _getProgram() {
      getProgram().then(res => {
        this.radioProgram = res.data.programs.splice(1);
      });
    },
    _getDujia() {
      getDujia().then(res => {
        this.dujia = res.data.result;
      });
    }
  }
}
</script>

<style>
.recommendRadio {
  margin: 20px;
  font-weight: 700;
  font-size: 18px;
}
.radio {
  display: flex;
  margin: 10px;
}
.radioList {
  display: flex;
  flex-wrap: wrap;
}
.radioImg {
  width: 130px;
}
.radioImg img {
  width: 130px;
  height: 130px;
  border-radius: 5px;
}
.radioName {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  font-family: "华文细黑";
  color: #3c3c3c;
  margin-left: 20px;
}
.Name {
  font-size: 19px;
  font-weight: 900;
}
.line {
  width: 98%;
  margin: 1% 1%;
  border-bottom: 5px solid #f2f3f4;
}
.program img {
  width: 130px;
  height: 130px;
  border-radius: 5px;
}
.program {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.programName {
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
