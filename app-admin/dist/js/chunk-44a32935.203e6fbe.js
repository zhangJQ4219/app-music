(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-44a32935"],{2192:function(t,s,e){"use strict";var i=e("2e02"),a=e.n(i);a.a},"2e02":function(t,s,e){},"386d":function(t,s,e){"use strict";var i=e("cb7c"),a=e("83a1"),n=e("5f1b");e("214f")("search",1,function(t,s,e,r){return[function(e){var i=t(this),a=void 0==e?void 0:e[s];return void 0!==a?a.call(e,i):new RegExp(e)[s](String(i))},function(t){var s=r(e,t,this);if(s.done)return s.value;var c=i(t),l=String(this),o=c.lastIndex;a(o,0)||(c.lastIndex=0);var h=n(c,l);return a(c.lastIndex,o)||(c.lastIndex=o),null===h?-1:h.index}]})},"794be":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"search-header"},[e("div",{staticClass:"title"},[e("div",{staticClass:"fontFamily left",on:{click:t.backRec}},[t._v("")]),e("div",{ref:"search",staticClass:"right"},[e("div",{staticClass:"fontFamily search-icon"},[t._v("")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.keywords,expression:"keywords"}],ref:"input",staticClass:"search-input",attrs:{type:"search",placeholder:"搜索音乐、视频、歌单、歌手"},domProps:{value:t.keywords},on:{input:[function(s){s.target.composing||(t.keywords=s.target.value)},t.inputing],keydown:function(s){return t.search(s)}}}),e("div",{staticClass:"fontFamily search-icon",domProps:{innerHTML:t._s(t.del)},on:{click:t.handleClear}})])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"search-list"},[e("span",{staticClass:"search-word"},[t._v("搜索“"+t._s(t.keywords)+"”")]),t._l(t.getSixList,function(s){return e("div",{key:s.songId,staticClass:"search-item"},[e("div",{staticClass:"fontFamily search-item-icon"},[t._v("")]),e("span",{domProps:{innerHTML:t._s(s.list)}})])})],2),t._m(0),t.showHistory?e("div",{staticClass:"search-content"},[t._m(1),e("div",{staticClass:"label"},t._l(t.historyKeyList,function(s){return e("div",{key:s,staticClass:"label-item"},[t._v(t._s(s))])}),0)]):t._e()])},a=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"search-content"},[e("div",{staticClass:"search-content-title"},[e("h1",[t._v("热门搜索")])]),e("div",{staticClass:"label"},[e("div",{staticClass:"label-item"},[t._v("黄老板新歌")]),e("div",{staticClass:"label-item"},[t._v("情深深雨蒙蒙")]),e("div",{staticClass:"label-item"},[t._v("不要错过爱")]),e("div",{staticClass:"label-item"},[t._v("魏新雨")]),e("div",{staticClass:"label-item"},[t._v("有一种悲伤")]),e("div",{staticClass:"label-item"},[t._v("got7")]),e("div",{staticClass:"label-item"},[t._v("hit fluffy")]),e("div",{staticClass:"label-item"},[t._v("作为怪物")]),e("div",{staticClass:"label-item"},[t._v("余情未了")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"search-content-title"},[e("h1",[t._v("搜索历史")]),e("div",{staticClass:"fontFamily history-icon"},[t._v("")])])}],n=(e("a481"),e("3b2b"),e("ac6a"),e("386d"),e("1857")),r={data:function(){return{resultList:[],show:!1,history:[],keywords:"",historyKeyList:JSON.parse(localStorage.getItem("key"))||[]}},computed:{showHistory:function(){return!!JSON.parse(localStorage.getItem("key"))&&JSON.parse(localStorage.getItem("key")).length>0},del:function(){return this.keywords.length>0?"&#xe668;":"&#xe638;"},showSearch:function(){return console.log(this.resultList.length>0),this.resultList.length>0},getSixList:function(){return this.resultList.length>0?this.resultList.length>6?this.resultList.slice(0,6):this.resultList:[]}},watch:{keywords:function(t){this.show=""!==t.trim()}},mounted:function(){var t=this;this.$refs.search.addEventListener("animationend",function(){t.$refs.input.focus()},!1)},methods:{search:function(t){13===t.keyCode&&(this.historyKeyList.push(this.keywords),localStorage.setItem("key",JSON.stringify(this.historyKeyList)))},inputing:function(t){var s=this;this.keywords=t.target.value,this.keywords.trim().length>0&&Object(n["e"])(this.keywords).then(function(t){var e=t.data.songList;e.forEach(function(t,e){var i="".concat(t.songName," - ").concat(t.singer[0].singerName);t.list=s.highLight(i)}),s.resultList=e})},backRec:function(){this.$router.push("/recommend")},handleClear:function(){this.keywords.length>0&&(this.keywords="")},highLight:function(t){var s="";if(this.keywords&&this.keywords.length>0){var e=new RegExp(this.keywords,"g"),i='<span class="search-result">'.concat(this.keywords,"</span>");s=t.replace(e,i)}return s}}},c=r,l=(e("2192"),e("2877")),o=Object(l["a"])(c,i,a,!1,null,"24844c2e",null);s["default"]=o.exports},"83a1":function(t,s){t.exports=Object.is||function(t,s){return t===s?0!==t||1/t===1/s:t!=t&&s!=s}}}]);
//# sourceMappingURL=chunk-44a32935.203e6fbe.js.map