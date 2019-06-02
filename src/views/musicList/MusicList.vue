<template>
  <div class="music-list" @touchmove.prevent>
    <div v-for="(item, index) in topListDetails" :key="item.songName" @click="playMusic(index, item)" class="music">{{item.title}} - {{item.singer[0].name}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRankListDetails } from 'api/music.js'
// import { Base64 } from 'js-base64'
// import Lyric from 'lyric-parser'

export default {
  data () {
    return {
      topListDetails: []
    }
  },
  created () {
    // 刷新返回 上级目录
    if (!this.musicList.id) {
      this.$router.push('/rank')
    }
    if (this.$route.params.id) {
      this.getList(this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters(['musicList', 'playList'])
  },
  watch: {
    musicList () {
    },
    playList () {
    }
  },
  methods: {
    // 获取播放列表并存入store
    getList (id) {
      let params = {
        id,
        day: '2019-06-02',
        week: '2019_21'
      }
      getRankListDetails(params).then(res => {
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
      console.log(index)
      // document.body.classList.add('overflow-hidden')
      // document.addEventListener('touchmove', this.touchStart, { passive: false })
      this.$store.commit('SET_PLAY_LIST', this.topListDetails)
      this.$store.commit('SET_CURRENT_INDEX', index)
      this.$store.commit('SET_FULL_SCREEN', true)
      // this.$store.commit('SET_CURRENT_LYRIC', item.lyric)
    }
    // // 解析歌词
    // getLyric (val) {
    //   let lyric = new Lyric(Base64.decode(val))
    //   console.log(new Lyric(Base64.decode(val)))
    //   this.$store.commit('SET_CURRENT_LYRIC', lyric)
    // }
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
    background-color: #999;
    .music{
      padding: rem(16);
    }
  }
</style>