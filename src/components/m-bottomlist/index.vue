<template>
  <div class="container">
    <div class="bg" @click="handleClose"></div>
    <transition name="bottom">
      <div class="bottom-wrapper" v-if="state" :class="listClass">
        <m-scroll class="scroll-wrapper" ref="wrapper" :data="playList">
          <div class="wrapper">
            <div v-for="(item, index) in playList" :key="item.songName" class="music" ref="music" @click="playMusic(index, item)" :class="[listClass, {'first': index === 0}]">
              <span class="song" :class="{'current': currentIndex === index}">{{item.title}} - </span>
              <span class="singer" :class="[listClass, {'current': currentIndex === index}]">{{item.singers}}</span>
            </div>
          </div>
        </m-scroll>
        <div class="close" @click="handleClose">关闭</div>
      </div>
    </transition>
  </div>
</template>

<script>
import MScroll from '@/components/m-scroll'

export default {
  props: {
    playList: {
      type: Array,
      default: () => {
        return []
      }
    },
    state: {
      type: Boolean,
      default: false
    },
    listClass: {
      type: String,
      default: 'black'
    },
    currentIndex: {
      type: Number,
      default: -1
    }
  },
  components: {
    MScroll
  },
  data () {
    return {

    }
  },
  created () {
  },
  watch: {
    currentIndex: {
      handler () {
        setTimeout(() => {
          if (this.currentIndex > 5) {
            if ((this.playList.length - this.currentIndex) < 4) {
              this.$refs.wrapper.scrollTo(0, -(this.currentIndex - 6) * 46, 500)
            } else {
              this.$refs.wrapper.scrollTo(0, -(this.currentIndex - 3) * 46, 500)
            }
          } else {
            this.$refs.wrapper.scrollTo(0, 0, 500)
          }
        }, 100)
      },
      immediate: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    },
    // 播放音乐并将信息存入store
    playMusic (index, item) {
      this.$emit('playListMusic', index, item)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~/style/variables.scss';
.bottom-enter-active, .bottom-leave-active {
  transition: all .2s;
  transform: translateY(0);
}
.bottom-enter, .bottom-leave-to {
  transform: translateY(rem(667));
}
.container{
  .bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 998;
    opacity: 0;
    background-color: #000;
    animation: bg .2s linear forwards;
  }
  .bottom-wrapper{
    position: fixed;
    height: rem(520);
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    font-size: rem(14);
    &.white{
      background-color: #fff;
      color: #000;
    }
    &.black{
      background-color: rgb(28, 35, 45);
      color: #fff;
    }
    .scroll-wrapper{
      width: 100%;
      height: rem(380);
      margin-top: rem(40);
      overflow: hidden;
      .wrapper{
        .music{
          padding: rem(16) rem(16);
          @include ellipsis();
          .current{
            color: $app-color;
          }
          &.white{
            border-bottom: 1px solid rgb(245, 245, 245);
            &.first{
              border-top: 1px solid rgb(245, 245, 245);
            }
          }
          &.black{
            border-bottom: 1px solid rgb(42, 46, 57);
            &.first{
              border-top: 1px solid rgb(42, 46, 57);
            }
          }
          .singer{
            color: rgb(138, 141, 148);
            &.current{
              color: $app-color;
            }
          }
        }
      }
    }
    .close{
      width: 100%;
      text-align: center;
      height: rem(47);
      line-height: rem(47);
      font-size: rem(16);
    }
  }
}
@keyframes bg{
    0%{
     opacity: 0;
    }
    100%{
      opacity: .5;
    }
}
</style>
