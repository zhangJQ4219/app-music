const request = require('request')
function rec1 () {
  return new Promise((resolve, reject) => {
    let url1 = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom28489032162126526&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%7D'
    request({
      url: url1,
      method: 'GET'
    }, (error, response, body) => {
      let data = JSON.parse(response.body).recomPlaylist.data.v_hot.slice(0, 6)
      data.map(item => {
        item['cover_url_small'] = item.cover
        item['access_num'] = item.listen_num
      })
      lastData = { title: '为你推荐', list: data }
      resolve(lastData)
    })
  })
}

function rec2 () {
  return new Promise((resolve, reject) => {
    let url1 = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom15914313032326932&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A3056%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A3056%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%7D'
    request({
      url: url1,
      method: 'GET'
    }, (error, response, body) => {
      let data = JSON.parse(response.body).playlist.data.v_playlist.slice(0, 6)
      lastData = { title: '网络歌曲', list: data }
      resolve(lastData)
    })
  })
}

function rec3 () {
  return new Promise((resolve, reject) => {
    let url1 = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom13862334963503997&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A3215%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A3215%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%7D'
    request({
      url: url1,
      method: 'GET'
    }, (error, response, body) => {
      let data = JSON.parse(response.body).playlist.data.v_playlist.slice(0, 6)
      lastData = { title: '咖啡馆', list: data }
      resolve(lastData)
    })
  })
}

function rec4 () {
  return new Promise((resolve, reject) => {
    let url1 = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom6365631216835981&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A74%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A74%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%7D'
    request({
      url: url1,
      method: 'GET'
    }, (error, response, body) => {
      let data = JSON.parse(response.body).playlist.data.v_playlist.slice(0, 6)
      lastData = { title: '伤感', list: data }
      resolve(lastData)
    })
  })
}

function rec5 () {
  return new Promise((resolve, reject) => {
    let url1 = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom8107920568385405&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A3317%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A3317%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%7D'
    request({
      url: url1,
      method: 'GET'
    }, (error, response, body) => {
      let data = JSON.parse(response.body).playlist.data.v_playlist.slice(0, 6)
      lastData = { title: '官方歌单', list: data }
      resolve(lastData)
    })
  })
}

function rec6 () {
  return new Promise((resolve, reject) => {
    let url1 = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom404485820541016&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A71%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A71%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%7D'
    request({
      url: url1,
      method: 'GET'
    }, (error, response, body) => {
      let data = JSON.parse(response.body).playlist.data.v_playlist.slice(0, 6)
      lastData = { title: '情歌', list: data }
      resolve(lastData)
    })
  })
}
module.exports = {
  rec1,
  rec2,
  rec3,
  rec4,
  rec5,
  rec6
}
