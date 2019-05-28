<template>
  <div class="player">
    <div class="bg">
      <img width="100%" height="100%" src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003c616O2Zlswm.jpg?max_age=2592000">
    </div>
    <div class="content">
      <div class="top">
        <div class="fontFamily left" @click="backRec">&#xe606;</div>
        <span class="song-name">来自天堂的魔鬼</span>
        <span class="singer-name">G.E.M.邓紫棋</span>
      </div>
      <div class="middle">
        <div class="pic" :class="play">
          <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003c616O2Zlswm.jpg?max_age=2592000" alt="">
        </div>
      </div>
      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time">00:00 </span>
          <div class="progress-content">
            <m-progress></m-progress>
          </div>
          <span class="time"> 3:40</span>
        </div>
        <div class="btn-wrapper">
          <div class="fontFamily btn">&#xe606;</div>
          <div class="fontFamily btn" @click="playSong">&#xe68e;</div>
          <div class="fontFamily btn">&#xe631;</div>
        </div>
      </div>
    </div>
    <audio src="http://isure.stream.qqmusic.qq.com/C400004dFFPd4JNv8q.m4a?guid=9361190287&vkey=F88FEE19C503012039C4D2FC02280A19AC1BE6FA311A58CD8F7EBB37BF78B473EE3B71D802D732140D96C86073D8126CEB9A52CBA2083A66&uin=5051&fromtag=66"></audio>
  </div>
</template>

<script>
import MProgress from './components/m-progress'
import { mapGetters } from 'vuex'
export default {
  components: {
    MProgress
  },
  data () {
    return {

    }
  },
  created () {
  },
  computed: {
    play () {
      return this.playing ? 'play' : 'play pause'
    },
    ...mapGetters(['playing'])
  },
  methods: {
    backRec () {
      this.$router.push('/recommend')
    },
    playSong () {
      this.$store.dispatch('SET_PLAYING', !this.playing)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~/style/variables.scss';
.player{
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(60px);
  }
  .content{
    height: 100vh;
    display: flex;
    flex-direction: column;
    .top{
      margin-bottom: rem(20);
      .left{
        position: absolute;
        left: 0;
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
      flex: 1;
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
    .bottom{
      height: rem(170);
      .progress-wrapper{
        display: flex;
        padding: 0 rem(20);
        align-items: center;
        .time{
          margin: 0 rem(8);
        }
        .progress-content{
          flex: 1;
        }
      }
      .btn-wrapper{
        display: flex;
        justify-content: space-between;
        .btn{
          font-size: rem(24);
        }
      }
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
