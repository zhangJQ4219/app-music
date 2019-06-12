const getters = {
  playing: state => state.music.playing,
  rankListDetails: state => state.music.rankListDetails,
  playList: state => state.music.playList,
  musicList: state => state.music.musicList,
  fullScreen: state => state.music.fullScreen,
  currentIndex: state => state.music.currentIndex,
  mode: state => state.music.mode,
  searchKey: state => state.music.searchKey,
  currentSong: state => state.music.playList[state.music.currentIndex] || {}
}
export default getters
