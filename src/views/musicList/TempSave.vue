<template>
  <div class="music-list" @touchmove.prevent>
    <div v-for="(item, index) in list" :key="item.songName" @click="playMusic(index, item)" class="music">{{item.songName}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMusicList } from 'api/music.js'
// import { Base64 } from 'js-base64'
// import Lyric from 'lyric-parser'

export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    // 刷新返回 上级目录
    if (!this.musicList.id) {
      this.$router.push('/rank')
    }
    if (this.$route.params.id) {
      this.getList()
    }
  },
  computed: {
    ...mapGetters(['musicList'])
  },
  methods: {
    // 获取播放列表并存入store
    getList () {
      getMusicList().then(res => {
        this.$store.dispatch('SET_PLAY_LIST', res.data.musicList)
        this.list = res.data.musicList
      })
    },
    // 播放音乐并将信息存入store
    playMusic (index, item) {
      document.body.classList.add('overflow-hidden')
      // document.addEventListener('touchmove', this.touchStart, { passive: false })
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
