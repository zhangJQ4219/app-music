<template>
  <div id="rank">
    <div class="title">
      <div class="fontFamily icon">&#xe606;</div>
      <span>音乐排行榜</span>
    </div>
    <div class="rank-list">
      <div class="rank-item">
      </div>
      <div class="rank-item">s</div>
      <div class="rank-item">s</div>
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
      this.rankList = data[0]
      console.log(data)
    })
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
@import '~/style/variables.scss';
  .title{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: rem(50);
    line-height: rem(50);
    span{
      font-size: rem(18);
      font-weight: 600;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    .rank-item{
      border-radius: rem(8);
      margin: rem(4) 0;
      width: rem(343);
      height: rem(150);
      background-color: #666;
    }
  }
</style>
