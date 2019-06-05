import request from '@/utils/request'
export function getTest () {
  return request({
    url: 'https://y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1558784510324&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1',
    method: 'get'
  })
}

export function getSlider () {
  return request({
    url: '/getSlider',
    method: 'get'
  })
}

export function getRecommend () {
  return request({
    url: '/getRecommend',
    method: 'get'
  })
}
// 获取榜单前三数据
export function getRankList () {
  return request({
    url: '/getTopList',
    method: 'get'
  })
}

//
export function getRankListDetails (params) {
  return request({
    url: '/getTopListDetails',
    method: 'get',
    params
  })
}

export function getMusicList () {
  return request({
    url: 'https://www.easy-mock.com/mock/5cb429769e5e43437f720ad8/example/getMusicList',
    method: 'get'
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
