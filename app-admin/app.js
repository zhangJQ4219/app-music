var express=require('express');
const request = require("request");
const axios = require('axios')
var url=require('url');
var app=express();
var allowCrossDomain = function(req, res, next) {
    // res.header('Access-Control-Allow-Origin', 'https://y.qq.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
let rec = require('./rec')
app.use(allowCrossDomain);
// app.use(express.static('./dist'))
// 获取轮播图数据
app.get('/getSlider', (req, res) => {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1558784510324&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
    request({
      url: url,
      method: 'GET'
    }, (error, response, body)=>{
     res.json(response)
  });
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

// 获取排行榜数据
app.get('/getRankList', (req, res) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1558879366249&g_tk=1304132415&uin=851981243&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
    request({
      url: url,
      method: 'GET'
    }, (error, response, body)=>{
     res.json(response)
  });
})

app.listen(3001, () => {
  console.log('成功')
});