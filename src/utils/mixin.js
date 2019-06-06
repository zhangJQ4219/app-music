import { mapGetters } from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted () {
    if (this.playlist && this.playlist.length > 0) {
      console.log('1')
      this.handlePlaylist(this.playlist)
    }
  },
  activated () {
    if (this.playlist && this.playlist.length > 0) {
      console.log('2')
      this.handlePlaylist(this.playlist)
    }
  },
  watch: {
    playlist (newVal) {
      if (this.playlist && this.playlist.length > 0) {
        console.log('3')
        this.handlePlaylist(this.playlist)
      }
    }
  },
  methods: {
    handlePlaylist () {
      throw new Error('handlePlaylist is not defined in components')
    }
  }
}
