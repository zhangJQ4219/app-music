<template>
  <div v-show="showPlayer" @touchmove.prevent>
    <div class="player" v-show="fullScreen">
      <div class="bg">
        <img width="100%" height="100%" :src="currentSong.img">
      </div>
      <div class="content">
        <div class="top">
          <div class="fontFamily top-left" @click="handleMini">&#xe60e;</div>
          <span class="song-name">{{currentSong.songName}}</span>
          <span class="singer-name">{{currentSong.singerName}}</span>
        </div>
        <div class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd">
          <div class="middle-left" ref="middleL">
            <div class="pic" :class="play">
              <img :src="currentSong.img" alt="">
            </div>
          </div>
          <m-scroll class="middle-right" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wraaper">
              <div v-if="currentLyric">
                <p class="text" ref="lyricLine" :class="{'current': currentLine === index}" v-for="(item, index) in currentLyric.lines" :key="item.time">{{item.txt}}</p>
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
            <div class="fontFamily btn-middle" @click="prev">&#xe607;</div>
            <div class="fontFamily btn-big" @click="playSong" v-html="playIcon"></div>
            <div class="fontFamily btn-middle" @click="next">&#xe62c;</div>
            <div class="fontFamily btn-small" >&#xe717;</div>
          </div>
        </div>
      </div>
    </div>
    <div class="player-mini" v-show="!fullScreen" @click="handleOpen">
      <div class="left" :class="play">
        <img class="pic-mini" :src="currentSong.img" alt="">
      </div>
      <div class="middle">
        <span class="middle-name-mini">{{currentSong.songName}} - {{currentSong.singerName}}</span>
      </div>
      <div class="right">
        <div class="fontFamily btn-play" @click.stop="playSong" v-html="playIcon"></div>
        <div class="fontFamily btn-list">&#xe717;</div>
      </div>
    </div>
      <audio ref="audio" :src="currentSong.url" @canplay="ready" @ended="end"  @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import MProgress from './components/m-progress'
import { mapGetters } from 'vuex'
import { Base64 } from 'js-base64'
import Lyric from 'lyric-parser'
import MScroll from '@/components/m-scroll'
// import { getMusicList } from 'api/music.js'

export default {
  components: {
    MProgress,
    MScroll
  },
  data () {
    return {
      currentTime: 0,
      duration: 0,
      songReady: false,
      currentLyric: null,
      currentLine: 0,
      currentShow: 'cd'
    }
  },
  created () {
    this.touch = {}
  },
  watch: {
    currentSong (newSong, oldSong) {
      console.log('1')
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
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$store.commit('SET_PLAYING', true)
        this.$refs.audio.play()
        this.getLyric()
      }, 100)
    },
    playing (newPlaying) {
      console.log('12')
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
      return this.playList.length > 0 && this.currentSong.url
    },
    percent () {
      return this.currentTime / this.duration
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
      this.duration = this.$refs.audio.duration
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
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.$store.commit('SET_CURRENT_INDEX', index)
    },
    // 上一首
    prev () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.$store.commit('SET_CURRENT_INDEX', index)
    },
    // 改变模式
    changeMode () {
      let mode = (this.mode + 1) % 3
      this.$store.commit('SET_MODE', mode)
      console.log(mode)
    },
    // 播放结束后根据播放模式播放下一首歌曲
    end () {
      switch (this.mode) {
        case 0: // 列表循环
          this.next()
          break
        case 1: // 单曲循环
          this.$refs.audio.play()
          if (this.currentLyric) {
            this.currentLyric.seek(0)
          }
          break
        default: // 随机循环
          let random = Math.floor(Math.random() * this.playList.length)
          this.$store.commit('SET_CURRENT_INDEX', random)
          if (random === this.currentIndex) {
            this.$refs.audio.play()
          }
          break
      }
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
    // 解析歌词
    getLyric () {
      this.currentLyric = new Lyric(Base64.decode(this.currentSong.lyric), this.handleLyric)
      if (this.playing) {
        this.currentLyric.play()
      } else {
        this.currentLyric.stop()
      }
      console.log(this.currentLyric)
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLine = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        console.log(lineEl)
        this.$refs.lyricList.scrollToElement(lineEl, 500)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 500)
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
.player{
  animation: appear .1s linear;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 150;
  background: #666;
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: .2;
    filter: blur(20px);
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
      height: calc( 100vh - #{rem(230)});
      // flex: 1;
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
      height: rem(170);
      padding-top: rem(6);
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
        }
        .btn-big{
          font-size: rem(50);
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
  z-index: 180;
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
      font-size: rem(16);
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
@keyframes appear{
    0%{
     opacity: 0;
     top: rem(600);
    }
    100%{
      opacity: 1;
      top: 0;
    }
}
</style>
