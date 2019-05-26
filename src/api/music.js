import request from '@/utils/request'
export function getTest () {
  return request({
    url: 'https://y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1558784510324&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1',
    method: 'get'
  })
}

export function getSlider () {
  return request({
    url: '/api/getSlider',
    method: 'get'
  })
}

export function getRecommend () {
  return request({
    url: '/api/getRecommend',
    method: 'get'
  })
}

export function getRankList () {
  return request({
    url: '/api/getRankList',
    method: 'get'
  })
}
