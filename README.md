# app-music

## 概述

---

node版本： **v8.11.3**

npm版本 ： **v5.6.0**

使用框架 ： **vue**

构建工具 ： **vue-cli3**

页面UI   ： **vant**

项目图标   ： **iconfont**

项目描述 ：**基于vue2.x的仿QQ音乐移动端项目**

使用插件 ：详见**package.json**

启动项目 ：**npm run serve**

打包项目 ：**npm run build**

### 项目详述

---

本项目为app-music, 是一款基于vue2.x的仿QQ音乐的移动端项目。项目中接口数据全部来自QQ音
__本接口所有数据均来自 QQ 音乐, 仅供学习交流之用,请不要用于商业用途. 如果喜欢请下载 QQ 音乐 APP 畅听.如有侵权请联系QQ: 851981243, 我会第一时间删除~__

##### 技术栈

---

本项目使用的主要技术栈包括：

- scss
- es6相关（主要是`promise`、`箭头函数`）
- vuex
- axios

### 项目初始化

---

* 引入reset.css文件 重置统一个浏览器之间的样式差异

* 引入border.css文件 解决移动端1像素边框问题

* 引入[fastclick](https://github.com/ftlabs/fastclick)插件，解决移动端点击300ms延迟问题

* rem适配
    > 通过在入口文件设置html字体大小(详见APP.vue文件)，在通过在.scss文件中创建rem函数
    ``` 一般开发都是以375*667为标准
    @function rem($px) {
      $rem: 37.5;
      @return ($px / $rem ) + rem;
    }
    ```
    ``` 例如UI宽度为100px
    width: rem(100)
    ```

### 项目打包

---

运行npm run build 之后 直接将dist文件放在app-admin文件夹下即可

### 项目结构

---

PS: 在需要输出目录结构的文件中shift+右键打开命令窗口 
  `tree/f>文件名.txt`

```
src:
│  App.vue                       // 入口文件
│  main.js                       // js主入口
│  registerServiceWorker.js         
│  
├─api
│      music.js                  // 音乐接口
│      
├─assets
│  │  logo.png
│  │  
│  ├─iconfont                   // iconfont相关文件
│  │      iconfont.css
│  │      iconfont.eot
│  │      iconfont.svg
│  │      iconfont.ttf
│  │      iconfont.woff
│  │      
│  ├─load
│  │      error.jpg
│  │      loading.gif
│  │      
│  └─style
│          border.css
│          reset.css
│          variables.scss
│          
├─components
│  ├─m-bottomlist              // 歌曲播放列表组件 
│  │      index.vue
│  │      
│  ├─m-header
│  │      index.vue
│  │      logo.png
│  │      
│  ├─m-loading                 // 加载组件
│  │      index.vue
│  │      loading.gif
│  │      
│  └─m-scroll                  // 滚动组件
│          index.vue
│          
├─router                      // 路由配置
│      index.js
│      
├─store                       // vuex
│  │  getters.js
│  │  index.js
│  │  
│  └─modules
│          music.js
│          
├─utils
│      mixin.js               // mixin
│      request.js             // axios拦截器
│      
└─views
    ├─musicList               // 歌曲列表
    │      MusicList.vue
    │      
    ├─player                  // 播放组件包括全屏和底部两种模式
    │  │  Player.vue
    │  │  
    │  └─components           // 音乐播放进度条组件
    │          m-progress.vue
    │          
    ├─rank
    │      Rank.vue          // 排行榜页面
    │      
    ├─recommend
    │  │  Recommend.vue      // 首页-推荐页
    │  │  
    │  └─components
    │          recommend-item.vue // 推荐页横向滚动列表组件
    │          
    ├─search
    │      Search.vue        // 搜索页面
    │      
    ├─searchList
    │      SearchList.vue    // 搜索列表
    │      
    └─singer
            Singer.vue       // 歌手页面（暂未完成）
```

### 项目界面展示

* recommend
<img src="https://github.com/zhangJQ4219/Img/blob/master/recommend.jpg" width="300px" />

* rank
<img src="https://github.com/zhangJQ4219/Img/blob/master/rank.jpg" width="300px" />

* player
<img src="https://github.com/zhangJQ4219/Img/blob/master/player.jpg" width="300px" />

* lyric
<img src="https://github.com/zhangJQ4219/Img/blob/master/lyric.jpg" width="300px" />
