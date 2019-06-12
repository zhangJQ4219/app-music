import { mapGetters } from 'vuex'

export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted () {
    if (this.playList.length > 0) {
      this.handlePlayList(this.playList)
    }
  },
  watch: {
    playList (newVal) {
      if (this.playList.length > 0) {
        this.handlePlayList(this.playList)
      }
    }
  },
  methods: {
    handlePlayList () {
      throw new Error('handlePlayList is not defined in components')
    }
  }
}
