<template>
  <div class="recommend" ref="wrapper">
    <div>
      <m-header @handleClick="toSearch"></m-header>
      <div class="slide">
        <!-- <cube-slide :data="items" :autoPlay="false">
          <template slot="dots" slot-scope="props">
            <span class="my-dot" :class="{active: props.current === index}" v-for="(item, index) in props.dots" :key="item">{{index + 1}}</span>
          </template>
        </cube-slide> -->
        <van-swipe >
          <van-swipe-item v-for="(item, index) in items" :key="index">
            <img v-lazy="item.image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="tab">
        <router-link tag="div" class="tab-item" to="/singer">
          <div class="fontFamily tab-icon">&#xe671;</div>
          <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/rank">
          <div class="fontFamily tab-icon">&#xe626;</div>
          <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/search">
          <div class="fontFamily tab-icon">&#xe671;</div>
          <span class="tab-link">搜索</span>
        </router-link>
      </div>
      <div class="">
        <recommend-item :list="item" v-for="(item, index) in list" :key="index"></recommend-item>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from '../../components/m-header'
import RecommendItem from './components/recommend-item'
import BScroll from 'better-scroll'

import { getRecommend, getSlider } from 'api/music.js'

export default {
  name: 'recommend',
  data () {
    return {
      items: [
        // {
        //   url: 'http://www.didichuxing.com/',
        //   image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
        // },
        // {
        //   url: 'http://www.didichuxing.com/',
        //   image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
        // },
        // {
        //   url: 'http://www.didichuxing.com/',
        //   image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
        // }
      ],
      list: []
    }
  },
  components: {
    RecommendItem,
    MHeader
  },
  created () {
    getSlider().then(res => {
      let a = []
      let data = JSON.parse(res.body).data
      data.slider.map((item, index) => {
        a[index] = { 'url': item.linkUrl, 'image': item.picUrl }
      })
      this.items = a
    })
    getRecommend().then(res => {
      this.list = res.data
    })
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, { click: true })
    // 获取轮播图
  },
  methods: {
    toSearch () {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~/style/variables.scss';
.slide /deep/ .cube-slide-item{
  img{
    width: rem(343);
  }
}
  .recommend{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: $bg;
    .slide{
      width: rem(343);
      height: rem(150);
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: rem(10);
      overflow: hidden;
      img{
        font-size: 0;
        width: 100%;
        height: rem(150);
      }
    }
    .tab{
      display: flex;
      font-size: rem(14);
      margin-bottom: rem(10);
      .tab-item{
        flex: 1;
        text-align: center;
        color: $text-color-light;
        padding-bottom: rem(10);
        cursor: pointer;
        .tab-icon{
          color: $app-color;
          font-size: rem(28);
          margin: rem(10) 0;
        }
      }
    }
  }
</style>
