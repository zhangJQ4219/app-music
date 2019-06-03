<template>
  <div class="search-header">
    <div class="title">
      <div class="fontFamily left" @click="backRec">&#xe606;</div>
      <div class="right" ref="search">
        <div class="fontFamily search-icon">&#xe600;</div>
        <input v-model="keywords" @input="inputing" @keydown="search($event)" class="search-input" type="search" ref="input" placeholder="搜索音乐、视频、歌单、歌手">
        <div class="fontFamily search-icon" @click="handleClear" v-html="del"></div>
      </div>
    </div>
    <div class="search-list" v-show="show">
      <span class="search-word">搜索“{{keywords}}”</span>
      <div class="search-item" @click="playSong(item)" v-for="item in getSixList" :key="item.songId">
        <div class="fontFamily search-item-icon">&#xe600;</div>
        <span v-html="item.list"></span>
        <!-- <span class="search-result">{{item.songName}} -
        <span class="search-result-other">{{item.singer[0].singerName}}</span></span> -->
      </div>
    </div>
    <div class="search-content">
      <div class="search-content-title">
        <h1>热门搜索</h1>
      </div>
      <div class="label">
        <div class="label-item">黄老板新歌</div>
        <div class="label-item">情深深雨蒙蒙</div>
        <div class="label-item">不要错过爱</div>
        <div class="label-item">魏新雨</div>
        <div class="label-item">有一种悲伤</div>
        <div class="label-item">got7</div>
        <div class="label-item">hit fluffy</div>
        <div class="label-item">作为怪物</div>
        <div class="label-item">余情未了</div>
      </div>
    </div>
    <div class="search-content" v-if="showHistory">
      <div class="search-content-title">
        <h1>搜索历史</h1>
        <div class="fontFamily history-icon">&#xe61b;</div>
      </div>
      <div class="label">
        <div class="label-item" v-for="i in historyKeyList" :key="i">{{i}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearch } from 'api/music.js'
export default {
  data () {
    return {
      resultList: [],
      show: false,
      history: [],
      keywords: '',
      historyKeyList: JSON.parse(localStorage.getItem('key')) || []
    }
  },
  computed: {
    showHistory () {
      if (JSON.parse(localStorage.getItem('key'))) {
        return JSON.parse(localStorage.getItem('key')).length > 0
      } else {
        return false
      }
    },
    del () {
      return this.keywords.length > 0 ? '&#xe668;' : '&#xe638;'
    },
    showSearch () {
      return this.resultList.length > 0
    },
    getSixList () {
      if (this.resultList.length > 0) {
        if (this.resultList.length > 6) {
          return this.resultList.slice(0, 6)
        } else {
          return this.resultList
        }
      } else {
        return []
      }
    }
  },
  watch: {
    keywords (value) {
      this.show = value.trim() !== ''
    }
  },
  mounted () {
    this.$refs.search.addEventListener('animationend', () => {
      this.$refs.input.focus()
    }, false)
  },
  methods: {
    search (e) {
      if (e.keyCode === 13) {
        this.historyKeyList.push(this.keywords)
        localStorage.setItem('key', JSON.stringify(this.historyKeyList))
      }
    },
    inputing (e) {
      this.keywords = e.target.value
      let params = {
        key: this.keywords
      }
      if (this.keywords.trim().length > 0) {
        getSearch(params).then(res => {
          console.log(res)
          let data = res.data.song.itemlist
          data.forEach((item, index) => {
            let result = `${item.name} - ${item.singer}`
            item.list = this.highLight(result)
          })
          this.resultList = data
        })
      }
    },
    playSong (item) {
      this.$store.dispatch('SET_PLAY_LIST', this.resultList)
      this.$store.commit('SET_CURRENT_INDEX', 0)
      this.$store.commit('SET_FULL_SCREEN', true)
    },
    backRec () {
      this.$router.push('/recommend')
    },
    handleClear () {
      if (this.keywords.length > 0) {
        this.keywords = ''
      }
    },
    // 高亮显示关键字
    highLight (result) {
      let lastStr = ''
      if (this.keywords && this.keywords.length > 0) {
        let reg = new RegExp(this.keywords, 'g')
        let str = `<span class="search-result">${this.keywords}</span>`
        lastStr = result.replace(reg, str)
      }
      return lastStr
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '~/style/variables.scss';
  .search-header{
     background-color: $bg;
     height: 100vh;
    .title{
      position: relative;
      // display: flex;
      // justify-content: space-between;
      height: rem(50);
      line-height: rem(50);
      .left{
        padding: 0 rem(16);
        font-size: rem(24);
        display: inline-block;
      }
      .right{
        right: 0;
        position: absolute;
        background-color: #fff;
        margin: rem(10);
        animation: mymove .2s linear forwards;
        border-radius: rem(25);
        display: inline-flex;
        .search-input{
          flex: 1;
          caret-color: #009a61;
          font-size: rem(16);
          line-height: rem(30);
          &::-webkit-search-cancel-button{
            -webkit-appearance: none;
          }
        }
        .search-icon{
          width: rem(30);
          font-size: rem(16);
          display: inline-block;
          line-height: rem(30);
          text-align: center;
          color: $text-color1;
        }
      }
    }
    .search-list{
      z-index: 2;
      position: absolute;
      top: rem(48);
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      background-color: $bg;
      display: flex;
      flex-direction: column;
      margin: rem(16);
      font-size: rem(16);
      .search-word{
        line-height: 1.2;
      }
      .search-item{
        @include ellipsis();
        margin: rem(16) 0;
        .search-item-icon{
          display: inline-block;
          margin-right: rem(16);
        }
        & /deep/ .search-result{
          color: $app-color;
        }
      }
    }
    .search-content{
      .search-content-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1{
          margin: rem(16);
          font-size: rem(18);
          font-weight: 600;
        }
        .history-icon{
          padding: rem(16);
        }
      }
      .label{
        display: flex;
        flex-wrap: wrap;
        margin: 0 rem(16);
        .label-item{
          font-size: rem(14);
          line-height: normal;
          margin-right: rem(16);
          margin-bottom: rem(8);
          padding: rem(8);
          border-radius: rem(15);
          background-color: #fff;
        }
      }
    }
  }
  @keyframes mymove{
    from {width: 30vw }
    to { width: 80vw }
  }
</style>
