<template>
  <div>
    <div class="title">
      <span>为你推荐歌单</span>
      <div class="fontFamily tab-icon">更多 &#xe671;</div>
    </div>
    <cube-scroll
      ref="scroll"
      :data="list"
      direction="horizontal"
      class="horizontal-scroll-list-wrap">
      <ul class="list-wrapper">
        <li v-for="item in list" class="list-item" :key="item">
          <div class="item">
            <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114" alt="">
            <span>皮蛋瘦肉粥</span>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang='scss' scoped>
@import '~/style/variables.scss';
  .horizontal-scroll-list-wrap /deep/ .cube-scroll-content{
    display: inline-block;
  }
  .title{
    height: rem(40);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 rem(16);
    span{
      font-size: rem(18);
      font-weight: 600;
    }
    .tab-icon{
      font-size: rem(14);
    }
  }
  .horizontal-scroll-list-wrap{
    .list-wrapper{
      padding: 0 rem(16);
      // line-height: rem(60);
      white-space: nowrap;
      .list-item{
        display: inline-block;
        .item{
          width: rem(106);
          height: rem(136);
          margin-right: rem(10);
          img{
            width: 100%;
            display: block;
            border-radius: rem(8);
          }
          span{
            text-align: center;
            line-height: rem(30);
          }
        }
      }
    }
  }
</style>
