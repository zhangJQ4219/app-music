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
    musicList: {}, // 排行榜歌曲列表详情介绍
    cdList: {}, // 推荐歌曲列表详情介绍
    singerList: {}, // 歌手介绍
    fullScreen: false, // 是否全屏
    currentIndex: -1, // 当前歌曲索引
    mode: playMode.sequence, // 播放模式,
    searchKey: null // 搜索关键词
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
    SET_CD_LIST (state, list) {
      state.cdList = list
    },
    SET_SINGER_LIST (state, list) {
      state.singerList = list
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
      state.rankListDetails = list
    },
    SET_SEARCH_KEY (state, value) {
      state.searchKey = value
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
    },
    SET_CD_LIST ({ commit }, list) {
      return new Promise((resolve, reject) => {
        commit('SET_CD_LIST', list)
        resolve()
      })
    },
    SET_SEARCH_KEY ({ commit }, value) {
      return new Promise((resolve, reject) => {
        commit('SET_SEARCH_KEY', value)
        resolve()
      })
    }
  }
}
export default music
