import request from '@/utils/request'
export function getTest () {
  return request({
    url: 'https://y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1558784510324&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1',
    method: 'get'
  })
}

// 获取轮播图信息
export function getSlider () {
  return request({
    url: '/getSlider',
    method: 'get'
  })
}
// 获取推荐列表
export function getRecommend () {
  return request({
    url: '/getRecommend',
    method: 'get'
  })
}

// 某一推荐列表歌曲
export function getRecommendSongs (params) {
  return request({
    url: '/getRecommendSongs',
    method: 'get',
    params
  })
}

// 获取歌手列表
export function getSingerList (params) {
  return request({
    url: '/getSingerList',
    method: 'get',
    params
  })
}

// 获取榜单前三数据
export function getRankList () {
  return request({
    url: '/getTopList',
    method: 'get'
  })
}

// 获取单个排行榜歌曲列表
export function getRankListDetails (params) {
  return request({
    url: '/getTopListDetails',
    method: 'get',
    params
  })
}

// 获取搜索信息
export function getSearch (params) {
  return request({
    url: '/getSearch',
    method: 'get',
    params
  })
}

// 获取歌手搜索信息或者歌曲信息
export function getSearchInfo (params) {
  return request({
    url: '/getSearchInfo',
    method: 'get',
    params
  })
}

// 获取歌曲详情
export function getSearchSong (params) {
  return request({
    url: '/getSearchSong',
    method: 'get',
    params
  })
}

// 获取歌词
export function getLyric (params) {
  return request({
    url: '/getLyric',
    method: 'get',
    params
  })
}
// 获取歌曲url
export function getSongUrl (params) {
  return request({
    url: '/getSongUrl',
    method: 'get',
    params
  })
}

// 获取热搜榜
export function getHotKeys () {
  return request({
    url: '/getHotKeys',
    method: 'get'
  })
}
