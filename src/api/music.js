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

export function getRankList () {
  return request({
    url: '/getRankList',
    method: 'get'
  })
}

export function search (params) {
  return request({
    url: `https://music.niubishanshan.top/api/v2/music/search/${params}`,
    method: 'get'
  })
}

export function getMusicList () {
  return request({
    url: 'https://www.easy-mock.com/mock/5cb429769e5e43437f720ad8/example/getMusicList',
    method: 'get'
  })
}
