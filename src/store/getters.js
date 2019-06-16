const getters = {
  playing: state => state.music.playing,
  rankListDetails: state => state.music.rankListDetails,
  playList: state => state.music.playList,
  musicList: state => state.music.musicList,
  cdList: state => state.music.cdList,
  singerList: state => state.music.singerList,
  fullScreen: state => state.music.fullScreen,
  currentIndex: state => state.music.currentIndex,
  mode: state => state.music.mode,
  searchKey: state => state.music.searchKey,
  currentSong: state => state.music.playList[state.music.currentIndex] || {}
}
export default getters
