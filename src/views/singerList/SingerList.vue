<template>
  <div class="music-list" @touchmove.prevent>
    <div class="fontFamily back-icon" @click="back">&#xe606;</div>
    <div class="bg-img" v-lazy:background-image="singerList.singer_pic" ref="bgImg">
    </div>
    <div class="bg-layer" ref="layer"></div>
    <m-scroll :data="singerListDetails" @scroll="scroll"
            :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list">
      <div class="list-wrapper">
        <div v-for="(item, index) in singerListDetails" :key="item.songName" @click="playMusic(index, item)" class="music">
          <p class="song-name">{{index + 1}} {{item.title}}</p>
          <p class="song-singer">{{item.singers}}·{{item.title}}</p>
        </div>
      </div>
    </m-scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/music.js'
import MScroll from '@/components/m-scroll'
import { playListMixin } from '@/utils/mixin'

export default {
  mixins: [playListMixin],
  components: {
    MScroll
  },
  data () {
    return {
      singerListDetails: [],
      title: '',
      scrollY: 0,
      imgHeight: 0
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    // 刷新返回 上级目录
    if (!this.singerList.singer_mid) {
      this.$router.push('/singer')
    }
    if (this.$route.params.id) {
      console.log('请求')
      this.getList(this.$route.params.id)
    }
  },
  mounted () {
    this.imgHeight = this.$refs.bgImg.clientHeight
    this.$refs.list.$el.style.top = `${this.imgHeight}px`
  },
  computed: {
    // bgImg () {
    //   return `background-image:url(${this.musicList.cover_url_small})`
    //   // return `background-image:url("http://y.gtimg.cn/music/photo_new/T003R300x300M000002jfbMH2hdGnC.jpg")`
    // },
    ...mapGetters(['singerList'])
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
        this.$refs.bgImg.style['background-position-y'] = '17.3%'
      } else {
        this.$refs.bgImg.style.paddingTop = '70%'
        this.$refs.bgImg.style.height = 0
        this.$refs.bgImg.style['background-position-y'] = '50%'
      }
      this.$refs.bgImg.style.zIndex = zIndex
    }
  },
  methods: {
    // 改变scroll部分高度
    handlePlayList (playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.list.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    back () {
      this.$router.push('/singer')
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    // 获取播放列表并存入store
    getList (id) {
      let params = {
        'singer_mid': id
      }
      getSingerDetail(params).then(res => {
        // this.title = res.data.singerlist[0].dissname
        let list = res.data.singer.data.songlist
        console.log(res)
        list.forEach(item => {
          item.singers = this._getSinger(item.singer)
          item.imgUrlBig = `https://y.gtimg.cn/music/photo_new/T002R800x800M000${item.album.mid}.jpg?max_age=2592000`
          item.imgUrlSmall = `https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.mid}.jpg?max_age=2592000`
        })
        this.singerListDetails = list
      })
    },
    // 播放音乐并将信息存入store
    playMusic (index, item) {
      this.$store.commit('SET_PLAY_LIST', this.singerListDetails)
      this.$store.commit('SET_CURRENT_INDEX', index)
      this.$store.commit('SET_FULL_SCREEN', true)
      this.$store.commit('SET_PLAYING', true)
    },
    _getSinger (singer) {
      let ret = []
      if (!singer) {
        return ''
      }
      singer.forEach((item) => {
        ret.push(item.name)
      })
      return ret.join('/')
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
      background-position-y: 50%;
    }
    .bg-layer{
      position: relative;
      height: 100%;
      background-color: $list-bg;
    }
    .list{
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: $list-bg;
      .music{
        padding:rem(8) rem(16);
        .song-name{
          font-size: rem(16);
          height: rem(24);
          line-height: rem(24);
          color: #000;
        }
        .song-singer{
          color: $text-color-medium;
        }
      }
    }
  }
</style>
