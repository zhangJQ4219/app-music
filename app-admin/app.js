var express = require('express')
const request = require('request')
var app = express()
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://y.qq.com')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}
let rec = require('./rec')
app.use(allowCrossDomain)
app.use(express.static('./dist'))

// 获取轮播图数据
app.get('/getSlider', (req, res) => {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1558784510324&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
  request({
    url: url,
    method: 'GET'
  }, (error, response, body) => {
    if (!error) {
      res.json(response)
    }
  })
})

// 获取推荐数据
app.get('/getRecommend', (req, response) => {
  Promise.all([rec.rec1(), rec.rec2(), rec.rec3(), rec.rec4(), rec.rec5(), rec.rec6()]).then(res => {
    let data = {
      code: 200,
      msg: 'success',
      data: res
    }
    response.json(data)
  })
})

// 获取某一推荐歌曲列表
app.get('/getRecommendSongs', (req, res) => {
  let url = `https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&new_format=1&disstid=${req.query.tid}&g_tk=1278012111&loginUin=851981243&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
  request({
    url: url,
    method: 'GET',
    headers: {
      'origin': 'https://y.qq.com',
      'referer': `https://y.qq.com/n/yqq/playsquare/${req.query.tid}.html`
    }
  }, (error, response, body) => {
    if (!error) {
      let data = {
        code: 200,
        msg: 'success',
        data: JSON.parse(response.body)
      }
      res.json(data)
    } else {
      let data = {
        code: 500,
        msg: 'failure',
        data: null
      }
      res.json(data)
    }
  })
})

// 获取歌手排名
app.get('/getSingerList', (req, res) => {
  let url = `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI${Math.random() * 10e16}&g_tk=1278012111&loginUin=851981243&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D`
  request({
    url: url,
    method: 'GET'
  }, (error, response, body) => {
    if (!error) {
      let data = {
        code: 200,
        msg: 'success',
        data: JSON.parse(response.body)
      }
      res.json(data)
    } else {
      let data = {
        code: 500,
        msg: 'failure',
        data: null
      }
      res.json(data)
    }
  })
})

// 获取歌曲url
app.get('/getSongUrl', (req, res) => {
  let url = `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey${Math.random() * 10e16}&g_tk=1278012111&loginUin=851981243&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%229361190287%22%2C%22songmid%22%3A%5B%22${req.query.songmid}%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%22851981243%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A851981243%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D`
  request({
    url: url,
    method: 'GET',
    headers: {
      'origin': 'https://y.qq.com',
      'referer': 'https://y.qq.com/portal/player.html'
    }
  }, (error, response, body) => {
    if (!error) {
      let data = {
        code: 200,
        msg: 'success',
        data: JSON.parse(response.body).req_0.data
      }
      res.json(data)
    } else {
      let data = {
        code: 500,
        msg: 'failure',
        data: null
      }
      res.json(data)
    }
  })
})

// 获取排行榜数据
app.get('/getRankList', (req, res) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1558879366249&g_tk=1304132415&uin=851981243&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
  request({
    url: url,
    method: 'GET'
  }, (error, response, body) => {
    if (!error) {
      res.json(response)
    }
  })
})

// 获取热搜榜
app.get('/getHotKeys', (req, res) => {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?_=1559491471993&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
  request({
    url: url,
    method: 'GET'
  }, (error, response, body) => {
    if (!error) {
      let data = {
        code: 200,
        msg: 'success',
        data: JSON.parse(response.body).data
      }
      res.json(data)
    } else {
      let data = {
        code: 500,
        msg: 'failure',
        data: null
      }
      res.json(data)
    }
  })
})

// 获取搜索信息
app.get('/getSearch', (req, res) => {
  let url = `https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&key=${encodeURIComponent(req.query.key)}&g_tk=1278012111&loginUin=851981243&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
  request({
    url: url,
    method: 'GET'
  }, (error, response, body) => {
    if (!error) {
      let data = {
        code: 200,
        msg: 'success',
        data: JSON.parse(response.body).data
      }
      res.json(data)
    } else {
      let data = {
        code: 500,
        msg: 'failure',
        data: null
      }
      res.json(data)
    }
  })
})

// 搜索歌曲信息或者歌手
app.get('/getSearchInfo', (req, res) => {
  let url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.top&searchid=34167242315032774&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=${encodeURIComponent(req.query.info)}&g_tk=1278012111&loginUin=851981243&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
  request({
    url: url,
    method: 'GET'
  }, (error, response, body) => {
    if (!error) {
      let data = {
        code: 200,
        msg: 'success',
        data: JSON.parse(response.body).data
      }
      res.json(data)
    } else {
      let data = {
        code: 500,
        msg: 'failure',
        data: null
      }
      res.json(data)
    }
  })
})

// 搜索歌曲详情
app.get('/getSearchSong', (req, res) => {
  let url = `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI17679226400269332&g_tk=1278012111&loginUin=851981243&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22songinfo%22%3A%7B%22method%22%3A%22get_song_detail_yqq%22%2C%22param%22%3A%7B%22song_type%22%3A0%2C%22song_mid%22%3A%22000CcEGG18jgna%22%2C%22song_id%22%3A230731610%7D%2C%22module%22%3A%22music.pf_song_detail_svr%22%7D%7D`
  request({
    url: url,
    method: 'GET'
  }, (error, response, body) => {
    if (!error) {
      let data = {
        code: 200,
        msg: 'success',
        data: JSON.parse(response.body).songinfo
      }
      res.json(data)
    } else {
      let data = {
        code: 500,
        msg: 'failure',
        data: null
      }
      res.json(data)
    }
  })
})

// 获取歌词
app.get('/getLyric', (req, res) => {
  let url = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?-=MusicJsonCallback_lrc&pcachetime=1559404788246&songmid=${req.query.songmid}&g_tk=1278012111&loginUin=851981243&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
  request({
    url: url,
    method: 'GET',
    headers: {
      'origin': 'https://y.qq.com',
      'referer': 'https://y.qq.com/portal/player.html'
    }
  }, (error, response, body) => {
    if (!error) {
      let data = {
        code: 200,
        msg: 'success',
        'data': {
          'lyric': JSON.parse(response.body).lyric
        }
      }
      res.json(data)
    } else {
      let data = {
        code: 500,
        msg: 'failure',
        data: null
      }
      res.json(data)
    }
  })
})

// 获取歌曲url
app.get('/getSongUrl', (req, res) => {
  let url = `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey${Math.random() * 10e16}&g_tk=1278012111&loginUin=851981243&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%229361190287%22%2C%22songmid%22%3A%5B%22${req.query.songmid}%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%22851981243%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A851981243%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D`
  request({
    url: url,
    method: 'GET',
    headers: {
      'origin': 'https://y.qq.com',
      'referer': 'https://y.qq.com/portal/player.html'
    }
  }, (error, response, body) => {
    if (!error) {
      let data = {
        code: 200,
        msg: 'success',
        data: JSON.parse(response.body).req_0.data
      }
      res.json(data)
    } else {
      let data = {
        code: 500,
        msg: 'failure',
        data: null
      }
      res.json(data)
    }
  })
})

// 获取榜单前三数据
app.get('/getTopList', (req, res) => {
  request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1559476770577&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1',
    method: 'GET'
  }, (error, response, body) => {
    if (!error) {
      let data = {
        code: 200,
        msg: 'success',
        data: JSON.parse(response.body).data
      }
      res.json(data)
    } else {
      let data = {
        code: 500,
        msg: 'failure',
        data: null
      }
      res.json(data)
    }
  })
})

// 获取某个榜单所有数据按时间 例如： 2019-06-02 如果没有数据 请求 周数例如：2019_21
app.get('/getTopListDetails', (req, res) => {
  let url = `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI0${Math.random() * 10e16}&g_tk=1278012111&loginUin=851981243&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A${req.query.id}%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%22${req.query.day}%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D`
  request({
    url: url,
    method: 'GET'
  }, (error, response, body) => {
    if (!error) {
      if (JSON.parse(response.body).detail.data.songInfoList.length > 0) {
        let data = {
          code: 200,
          msg: 'success',
          data: JSON.parse(response.body).detail.data
        }
        res.json(data)
      } else {
        request({
          url: `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI0${Math.random() * 10e16}&g_tk=1278012111&loginUin=851981243&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A${req.query.id}%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%22${req.query.week}%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D`,
          method: 'GET'
        }, (error, response, body) => {
          if (!error) {
            let data = {
              code: 200,
              msg: 'success',
              data: JSON.parse(response.body).detail.data
            }
            res.json(data)
          } else {
            let data = {
              code: 500,
              msg: 'failure',
              data: null
            }
            res.json(data)
          }
        })
      }
    } else {
      let data = {
        code: 500,
        msg: 'failure',
        data: null
      }
      res.json(data)
    }
  })
})

app.listen(3001, () => {
  console.log('成功')
})
