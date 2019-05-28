<template>
  <div id="rank">
    <div class="title">
      <div class="fontFamily icon" @click="backRec">&#xe606;</div>
      <div class="title-name">音乐排行榜</div>
    </div>
    <div class="rank-list">
      <div class="rank-item" v-for="item in rankList" :key="item.id">
        <div class="sings">
          <span class="sing-title">{{item.topTitle}}</span>
          <ul class="sing-list">
            <li v-for="(val, key) in item.songList" :key="key">
              <span>{{key + 1}}.</span>
              <span class="song-name">{{val.songname}} - </span>
              <span class="singer-name">{{val.singername}}</span>
            </li>
          </ul>
        </div>
        <div class="img">图片</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRankList } from 'api/music.js'
export default {
  data () {
    return {
      rankList: {}
    }
  },
  created () {
    getRankList().then(res => {
      let data = JSON.parse(res.body).data
      this.rankList = data.topList
      console.log(this.rankList)
    })
  },
  methods: {
    backRec () {
      this.$router.push('/recommend')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~/style/variables.scss';
  .title{
    position: fixed;
    width: 100%;
    z-index: 99;
    background-color: #fff;
    // position: relative;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    height: rem(50);
    line-height: rem(50);
    .title-name{
      font-size: rem(18);
      font-weight: 600;
      text-align: center;
    }
    .icon{
      font-size: rem(24);
      padding: 0 rem(16);
      display: inline-block;
      position: absolute;
      left: rem(0);
    }
  }
  .rank-list{
    padding-top: rem(50);
    display: flex;
    flex-direction: column;
    align-items: center;
    .rank-item{
      overflow: hidden;
      border-radius: rem(8);
      margin: rem(4) 0;
      width: rem(343);
      height: rem(106);
      display: flex;
      background-color: $bg;
      .sings{
        width: rem(200);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .sing-title{
          font-size: rem(16);
          font-weight: 600;
          height: rem(20);
          line-height: rem(20);
        }
        flex: 1;
        margin: rem(8);
        .sing-list{
          li{
            margin-top: rem(8);
            font-size: rem(12);
            width: rem(200);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .song-name{
              margin-left: rem(8);
              line-height: 1.2;
            }
            .singer-name{
              color: $text-color1;
              line-height: 1.2;
            }
          }
        }
      }
      .img{
        width: rem(106);
        height: rem(106);
        background-color: #333;
      }
    }
  }
</style>
