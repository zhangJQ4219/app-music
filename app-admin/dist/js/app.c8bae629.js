(function(t){function e(e){for(var r,i,o=e[0],a=e[1],l=e[2],u=0,h=[];u<o.length;u++)i=o[u],s[i]&&h.push(s[i][0]),s[i]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r]);d&&d(e);while(h.length)h.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],r=!0,i=1;i<n.length;i++){var o=n[i];0!==s[o]&&(r=!1)}r&&(c.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},i={app:0},s={app:0},c=[];function o(t){return a.p+"js/"+({}[t]||t)+"."+{"chunk-3040b576":"de4bc8e9","chunk-05a4d11e":"e919afde","chunk-31c0df2c":"1bfe2bfb","chunk-44a32935":"203e6fbe","chunk-9f8108a0":"f4cb9388","chunk-3a79b633":"340cae93"}[t]+".js"}function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(t){var e=[],n={"chunk-05a4d11e":1,"chunk-31c0df2c":1,"chunk-44a32935":1,"chunk-9f8108a0":1,"chunk-3a79b633":1};i[t]?e.push(i[t]):0!==i[t]&&n[t]&&e.push(i[t]=new Promise(function(e,n){for(var r="css/"+({}[t]||t)+"."+{"chunk-3040b576":"31d6cfe0","chunk-05a4d11e":"9a10146d","chunk-31c0df2c":"56d0d70f","chunk-44a32935":"23a09e47","chunk-9f8108a0":"2e6893e3","chunk-3a79b633":"3feff6f0"}[t]+".css",s=a.p+r,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var l=c[o],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===r||u===s))return e()}var h=document.getElementsByTagName("style");for(o=0;o<h.length;o++){l=h[o],u=l.getAttribute("data-href");if(u===r||u===s)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var r=e&&e.target&&e.target.src||s,c=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete i[t],d.parentNode.removeChild(d),n(c)},d.href=s;var f=document.getElementsByTagName("head")[0];f.appendChild(d)}).then(function(){i[t]=0}));var r=s[t];if(0!==r)if(r)e.push(r[2]);else{var c=new Promise(function(e,n){r=s[t]=[e,n]});e.push(r[2]=c);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,a.nc&&u.setAttribute("nonce",a.nc),u.src=o(t),l=function(e){u.onerror=u.onload=null,clearTimeout(h);var n=s[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src,c=new Error("Loading chunk "+t+" failed.\n("+r+": "+i+")");c.type=r,c.request=i,n[1](c)}s[t]=void 0}};var h=setTimeout(function(){l({type:"timeout",target:u})},12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(e)},a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/",a.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var h=0;h<l.length;h++)e(l[h]);var d=u;c.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},1351:function(t,e,n){},"558d":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=(n("df49"),n("e7bd"),n("0c29"),n("cd5d"),n("6f24"),n("2696"),n("7c8a"),n("ae0c"),n("47fe"),n("4403"),n("1cf7"),n("7add"),n("84d6"),n("d2c1"),n("291f"),n("7ced"),n("09ad"),n("81c3"),n("6fe1"),n("a801"),n("031d"),n("63b4"),n("9173"),n("8344"),n("664d"),n("0124"),n("9736"),n("1cc1"),n("e231"),n("aea1"),n("5f4e"),n("0679"),n("2799")),s=n("bdd9");n("a2d2"),n("ba90"),n("36b6"),n("0f85");r["a"].use(i["a"]),r["a"].use(s["a"]);var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view"),n("player")],1)},o=[],a=n("6ae5"),l={components:{Player:a["default"]},mounted:function(){window.onload=function(){var t=document.documentElement.clientWidth||document.body.clientWidth,e=document.getElementsByTagName("html")[0];e.style.fontSize=t/10+"px",window.addEventListener("resize",function(t){var n=document.documentElement.clientWidth||document.body.clientWidth;e.style.fontSize=n/10+"px"})}}},u=l,h=n("2877"),d=Object(h["a"])(u,c,o,!1,null,null,null),f=d.exports,p=n("8c4f");r["a"].use(p["a"]);var m=new p["a"]({routes:[{path:"/",redirect:"/recommend"},{path:"/recommend",name:"recommend",component:function(){return Promise.all([n.e("chunk-3040b576"),n.e("chunk-9f8108a0")]).then(n.bind(null,"72c9"))}},{path:"/search",name:"search",component:function(){return Promise.all([n.e("chunk-3040b576"),n.e("chunk-44a32935")]).then(n.bind(null,"794be"))}},{path:"/rank",name:"rank",component:function(){return Promise.all([n.e("chunk-3040b576"),n.e("chunk-05a4d11e")]).then(n.bind(null,"0e05"))},children:[{path:":id",name:"musicList",component:function(){return Promise.all([n.e("chunk-3040b576"),n.e("chunk-31c0df2c")]).then(n.bind(null,"e757"))}}]},{path:"/singer",name:"singer",component:function(){return n.e("chunk-3a79b633").then(n.bind(null,"2b27"))}},{path:"/player",name:"player",component:function(){return Promise.resolve().then(n.bind(null,"6ae5"))}}]}),g=n("2f62"),y={sequence:0,loop:1,random:2},v={state:{playing:!1,playList:[],musicList:{},fullScreen:!1,currentIndex:-1,mode:y.sequence},mutations:{SET_PLAYING:function(t,e){t.playing=e},SET_PLAY_LIST:function(t,e){t.playList=e},SET_MUSIC_LIST:function(t,e){t.musicList=e},SET_FULL_SCREEN:function(t,e){t.fullScreen=e},SET_CURRENT_INDEX:function(t,e){t.currentIndex=e},SET_MODE:function(t,e){t.mode=e}},actions:{SET_PLAYING:function(t,e){var n=t.commit;return new Promise(function(t,r){n("SET_PLAYING",e),t()})},SET_PLAY_LIST:function(t,e){var n=t.commit;return new Promise(function(t,r){n("SET_PLAY_LIST",e),t()})},SET_MUSIC_LIST:function(t,e){var n=t.commit;return new Promise(function(t,r){n("SET_MUSIC_LIST",e),t()})}}},b=v,S={playing:function(t){return t.music.playing},playList:function(t){return t.music.playList},musicList:function(t){return t.music.musicList},fullScreen:function(t){return t.music.fullScreen},currentIndex:function(t){return t.music.currentIndex},mode:function(t){return t.music.mode},currentSong:function(t){return t.music.playList[t.music.currentIndex]||{}}},_=S;r["a"].use(g["a"]);var L=new g["a"].Store({modules:{music:b},getters:_}),w=n("9483");Object(w["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});n("7371"),n("aa47");var T=n("fe3c"),C=n.n(T);n("be35");C.a.attach(document.body),r["a"].config.productionTip=!1,new r["a"]({router:m,store:L,render:function(t){return t(f)}}).$mount("#app")},"6ae5":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"show",rawName:"v-show",value:t.showPlayer,expression:"showPlayer"}],on:{touchmove:function(t){t.preventDefault()}}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.fullScreen,expression:"fullScreen"}],staticClass:"player"},[n("div",{staticClass:"bg"},[n("img",{attrs:{width:"100%",height:"100%",src:t.currentSong.img}})]),n("div",{staticClass:"content"},[n("div",{staticClass:"top"},[n("div",{staticClass:"fontFamily top-left",on:{click:t.handleMini}},[t._v("")]),n("span",{staticClass:"song-name"},[t._v(t._s(t.currentSong.songName))]),n("span",{staticClass:"singer-name"},[t._v(t._s(t.currentSong.singerName))])]),n("div",{staticClass:"middle",on:{touchstart:function(e){return e.preventDefault(),t.middleTouchStart(e)},touchmove:function(e){return e.preventDefault(),t.middleTouchMove(e)},touchend:t.middleTouchEnd}},[n("div",{ref:"middleL",staticClass:"middle-left"},[n("div",{staticClass:"pic",class:t.play},[n("img",{attrs:{src:t.currentSong.img,alt:""}})])]),n("m-scroll",{ref:"lyricList",staticClass:"middle-right",attrs:{data:t.currentLyric&&t.currentLyric.lines}},[n("div",{staticClass:"lyric-wraaper"},[t.currentLyric?n("div",t._l(t.currentLyric.lines,function(e,r){return n("p",{key:e.time,ref:"lyricLine",refInFor:!0,staticClass:"text",class:{current:t.currentLine===r}},[t._v(t._s(e.txt))])}),0):t._e()])])],1),n("div",{staticClass:"bottom"},[n("div",{staticClass:"dot-wrapper"},[n("span",{staticClass:"dot",class:{active:"cd"===t.currentShow}}),n("span",{staticClass:"dot",class:{active:"lyric"===t.currentShow}})]),n("div",{staticClass:"progress-wrapper"},[n("span",{staticClass:"time"},[t._v(t._s(t._f("formatDate")(t.currentTime)))]),n("div",{staticClass:"progress-content"},[n("m-progress",{attrs:{percent:t.percent},on:{percentChange:t.changeProgress}})],1),n("span",{staticClass:"time"},[t._v(t._s(t._f("formatDate")(t.duration)))])]),n("div",{staticClass:"btn-wrapper"},[n("div",{staticClass:"fontFamily btn-small",domProps:{innerHTML:t._s(t.modeIcon)},on:{click:t.changeMode}}),n("div",{staticClass:"fontFamily btn-middle",on:{click:t.prev}},[t._v("")]),n("div",{staticClass:"fontFamily btn-big",domProps:{innerHTML:t._s(t.playIcon)},on:{click:t.playSong}}),n("div",{staticClass:"fontFamily btn-middle",on:{click:t.next}},[t._v("")]),n("div",{staticClass:"fontFamily btn-small"},[t._v("")])])])])]),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.fullScreen,expression:"!fullScreen"}],staticClass:"player-mini",on:{click:t.handleOpen}},[n("div",{staticClass:"left",class:t.play},[n("img",{staticClass:"pic-mini",attrs:{src:t.currentSong.img,alt:""}})]),n("div",{staticClass:"middle"},[n("span",{staticClass:"middle-name-mini"},[t._v(t._s(t.currentSong.songName)+" - "+t._s(t.currentSong.singerName))])]),n("div",{staticClass:"right"},[n("div",{staticClass:"fontFamily btn-play",domProps:{innerHTML:t._s(t.playIcon)},on:{click:function(e){return e.stopPropagation(),t.playSong(e)}}}),n("div",{staticClass:"fontFamily btn-list"},[t._v("")])])]),n("audio",{ref:"audio",attrs:{src:t.currentSong.url},on:{canplay:t.ready,ended:t.end,timeupdate:t.updateTime}})])},i=[],s=n("cebc"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"progressBar",staticClass:"progress-bar",on:{click:t.progressClick}},[n("div",{staticClass:"bar-inner"},[n("div",{ref:"progress",staticClass:"progress"}),n("div",{ref:"progressBtn",staticClass:"progress-btn-wrapper",on:{touchstart:function(e){return e.preventDefault(),t.progressTouchStart(e)},touchmove:function(e){return e.preventDefault(),t.progressTouchMove(e)},touchend:t.progressTouchEnd}},[n("div",{staticClass:"progress-btn"})])])])},o=[],a=(n("c5f6"),16),l={props:{percent:{type:Number,default:0}},created:function(){this.touch={}},methods:{progressTouchStart:function(t){this.touch.initiated=!0,this.touch.startX=t.touches[0].pageX,this.touch.left=this.$refs.progress.clientWidth},progressTouchMove:function(t){if(this.touch.initiated){var e=t.touches[0].pageX-this.touch.startX,n=Math.min(this.$refs.progressBar.clientWidth-a,Math.max(0,this.touch.left+e));this._offset(n)}},progressTouchEnd:function(){this.touch.initiated=!1,this._triggerPercent()},progressClick:function(t){var e=this.$refs.progressBar.getBoundingClientRect(),n=t.pageX-e.left;this._offset(n),this._triggerPercent()},_triggerPercent:function(){var t=this.$refs.progressBar.clientWidth-a,e=this.$refs.progress.clientWidth/t;this.$emit("percentChange",e)},_offset:function(t){this.$refs.progress.style.width="".concat(t,"px"),this.$refs.progressBtn.style["transform"]="translate3d(".concat(t,"px,0,0)")}},watch:{percent:function(t){if(t>=0&&!this.touch.initiated){var e=this.$refs.progressBar.clientWidth-a,n=t*e;this._offset(n)}}}},u=l,h=(n("ae21"),n("2877")),d=Object(h["a"])(u,c,o,!1,null,"9cf6d9f0",null),f=d.exports,p=n("2f62"),m=n("27ae"),g=n("3c75"),y=n.n(g),v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"wrapper"},[t._t("default")],2)},b=[],S=n("1fba"),_={props:{probeType:{type:Number,default:1},click:{type:Boolean,default:!0},listenScroll:{type:Boolean,default:!1},data:{type:Array,default:null},pullup:{type:Boolean,default:!1},beforeScroll:{type:Boolean,default:!1},refreshDelay:{type:Number,default:20}},mounted:function(){var t=this;setTimeout(function(){t._initScroll()},20)},methods:{_initScroll:function(){var t=this;if(this.$refs.wrapper){if(this.scroll=new S["a"](this.$refs.wrapper,{probeType:this.probeType,click:this.click}),this.listenScroll){var e=this;this.scroll.on("scroll",function(t){e.$emit("scroll",t)})}this.pullup&&this.scroll.on("scrollEnd",function(){t.scroll.y<=t.scroll.maxScrollY+50&&t.$emit("scrollToEnd")}),this.beforeScroll&&this.scroll.on("beforeScrollStart",function(){t.$emit("beforeScroll")})}},disable:function(){this.scroll&&this.scroll.disable()},enable:function(){this.scroll&&this.scroll.enable()},refresh:function(){this.scroll&&this.scroll.refresh()},scrollTo:function(){this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)},scrollToElement:function(){this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)}},watch:{data:function(){var t=this;setTimeout(function(){console.log("s"),t.refresh()},this.refreshDelay)}}},L=_,w=Object(h["a"])(L,v,b,!1,null,"765c3efc",null),T=w.exports,C={components:{MProgress:f,MScroll:T},data:function(){return{currentTime:0,duration:0,songReady:!1,currentLyric:null,currentLine:0,currentShow:"cd"}},created:function(){this.touch={}},watch:{currentSong:function(t,e){var n=this;console.log("1"),t.id&&t.id!==e.id&&(this.currentLyric&&(this.currentLyric.stop(),this.currentTime=0,this.currentLine=0),clearTimeout(this.timer),this.timer=setTimeout(function(){n.$store.commit("SET_PLAYING",!0),n.$refs.audio.play(),n.getLyric()},100))},playing:function(t){var e=this;console.log("12"),this.$nextTick(function(){var n=e.$refs.audio;t?n.play():n.pause()})}},computed:Object(s["a"])({play:function(){return this.playing?"play":"play pause"},playIcon:function(){return this.playing?"&#xe652;":"&#xe60c;"},modeIcon:function(){switch(this.mode){case 0:return"&#xe69d;";case 1:return"&#xe603;";default:return"&#xe605;"}},showPlayer:function(){return this.playList.length>0&&this.currentSong.url},percent:function(){return this.currentTime/this.duration}},Object(p["b"])(["playing","fullScreen","currentIndex","playList","currentSong","mode"])),filters:{formatDate:function(t){t|=0;var e=t/60|0,n=t%60;return"".concat(e>9?e:"0"+e,":").concat(n>9?n:"0"+n)}},methods:{ready:function(){this.songReady=!0,this.duration=this.$refs.audio.duration},handleMini:function(){this.$store.commit("SET_FULL_SCREEN",!this.fullScreen)},handleOpen:function(){this.$store.commit("SET_FULL_SCREEN",!this.fullScreen)},playSong:function(){this.songReady&&(this.$store.commit("SET_PLAYING",!this.playing),this.currentLyric&&this.currentLyric.togglePlay())},next:function(){if(this.songReady){var t=this.currentIndex+1;t===this.playList.length&&(t=0),this.$store.commit("SET_CURRENT_INDEX",t)}},prev:function(){if(this.songReady){var t=this.currentIndex-1;-1===t&&(t=this.playList.length-1),this.$store.commit("SET_CURRENT_INDEX",t)}},changeMode:function(){var t=(this.mode+1)%3;this.$store.commit("SET_MODE",t),console.log(t)},end:function(){switch(this.mode){case 0:this.next();break;case 1:this.$refs.audio.play(),this.currentLyric&&this.currentLyric.seek(0);break;default:var t=Math.floor(Math.random()*this.playList.length);this.$store.commit("SET_CURRENT_INDEX",t),t===this.currentIndex&&this.$refs.audio.play();break}},updateTime:function(t){this.currentTime=t.target.currentTime},changeProgress:function(t){var e=this.duration*t;this.$refs.audio.currentTime=e,this.playing||this.playSong(),this.currentLyric&&this.currentLyric.seek(1e3*e)},getLyric:function(){this.currentLyric=new y.a(m["Base64"].decode(this.currentSong.lyric),this.handleLyric),this.playing?this.currentLyric.play():this.currentLyric.stop(),console.log(this.currentLyric)},handleLyric:function(t){var e=t.lineNum;t.txt;if(this.currentLine=e,e>5){var n=this.$refs.lyricLine[e-5];console.log(n),this.$refs.lyricList.scrollToElement(n,500)}else this.$refs.lyricList.scrollTo(0,0,500)},middleTouchStart:function(t){this.touch.initiated=!0;var e=t.touches[0];this.touch.startX=e.pageX,this.touch.startY=e.pageY},middleTouchMove:function(t){if(this.touch.initiated){var e=t.touches[0],n=e.pageX-this.touch.startX,r=e.pageY-this.touch.startY;if(!(Math.abs(r)>Math.abs(n))){var i="cd"===this.currentShow?0:-window.innerWidth,s=Math.min(0,Math.max(-window.innerWidth,i+n));this.touch.percent=Math.abs(s/window.innerWidth),this.$refs.lyricList.$el.style["transform"]="translate3d(".concat(s,"px,0,0)"),this.$refs.lyricList.$el.style["transitionDuration"]=0,this.$refs.middleL.style.opacity=1-this.touch.percent,this.$refs.middleL.style["transitionDuration"]=0}}},middleTouchEnd:function(t){var e,n;"cd"===this.currentShow?this.touch.percent>.1?(e=-window.innerWidth,n=0,this.currentShow="lyric"):(e=0,n=1):this.touch.percent<.9?(e=0,this.currentShow="cd",n=1):(e=-window.innerWidth,n=0);var r=300;this.$refs.lyricList.$el.style["transform"]="translate3d(".concat(e,"px,0,0)"),this.$refs.lyricList.$el.style["transitionDuration"]="".concat(r,"ms"),this.$refs.middleL.style.opacity=n,this.$refs.middleL.style["transitionDuration"]="".concat(r,"ms"),this.touch.initiated=!1}}},E=C,k=(n("c74c"),Object(h["a"])(E,r,i,!1,null,"bf11ed88",null));e["default"]=k.exports},7371:function(t,e,n){},aa47:function(t,e,n){},ae21:function(t,e,n){"use strict";var r=n("1351"),i=n.n(r);i.a},be35:function(t,e,n){},c74c:function(t,e,n){"use strict";var r=n("558d"),i=n.n(r);i.a}});
//# sourceMappingURL=app.c8bae629.js.map