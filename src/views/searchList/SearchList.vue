<template>
  <div class="container" v-if="searchKey">
    <m-scroll :data="searchList" class="list" ref="list">
      <div class="list-wrapper">
        <div v-for="(item, index) in searchList" :key="item.songName" @click="playMusic(index, item)" class="search-list">
          <p class="song">{{item.name}}</p>
          <span class="singer">{{item.singer && item.singers}}</span>
          <span class="album"> · {{item.album.name}}</span>
          <p v-if="!!item.lyric" class="edition">{{item.lyric}}</p>
        </div>
      </div>
    </m-scroll>
    <div class="loading-container" v-show="loading">
      <m-loading></m-loading>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSearchInfo } from 'api/music.js'
import MScroll from '@/components/m-scroll'
import { playListMixin } from '@/utils/mixin'
import MLoading from '@/components/m-loading'

export default {
  mixins: [playListMixin],
  components: {
    MScroll,
    MLoading
  },
  data () {
    return {
      searchList: []
    }
  },
  computed: {
    loading () {
      return !(this.searchList.length > 0)
    },
    ...mapGetters(['searchKey'])
  },
  created () {
    if (!this.searchKey) {
      this.$router.push('/search')
    }
    if (this.$route.params.id) {
      this.getInfo(this.$route.params.id)
    }
  },
  watch: {
    '$route' (to, from) {
      this.getInfo(to.params.id)
    }
  },
  methods: {
    // 改变scroll部分高度
    handlePlayList (playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.list.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    getInfo (id) {
      this.searchList = []
      let params = {
        info: id
      }
      getSearchInfo(params).then(res => {
        console.log(res)
        let list = res.data.song.list
        list.forEach(item => {
          item.singers = this._getSinger(item.singer)
          item.imgUrlBig = `https://y.gtimg.cn/music/photo_new/T002R800x800M000${item.album.mid}.jpg?max_age=2592000`
          item.imgUrlSmall = `https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.mid}.jpg?max_age=2592000`
        })
        this.searchList = list
      })
    },
    // 播放音乐并将信息存入store
    playMusic (index, item) {
      this.$store.commit('SET_PLAY_LIST', this.searchList)
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
.container{
  // position: absolute;
  // left: 0;
  // width: 100%;
  // top: rem(50);
  // bottom: 0;
  // background-color: #999;
  .list{
    // z-index: 3;
    position: absolute;
    top: rem(50);
    bottom: 0;
    width: 100%;
    background: $list-bg;
    overflow: hidden;
    .list-wrapper{
      .search-list{
        padding: rem(16);
        width: rem(300);
          @include ellipsis();
        .song{
          font-size: rem(16);
          padding: rem(8) 0;
          height: rem(20);
          line-height: rem(20);
        }
        .singer{
          font-size: rem(12);
          line-height: rem(20);
        }
        .album{
          font-size: rem(12);
          color: $text-color-light;
          line-height: rem(20);
          width: rem(280);
        }
        .edition{
          font-size: rem(12);
          line-height: rem(20);
          color: $text-color-light;
          width: rem(300);
          @include ellipsis();
        }
      }
    }
  }
  .loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
