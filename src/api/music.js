import request from '@/utils/request'
export function getTest () {
  return request({
    url: 'https://music.niubishanshan.top/api/v2/music/recommend',
    method: 'get'
  })
}
