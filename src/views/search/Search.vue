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
      <div class="search-item" @click="handleSearch(item.name)" v-for="item in singerItemList" :key="item.id">
        <div class="fontFamily search-item-icon">&#xe600;</div>
        <span v-html="item.text"></span>
      </div>
      <div class="title-song" v-if="songItemList.length">歌曲</div>
      <div class="search-item" @click="handleSearch(item.name)" v-for="item in songItemList" :key="item.id">
        <div class="fontFamily search-item-icon">&#xe600;</div>
        <span v-html="item.text"></span>
      </div>
      <div class="loading-container" v-show="loading">
        <m-loading></m-loading>
      </div>
    </div>
    <transition name="fade">
      <div v-if="hotKeys.length > 0">
        <div class="search-content">
          <div class="search-content-title">
            <h1 v-if="hotKeys.length > 0">热门搜索</h1>
          </div>
          <div class="label">
            <div class="label-item" v-for="item in hotKeys" :key="item.n" @click="handleSearch(item)">{{item.k}}</div>
          </div>
        </div>
        <div class="search-content" v-if="historyKeyList && historyKeyList.length">
          <div class="search-content-title">
            <h1>搜索历史</h1>
            <div class="fontFamily history-icon" @click="clearHistory">&#xe61b;</div>
          </div>
          <div class="label">
            <div class="label-item" v-for="i in historyKeyList" :key="i" @click="handleSearch(i)">{{i}}</div>
          </div>
        </div>
      </div>
    </transition>
    <router-view></router-view>
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
      showHistory: true,
      state: 1 //
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
      this.show = value.trim() !== '' && this.state === 1
      // if (value.trim()) {
      //   console.log('watch执行')
      //   this.$router.push('/search')
      // }
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
        this.handleSearch(this.keywords)
        if (!this._judgeRepeat(this.keywords) && this.historyKeyList.length < 5) {
          this.historyKeyList.push(this.keywords)
          localStorage.setItem('hotKeys', JSON.stringify(this.historyKeyList))
        }
        if (!this._judgeRepeat(this.keywords) && this.historyKeyList.length === 5) {
          this.historyKeyList.shift()
          this.historyKeyList.push(this.keywords)
          localStorage.setItem('hotKeys', JSON.stringify(this.historyKeyList))
        }
      }
    },
    inputing (e) {
      this.keywords = e.target.value
      let params = {
        key: this.keywords
      }
      this.state = 1
      if (this.keywords.trim().length > 0 && this.state === 1) {
        this.$store.commit('SET_SEARCH_KEY', null)
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
    backRec () {
      this.$router.push('/recommend')
    },
    handleClear () {
      if (this.keywords.length > 0) {
        this.keywords = ''
      }
      this.$store.dispatch('SET_SEARCH_KEY', null)
        .then(() => {
          this.$router.push('/search')
          // this.$router.push({ name: 'searchList', params: { id: encodeURIComponent(item.k) } })
        })
    },
    clearHistory () {
      this.$dialog.confirm({
        message: '是否清空所有搜索历史',
        cancelButtonColor: '#31c27c',
        confirmButtonText: '清空',
        confirmButtonColor: '#000'
      }).then(() => {
        localStorage.removeItem('hotKeys')
        this.historyKeyList = []
      }).catch(() => {
      })
    },
    handleSearch (item) {
      this.state = 2
      let name = item.k ? item.k.trim() : item
      this.keywords = name
      this.$refs.input.blur()
      this.$store.dispatch('SET_SEARCH_KEY', name)
        .then(() => {
          this.$router.push({ name: 'searchList', params: { id: name } })
          // this.$router.push({ name: 'searchList', params: { id: encodeURIComponent(item.k) } })
        })
    },
    // 高亮显示关键字
    _highLight (result) {
      let lastStr = ''
      if (this.keywords && this.keywords.length > 0) {
        let reg = new RegExp(this.keywords.trim(), 'g')
        let str = `<span class="search-result">${this.keywords}</span>`
        lastStr = result.replace(reg, str)
      }
      return lastStr
    },
    // 判断历史搜索是否有重复
    _judgeRepeat (key) {
      return this.historyKeyList.includes(key)
    }
  }
}
</script>

<style lang='scss' scoped>
  @import '~/style/variables.scss';
.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to {
  margin-top: rem(100)
}
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
          caret-color: $app-color;
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
          color: $text-color-light;
        }
      }
    }
    .search-list{
      // z-index: 2;
      position: absolute;
      top: rem(48);
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      background-color: $bg;
      display: flex;
      flex-direction: column;
      padding: rem(16);
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
          padding: rem(10) rem(16);
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
