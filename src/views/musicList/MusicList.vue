<template>
  <div class="music-list" @touchmove.prevent>
    <div class="fontFamily back-icon" @click="back">&#xe606;</div>
    <!-- <div class="title">{{title}}</div> -->
    <div class="bg-img" v-lazy:background-image="musicList.picUrl" ref="bgImg">
    </div>
    <div class="bg-layer" ref="layer"></div>
    <m-scroll :data="topListDetails" @scroll="scroll"
            :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list">
      <div class="list-wrapper">
        <!-- <div class="play-all">
          <div class="fontFamily back-icon" >&#xe60c;</div>
        </div> -->
        <div v-for="(item, index) in topListDetails" :key="item.songName" @click="playMusic(index, item)" class="music">
          <p class="song-name">{{index + 1}} {{item.title}}</p>
          <p class="song-singer">{{item.singer[0].name}}·{{item.title}}</p>
        </div>
      </div>
    </m-scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRankListDetails } from 'api/music.js'
import MScroll from '@/components/m-scroll'
// import { playlistMixin } from '@/utils/mixin'

export default {
  // mixins: [playlistMixin],
  components: {
    MScroll
  },
  data () {
    return {
      topListDetails: [],
      title: '',
      scrollY: 0,
      imgHeight: 0
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    // 刷新返回 上级目录
    if (!this.musicList.id) {
      this.$router.push('/rank')
    }
    if (this.$route.params.id) {
      this.getList(this.$route.params.id)
    }
  },
  mounted () {
    this.imgHeight = this.$refs.bgImg.clientHeight
    this.$refs.list.$el.style.top = `${this.imgHeight}px`
  },
  computed: {
    bgImg () {
      return `background-image:url(${this.musicList.picUrl})`
      // return `background-image:url("http://y.gtimg.cn/music/photo_new/T003R300x300M000002jfbMH2hdGnC.jpg")`
    },
    ...mapGetters(['musicList'])
  },
  watch: {
    scrollY (newY) {
      let moveHight = -this.imgHeight + 46 // 最高移动距离 46是顶部导航高度
      let translateY = Math.max(moveHight, newY)
      let zIndex = 0
      let scale = 1
      let percent = Math.abs(newY / this.imgHeight)
      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
      }
      this.$refs.bgImg.style['transform'] = `scale(${scale})`
      this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
      if (newY < moveHight) {
        zIndex = 10
        this.$refs.bgImg.style.paddingTop = 0
        this.$refs.bgImg.style.height = '46px'
      } else {
        this.$refs.bgImg.style.paddingTop = '70%'
        this.$refs.bgImg.style.height = 0
      }
      this.$refs.bgImg.style.zIndex = zIndex
    }
  },
  methods: {
    // handlePlaylist (playlist) {
    //   const bottom = playlist.length > 0 ? '60px' : ''
    //   this.$refs.list.$el.style.bottom = bottom
    //   this.$refs.list.refresh()
    // },
    back () {
      this.$router.push('/rank')
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    // 获取播放列表并存入store
    getList (id) {
      let params = {
        id,
        day: '2019-06-03',
        week: '2019_22'
      }
      getRankListDetails(params).then(res => {
        this.title = res.data.data.title
        let list = res.data.songInfoList
        list.forEach(item => {
          item.imgUrlBig = `https://y.gtimg.cn/music/photo_new/T002R800x800M000${item.album.mid}.jpg?max_age=2592000`
          item.imgUrlSmall = `https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.mid}.jpg?max_age=2592000`
        })
        this.$store.commit('SET_RANK_DETAILS', list)
        this.topListDetails = list
      })
    },
    // 播放音乐并将信息存入store
    playMusic (index, item) {
      this.$store.commit('SET_PLAY_LIST', this.topListDetails)
      this.$store.commit('SET_CURRENT_INDEX', index)
      this.$store.commit('SET_FULL_SCREEN', true)
      this.$store.commit('SET_PLAYING', true)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~/style/variables.scss';
  .music-list{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    // background-color: #999;
    .back-icon{
      position: absolute;
      left: 0;
      top: 0;
      padding: rem(8);
      font-size: rem(30);
      z-index: 50;
      color: #fff;
    }
    .title{
      pointer-events: none; // 点击穿透
      position: absolute;
      @include ellipsis();
      height: rem(46);
      line-height: rem(46);
      width: 100%;
      font-size: rem(24);
      text-align: center;
      color: #fff;
      z-index: 50;
    }
    .bg-img{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
    }
    .bg-layer{
      position: relative;
      height: 100%;
      background-color: #eee;
    }
    .list{
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: #eee;
      .music{
        padding:rem(8) rem(16);
        .song-name{
          font-size: rem(16);
          height: rem(24);
          line-height: rem(24);
          color: #000;
        }
        .song-singer{
          color: #666;
        }
      }
    }
  }
</style>
