<template>
  <div class="singer">
    <div class="title">
      <div class="fontFamily icon" @click="backRec">&#xe606;</div>
      <span>歌手</span>
      <div class="fontFamily icon">&#xe638;</div>
    </div>
    <div class="singer-wrapper">
      <p class="text">快出去，我还没写好</p>
    </div>
    <!-- <cube-index-list
      :data="cityData">
      <cube-index-list-group
        v-for="(group, index) in cityData"
        :key="index"
        :group="group">
        <cube-index-list-item
          v-for="(item, index) in group.items"
          :key="index"
          :item="item"
          @select="selectItem">
          <div class="custom-item">
            <img src="https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000" alt="">
            <span>薛之谦</span>
            <div class="fontFamily history-icon">&#xe600;</div>
          </div>
        </cube-index-list-item>
      </cube-index-list-group>
    </cube-index-list> -->
  </div>
</template>

<script>
// import { getSearch, getRankListDetails, getSongUrl } from 'api/music'
export default {
  data () {
    return {
      title: 'Current City: BEIJING',
      cityData: [
        {
          'name': '★Hot City',
          'items': [
            {
              'name': 'BEIJING',
              'value': 1
            },
            {
              'name': 'SHANGHAI',
              'value': 2
            }
          ]
        },
        {
          'name': 'A',
          'items': [
            {
              'name': 'ANSHAN',
              'value': 3
            },
            {
              'name': 'ANQING',
              'value': 4
            }
          ]
        }
      ]
    }
  },
  created () {
    // let key = {
    //   'id': 26,
    //   'time': '2019-05-30'
    // }
    // getRankListDetails(key).then(res => {
    // })
  },
  methods: {
    selectItem () {

    },
    backRec () {
      this.$router.push('/recommend')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~/style/variables.scss';
  .title{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: rem(50);
    line-height: rem(50);
    span{
      font-size: rem(18);
      font-weight: 600;
    }
    .icon{
      font-size: rem(24);
      padding: 0 rem(16);
      display: inline-block;
    }
  }
  .singer-wrapper{
    position: relative;
    width: 100%;
    height: rem(300);
    .text{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
    }
  }
</style>
