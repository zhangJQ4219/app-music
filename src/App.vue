<template>
  <div id="app">
    <keep-alive :include="['recommend', 'rank']">
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import Player from './views/player/Player'
export default {
  components: {
    Player
  },
  mounted () {
    window.onload = function () {
      // 获取屏幕宽度
      let htmlwidth = document.documentElement.clientWidth || document.body.clientWidth
      // 获取html的dom
      let htmldom = document.getElementsByTagName('html')[0]
      // 设置html的font-size
      htmldom.style.fontSize = htmlwidth / 10 + 'px'
      window.addEventListener('resize', (e) => {
        let htmlwidth = document.documentElement.clientWidth || document.body.clientWidth
        htmldom.style.fontSize = htmlwidth / 10 + 'px'
      })
    }
  }
}
</script>

<style lang="scss">
</style>
