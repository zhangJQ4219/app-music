const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}
const music = {
  state: {
    playing: false, // 是否播放
    rankListDetails: [],
    playList: [], // 播放列表
    musicList: {}, // 排行榜歌曲列表
    fullScreen: false, // 是否全屏
    currentIndex: -1, // 当前歌曲索引
    mode: playMode.sequence // 播放模式
  },
  mutations: {
    SET_PLAYING (state, value) {
      state.playing = value
    },
    SET_PLAY_LIST (state, list) {
      state.playList = list
    },
    SET_MUSIC_LIST (state, list) {
      state.musicList = list
    },
    SET_FULL_SCREEN (state, value) {
      state.fullScreen = value
    },
    SET_CURRENT_INDEX (state, value) {
      state.currentIndex = value
    },
    SET_MODE (state, value) {
      state.mode = value
    },
    SET_RANK_DETAILS (state, list) {
      state.mode = list
    }
  },
  actions: {
    SET_PLAYING ({ commit }, value) {
      return new Promise((resolve, reject) => {
        commit('SET_PLAYING', value)
        resolve()
      })
    },
    SET_RANK_DETAILS ({ commit }, list) {
      return new Promise((resolve, reject) => {
        commit('SET_RANK_DETAILS', list)
        resolve()
      })
    },
    SET_PLAY_LIST ({ commit }, list) {
      return new Promise((resolve, reject) => {
        commit('SET_PLAY_LIST', list)
        resolve()
      })
    },
    SET_MUSIC_LIST ({ commit }, list) {
      return new Promise((resolve, reject) => {
        commit('SET_MUSIC_LIST', list)
        resolve()
      })
    }
  }
}
export default music
