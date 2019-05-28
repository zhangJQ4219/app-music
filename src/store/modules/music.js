const music = {
  state: {
    playing: false
  },
  mutations: {
    SET_PLAYING (state, value) {
      state.playing = value
    }
  },
  actions: {
    SET_PLAYING ({ commit }, value) {
      return new Promise(() => {
        commit('SET_PLAYING', value)
      })
    }
  }
}
export default music
