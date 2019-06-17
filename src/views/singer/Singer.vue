<template>
  <div class="singer">
    <div class="title">
      <div class="fontFamily icon" @click="backRec">&#xe606;</div>
      <span>歌手</span>
      <div class="fontFamily icon">&#xe638;</div>
    </div>
    <div class="singer-wrapper">
      <van-index-bar :index-list="indexList">
        <div v-for="(item, index) in singerList" :key="index" >
            <van-index-anchor :index="item.title" />
            <div class="singer-list" v-for="(val, key) in item.list" :key="key" @click="toSingerList(val)">
              <div class="singer-pic">
                <img width="100%" v-lazy="val.singer_pic" alt="">
              </div>
              <span class="singer-name">{{val.singer_name}}</span>
            </div>
        </div>
      </van-index-bar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/music'
import SortWord from 'sort-word'
export default {
  data () {
    return {
      singerList: [],
      indexList: []
    }
  },
  created () {
    getSingerList().then(res => {
      let list = res.data.singerList.data.singerlist
      let sortword = new SortWord(list, 'singer_name', true)
      this.indexList = sortword.indexList
      this.singerList = sortword.newList
    })
  },
  methods: {
    selectItem () {

    },
    backRec () {
      this.$router.push('/recommend')
    },
    toSingerList (item) {
      this.$store.commit('SET_SINGER_LIST', item)
      this.$router.push({ name: 'singerList', params: { id: item.singer_mid } })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~/style/variables.scss';
.singer-wrapper /deep/ .van-index-anchor--sticky{
  top: rem(50);
  background-color: $bg;
}
  .title{
    position: fixed;
    z-index: 2;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
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
    }
  }
  .singer-wrapper{
    // margin
    position: relative;
    overflow: hidden;
    padding-top: rem(50);
    width: 100%;
    .singer-list{
      padding: rem(8) rem(16);
      .singer-pic{
        width: rem(60);
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
      }
      .singer-name{
        margin-left: rem(20);
      }
    }
  }
</style>
