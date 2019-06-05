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
      <div class="title-singer" v-if="singerItemList.length">歌手</div>
      <div class="search-item" @click="playSong(item)" v-for="item in singerItemList" :key="item.id">
        <div class="fontFamily search-item-icon">&#xe600;</div>
        <span v-html="item.text"></span>
      </div>
      <div class="title-song" v-if="songItemList.length">歌曲</div>
      <div class="search-item" @click="playSong(item)" v-for="item in songItemList" :key="item.id">
        <div class="fontFamily search-item-icon">&#xe600;</div>
        <span v-html="item.text"></span>
      </div>
      <div class="loading-container" v-show="loading">
        <m-loading></m-loading>
      </div>
    </div>
    <div class="search-content">
      <div class="search-content-title">
        <h1>热门搜索</h1>
      </div>
      <div class="label">
        <div class="label-item" v-for="item in hotKeys" :key="item.n">{{item.k}}</div>
      </div>
    </div>
    <div class="search-content" v-if="historyKeyList && historyKeyList.length">
      <div class="search-content-title">
        <h1>搜索历史</h1>
        <cube-button @click="clearHistory">Dialog - btn</cube-button>
        <div class="fontFamily history-icon" @click="clearHistory">&#xe61b;</div>
      </div>
      <div class="label">
        <div class="label-item" v-for="i in historyKeyList" :key="i">{{i}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearch, getHotKeys } from 'api/music.js'
import MLoading from '@/components/m-loading'
export default {
  components: {
    MLoading
  },
  data () {
    return {
      songItemList: [],
      singerItemList: [],
      show: false,
      history: [],
      keywords: '',
      hotKeys: [],
      historyKeyList: JSON.parse(localStorage.getItem('hotKeys')) || [],
      showHistory: true
    }
  },
  computed: {
    loading () {
      return !(this.songItemList.length > 0 || this.singerItemList.length > 0)
    },
    del () {
      return this.keywords.length > 0 ? '&#xe668;' : '&#xe638;'
    },
    showSearch () {
      return this.songItemList.length > 0 || this.singerItemList.length > 0
    }
  },
  watch: {
    keywords (value) {
      this.show = value.trim() !== ''
    }
  },
  created () {
    getHotKeys().then(res => {
      this.hotKeys = res.data.hotkey.slice(0, 10)
    })
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
        localStorage.setItem('hotKeys', JSON.stringify(this.historyKeyList))
      }
    },
    inputing (e) {
      this.keywords = e.target.value
      let params = {
        key: this.keywords
      }
      if (this.keywords.trim().length > 0) {
        getSearch(params).then(res => {
          if (res.data.song.itemlist.length > 0) {
            res.data.song.itemlist.forEach((item, index) => {
              let reg = `${item.name} - ${item.singer}`
              item.text = this._highLight(reg)
            })
            this.songItemList = res.data.song.itemlist
          }
          if (res.data.singer.itemlist.length > 0) {
            res.data.singer.itemlist.forEach((item, index) => {
              item.text = this._highLight(item.singer)
            })
            this.singerItemList = res.data.singer.itemlist
          }
        })
      }
    },
    playSong (item) {
      // console.log(item)
      // item.imgUrlBig = `https://y.gtimg.cn/music/photo_new/T002R800x800M000${item.mid}.jpg?max_age=2592000`
      // item.imgUrlSmall = `https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.mid}.jpg?max_age=2592000`
      // let arr = []
      // arr.push(item)
      // this.$store.commit('SET_PLAY_LIST', arr)
      // this.$store.commit('SET_CURRENT_INDEX', 0)
      // this.$store.commit('SET_FULL_SCREEN', true)
      // console.log(this.$store.getters.playList)
    },
    backRec () {
      this.$router.push('/recommend')
    },
    handleClear () {
      if (this.keywords.length > 0) {
        this.keywords = ''
      }
    },
    clearHistory () {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        title: '我是标题',
        content: '我是内容',
        confirmBtn: {
          text: '确定按钮',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消按钮',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '点击确认按钮'
          }).show()
        },
        onCancel: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '点击取消按钮'
          }).show()
        }
      }).show()
      // localStorage.removeItem('hotKeys')
      // this.historyKeyList = []
    },
    // 高亮显示关键字
    _highLight (result) {
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
        margin-left: rem(16);
        color: $app-color;
      }
      .title-singer{
        padding: rem(16) 0 0 rem(16);
      }
      .title-song{
        padding: rem(16) 0 0 rem(16);
      }
      .search-item{
        @include ellipsis();
        .search-item-icon{
          display: inline-block;
          padding: rem(16);
        }
        & /deep/ .search-result{
          color: $app-color;
        }
      }
      .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
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
