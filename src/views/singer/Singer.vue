<template>
  <div class="singer">
    <div class="title">
      <div class="fontFamily icon" @click="backRec">&#xe606;</div>
      <span>歌手</span>
      <div class="fontFamily icon">&#xe638;</div>
    </div>
    <div class="singer-wrpper">
      <van-index-bar>
        <div v-for="(item, index) in singerList" :key="index" >
            <van-index-anchor :index="item.title" />
            <div class="singer-list" v-for="(val, key) in item.list" :key="key">
              <div class="singer-pic">
                <img width="80px" v-lazy="val.singer_pic" alt="">
              </div>
              <span>{{val.singer_name}}</span>
            </div>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { getSingerList } from 'api/music'
import { selectList } from '@/utils/select'
export default {
  data () {
    return {
      title: 'Current City: BEIJING',
      singerList: []
    }
  },
  created () {
    getSingerList().then(res => {
      let list = res.data.singerList.data.singerlist
      let hot = [{ title: '热门',
        list: list.slice(0, 5)
      }]
      this.singerList = hot.concat(selectList(list))
      console.log(this.singerList)
    })
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
.singer-wrapper /deep/ .van-index-anchor--sticky{
  top: rem(200)
}
  .title{
    position: relative;
    z-index: 2;
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
    // margin
    margin-top: rem(200);
    overflow: hidden;
    width: 100%;
    .singer-pic{
      width: rem(80);
    }
  }
</style>
