<template>
  <div class="recommend" ref="wrapper">
    <div>
      <m-header></m-header>
      <div class="slide">
        <cube-slide :data="items">
          <template slot="dots" slot-scope="props">
            <span class="my-dot" :class="{active: props.current === index}" v-for="(item, index) in props.dots" :key="item">{{index + 1}}</span>
          </template>
        </cube-slide>
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
        <recommend-item :list="list" v-for="i in 3" :key="i"></recommend-item>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from '../../components/m-header'
import RecommendItem from './components/recommend-item'
import BScroll from 'better-scroll'

import { getTest } from 'api/music.js'

export default {
  data () {
    return {
      items: [
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
        },
        {
          url: 'http://www.didichuxing.com/',
          image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
        }
      ],
      list: [
        '啊啊啊啊啊啊啊啊',
        '不不不不不不不不',
        '啛啛喳喳错错错错',
        '顶顶顶顶顶大大大',
        '鹅鹅鹅饿鹅鹅鹅饿',
        '嘎嘎嘎灌灌灌灌灌',
        '哈哈哈哈哈哈哈哈',
        '急急急就将计就计',
        '咔咔咔咔咔咔扩扩',
        '啦啦啦啦啦啦啦啦',
        '么么么么么么么么',
        '那你那你女女女女'
      ]
    }
  },
  components: {
    RecommendItem,
    MHeader
  },
  created () {
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, { click: true })
    getTest().then(res => {
      // let a = []
      // res.data.slider.map((item, index) => {
      //   a[index] = { 'image': item }
      // })
      // this.items = a
    })
  }
}
</script>

<style lang='scss' >
@import '~/style/variables.scss';
  .recommend{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: $bg;
    .slide{
      margin: 0 rem(16);
      border-radius: rem(10);
      overflow: hidden;
      .my-dot{
        height: rem(8);
        width: rem(8);
        border-radius: rem(4);
        margin: 0 rem(4);
      }
    }
    .tab{
      display: flex;
      font-size: rem(14);
      margin-bottom: rem(10);
      .tab-item{
        flex: 1;
        text-align: center;
        color: $text-color1;
        padding-bottom: rem(10);
        cursor: pointer;
        .tab-icon{
          font-size: rem(28);
          margin: rem(10) 0;
        }
      }
    }
  }
</style>
