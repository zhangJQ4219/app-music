const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}
const music = {
  state: {
    playing: false,
    playList: [],
    musicList: {},
    fullScreen: false,
    currentIndex: -1,
    mode: playMode.sequence
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
    }
  },
  actions: {
    SET_PLAYING ({ commit }, value) {
      return new Promise((resolve, reject) => {
        commit('SET_PLAYING', value)
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
