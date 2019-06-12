<template>
  <div v-show="showPlayer" @touchmove.prevent>
    <transition name="play">
      <div class="player" v-show="fullScreen">
        <div class="bg">
          <img width="100%" height="100%" :src="currentSong.imgUrlBig">
        </div>
        <div class="content">
          <div class="top">
            <div class="fontFamily top-left" @click="handleMini">&#xe60e;</div>
            <span class="song-name">{{currentSong.name }}</span>
            <span class="singer-name">{{currentSong.singers}}</span>
          </div>
          <div class="middle"
            @touchstart.prevent="middleTouchStart"
            @touchmove.prevent="middleTouchMove"
            @touchend="middleTouchEnd">
            <div class="middle-left" ref="middleL">
              <div class="pic" :class="play">
                <img width="100%" height="100%" :src="currentSong.imgUrlBig" alt="">
              </div>
            </div>
            <m-scroll class="middle-right" ref="lyricList" :data="currentLyric && currentLyric.lines">
              <div class="lyric-wraaper">
                <div v-if="currentLyric">
                  <p class="text" ref="lyricLine" :class="{'current': currentLine === index}" v-for="(item, index) in currentLyric.lines" :key="index">{{item.txt}}</p>
                </div>
              </div>
            </m-scroll>
          </div>
          <div class="bottom">
            <div class="dot-wrapper">
              <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
              <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
            </div>
            <div class="progress-wrapper">
              <span class="time">{{currentTime | formatDate}}</span>
              <div class="progress-content">
                <m-progress :percent="percent" @percentChange="changeProgress"></m-progress>
              </div>
              <span class="time">{{duration | formatDate}}</span>
            </div>
            <div class="btn-wrapper">
              <div class="fontFamily btn-small" @click="changeMode" v-html="modeIcon"></div>
              <div class="fontFamily btn-middle" @click="prev" :class="disableCls">&#xe607;</div>
              <div class="fontFamily btn-big" @click="playSong" :class="disableCls" v-html="playIcon"></div>
              <div class="fontFamily btn-middle" @click="next" :class="disableCls">&#xe62c;</div>
              <div class="fontFamily btn-small" @click="showList">&#xe717;</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="player-mini" v-show="!fullScreen" @click="handleOpen">
      <div class="left" :class="play">
        <img class="pic-mini" :src="currentSong.imgUrlSmall" alt="">
      </div>
      <div class="middle">
        <span class="middle-name-mini">{{currentSong.name}} - {{currentSong.singers}}</span>
      </div>
      <div class="right">
        <div class="fontFamily btn-play" @click.stop="playSong" v-html="playIcon"></div>
        <div class="fontFamily btn-list" @click.stop="showListMini">&#xe717;</div>
      </div>
    </div>
    <m-bottomlist
      v-if="stateList"
      :state="stateList"
      :playList="playList"
      :listClass="listClass"
      :currentIndex="currentIndex"
      @close="closeList"
      @playListMusic="playListMusic"
    >
    </m-bottomlist>
      <audio ref="audio" :src="currentSongUrl" @canplay="ready" @error="error" @ended="end"  @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import { getSongUrl, getLyric } from 'api/music'
import MProgress from './components/m-progress'
import { mapGetters } from 'vuex'
import { Base64 } from 'js-base64'
import Lyric from 'lyric-parser'
import MScroll from '@/components/m-scroll'
import MBottomlist from '@/components/m-bottomlist'
// import { getMusicList } from 'api/music.js'

export default {
  components: {
    MProgress,
    MScroll,
    MBottomlist
  },
  data () {
    return {
      currentTime: 0,
      duration: 0,
      songReady: false,
      currentLyric: null,
      currentLine: 0,
      currentShow: 'cd',
      currentSongUrl: null,
      stateList: false, // 列表状态
      listClass: 'white', // 列表样式
      timer: null,
      timer1: null
    }
  },
  created () {
    this.touch = {}
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id) {
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.currentLine = 0
        this.$refs.audio.currentTime = 0
      }
      this._getSongLyric()
      setTimeout(() => {
        // this.$store.commit('SET_PLAYING', true)
        this.$refs.audio.play()
        this.duration = this.$refs.audio.duration
      }, 1000)
    },
    playing (newPlaying) {
      this.$nextTick(() => {
        let audio = this.$refs.audio
        newPlaying ? audio.play() : audio.pause()
      })
    }
  },
  computed: {
    play () {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon () {
      return this.playing ? '&#xe652;' : '&#xe60c;'
    },
    modeIcon () {
      switch (this.mode) {
        case 0:
          return '&#xe69d;'
        case 1:
          return '&#xe603;'
        default:
          return '&#xe605;'
      }
    },
    // 显示播放器
    showPlayer () {
      return this.playList.length > 0 && this.currentSongUrl
    },
    percent () {
      return this.currentTime / this.duration
    },
    disableCls () {
      return this.songReady ? '' : 'disable'
    },
    ...mapGetters(['playing', 'fullScreen', 'currentIndex', 'playList', 'currentSong', 'mode'])
  },
  filters: {
    formatDate (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = interval % 60
      return `${minute > 9 ? minute : '0' + minute}:${second > 9 ? second : '0' + second}`
    }
  },
  methods: {
    ready () {
      this.songReady = true
    },
    playListMusic (index, item) {
      this.$store.commit('SET_CURRENT_INDEX', index)
      this.$store.commit('SET_PLAYING', true)
      this.stateList = false
    },
    // 展示列表
    showList () {
      this.stateList = true
      this.listClass = 'black'
    },
    showListMini () {
      this.stateList = true
      this.listClass = 'white'
    },
    closeList () {
      this.stateList = false
    },
    // 底部显示
    handleMini () {
      this.$store.commit('SET_FULL_SCREEN', !this.fullScreen)
    },
    // 全屏显示
    handleOpen () {
      this.$store.commit('SET_FULL_SCREEN', !this.fullScreen)
    },
    playSong () {
      if (!this.songReady) {
        return
      }
      // this.$store.dispatch('SET_PLAYING', !this.playing)
      this.$store.commit('SET_PLAYING', !this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    // 下一首
    next () {
      if (this.timer !== null) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (!this.songReady) {
          return
        }
        if (this.playList.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex + 1
          if (index === this.playList.length) {
            index = 0
          }
          this.$store.commit('SET_CURRENT_INDEX', index)
          if (!this.playing) {
            this.playSong()
          }
        }
        this.songReady = false
      }, 1000)
    },
    // 上一首
    prev () {
      if (this.timer1 !== null) {
        clearTimeout(this.timer1)
      }
      this.timer1 = setTimeout(() => {
        if (!this.songReady) {
          return
        }
        if (this.playList.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex - 1
          if (index === -1) {
            index = this.playList.length - 1
          }
          this.$store.commit('SET_CURRENT_INDEX', index)
          if (!this.playing) {
            this.playSong()
          }
        }
        this.songReady = false
      }, 1000)
    },
    // 改变模式
    changeMode () {
      let mode = (this.mode + 1) % 3
      this.$store.commit('SET_MODE', mode)
    },
    // 播放结束后根据播放模式播放下一首歌曲
    end () {
      switch (this.mode) {
        case 0: // 列表循环
          this.next()
          break
        case 1: // 单曲循环
          this.loop()
          break
        default: // 随机循环
          let random = Math.floor(Math.random() * this.playList.length)
          this.$store.commit('SET_CURRENT_INDEX', random)
          if (random === this.currentIndex) {
            this.$refs.audio.currentTime = 0
            this.currentTime = 0
            this.currentLine = 0
            this.currentLyric.seek(0)
            this.$refs.audio.play()
          }
          break
      }
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.currentTime = 0
      this.currentLine = 0
      this.currentLyric.seek(0)
      this.$refs.audio.play()
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    changeProgress (percent) {
      const currentTime = this.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.playSong()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    error () {
      this.songReady = true
    },
    // 获取歌词url
    _getSongUrl () {
      let params = {
        songmid: this.currentSong.mid
      }
      let that = this
      getSongUrl(params).then(res => {
        if (res.data.midurlinfo[0].purl === '') {
          this.currentSongUrl = `${res.data.sip[0]}${res.data.midurlinfo[0].purl}`
          this.$dialog.alert({
            message: '该歌曲暂时无法播放',
            confirmButtonColor: '#31c27c'
          }).then(() => {
            that.next()
          })
        } else {
          this.currentSongUrl = `${res.data.sip[0]}${res.data.midurlinfo[0].purl}`
        }
      })
    },
    // 获取歌词内容
    _getSongLyric () {
      let params = {
        songmid: this.currentSong.mid
      }

      this._getSongUrl()
      getLyric(params).then(res => {
        this.currentLyric = new Lyric(Base64.decode(res.data.lyric), this.handleLyric)
        if (this.currentLyric.lines.length === 0) {
          this.currentLyric.lines = [{
            'time': 0,
            'txt': '此歌曲为没有填词的纯音乐，请您欣赏'
          }]
        }
        if (this.playing) {
          this.currentLyric.play()
        }
        // this.getAnalysisedLyric(res.data.lyric)
      })
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLine = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
    middleTouchStart (e) {
      this.touch.initiated = true
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    middleTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.lyricList.$el.style['transform'] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style['transitionDuration'] = 0
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style['transitionDuration'] = 0
    },
    middleTouchEnd (e) {
      let offsetWidth
      let opacity
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.currentShow = 'lyric'
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      const time = 300
      this.$refs.lyricList.$el.style['transform'] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style['transitionDuration'] = `${time}ms`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style['transitionDuration'] = `${time}ms`
      this.touch.initiated = false
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~/style/variables.scss';
.play-enter-active, .play-leave-active {
  transition: all .2s;
  transform: translateY(0);
}
.play-enter, .play-leave-to {
  transform: translateY(rem(667));
  opacity: 0;
}

.player{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: $text-color-medium;
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: .3;
    filter: blur(30px);
  }
  .content{
    height: 100vh;
    display: flex;
    flex-direction: column;
    .top{
      color: #fff;
      margin-bottom: rem(20);
      .top-left{
        position: absolute;
        left: rem(16);
        height: rem(40);
        font-size: rem(24);
        line-height: rem(40);
      }
      .song-name{
        display: block;
        text-align: center;
        height: rem(40);
        font-size: rem(20);
        line-height: rem(40);
      }
      .singer-name{
        display: block;
        text-align: center;
        height: rem(20);
        font-size: rem(14);
        line-height: rem(20);
      }
    }
    .middle{
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;

      // height: calc( 100vh - #{rem(230)});
      overflow: hidden;
      display: inline-flex;
      .middle-left{
        width: 100vw;
        flex-shrink:0;
        .pic{
          width: rem(300);
          height: rem(300);
          margin: auto;
          border-radius: 50%;
          box-sizing: border-box;
          border: 10px solid rgba(255, 255, 255, 0.3);
          overflow: hidden;
          &.play{
            animation: rotate 20s linear infinite;
          }
          &.pause{
            animation-play-state: paused
          }
        }
      }
      .middle-right{
        flex-shrink:0;
        height: rem(330);
        width: 100vw;
        // overflow: hidden;
        .lyric-wraaper{
          // height: 100%;
          .text{
            text-align: center;
            font-size: rem(14);
            line-height: rem(32);
            color: #ccc;
          }
          .current{
            color: $app-color;
          }
        }
      }
    }
    .bottom{
      position: absolute;
        bottom: 50px;
        width: 100%;
      // height: rem(170);
      // padding-top: rem(6);
      .dot-wrapper{
        text-align: center;
        .dot{
          display: inline-block;
          width: rem(8);
          height: rem(8);
          margin: 0 rem(6);
          background-color: #bbb;
          border-radius: 50%;
          &.active{
            width: rem(16);
            border-radius: rem(4);
            background-color: #fff;
          }
        }
      }
      .progress-wrapper{
        display: flex;
        padding: 0 rem(20) rem(10) rem(20);
        align-items: center;
        .time{
          color: #ccc;
          margin: 0 rem(8);
        }
        .progress-content{
          flex: 1;
        }
      }
      .btn-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 rem(16);
        color: #fff;
        .btn-small{
          width: rem(35);
          font-size: rem(30);
        }
        .btn-middle{
          font-size: rem(40);
          &.disable{
            color: $text-color-medium;
          }
        }
        .btn-big{
          font-size: rem(50);
          &.disable{
            color: $text-color-medium;
          }
        }
      }
    }
  }
}
.player-mini{
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 140;
  width: 100%;
  height: 60px;
  background: #fff;
  .left{
    margin: 0 rem(16) rem(16) rem(16);
    width: rem(60);
    height: rem(60);
    border-radius: 50%;
    box-sizing: border-box;
    &.play{
      animation: rotate 20s linear infinite;
    }
    &.pause{
      animation-play-state: paused
    }
    .pic-mini{
      width: rem(60);
      height: rem(60);
      border-radius: 50%;
    }
  }
  .middle{
    flex: 1;
    @include ellipsis();
    .middle-name-mini{
      font-size: rem(12);
    }
  }
  .right{
    margin: 0 rem(16);
    color: $app-color;
    .btn-play{
      font-size: rem(32);
      margin-left: rem(16);
      display: inline-block;
      vertical-align: middle;
    }
    .btn-list{
      font-size: rem(30);
      margin-left: rem(10);
      display: inline-block;
      vertical-align: middle;
    }
  }
}
@keyframes rotate{
    0%{
      transform: rotate(0)
    }
    100%{
      transform: rotate(360deg)
    }
}
</style>
