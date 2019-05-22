import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// css初始化
import './assets/style/reset.css'
// 解决移动端1像素边框问题
import './assets/style/border.css'
// 解决300毫秒延迟
import fastclick from 'fastclick'

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
