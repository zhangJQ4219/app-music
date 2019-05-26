<template>
  <div>
    <div class="title">
      <span>{{list.title}}</span>
      <div class="fontFamily tab-icon">更多 &#xe671;</div>
    </div>
    <cube-scroll
      ref="scroll"
      :data="list.list"
      direction="horizontal"
      class="horizontal-scroll-list-wrap">
      <ul class="list-wrapper">
        <li v-for="item in list.list" class="list-item" :key="item.content_id">
          <div class="item">
            <div class="play">
              <div class="fontFamily play-icon">&#xe671; {{item.access_num | getNum}}</div>
            </div>
            <img :src="item.cover_url_small" alt="">
            <p>{{item.title}}</p>
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
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  filters: {
    getNum (value) {
      if (String(value).length >= 5) {
        if (String(value).length <= 8) {
          return String(value).slice(0, -4) + '万'
        } else {
          return String(value).slice(0, -8) + '亿'
        }
      } else {
        return value
      }
    }
  },
  data () {
    return {

    }
  },
  created () {
    console.log(this.list)
  }
}
</script>

<style lang='scss' scoped>
@import '~/style/variables.scss';
  .horizontal-scroll-list-wrap /deep/ .cube-scroll-content{
    display: inline-block;
    white-space: wrap;
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
      white-space: nowrap;
      .list-item{
         // inline-block 无法对齐
        display: inline-flex;
        .item{
          width: rem(106);
          height: rem(146);
          margin-right: rem(10);
          position: relative;
          .play{
            position: absolute;
            right: 0;
            top: rem(86);
            height: rem(20);
            line-height: rem(20);
            background-color: rgb(0, 0, 0);
            opacity: 0.6;
            border-radius: rem(10);
            padding: 0 rem(6);
            color: #fff;
            .play-icon{
              font-size: rem(10);
            }
          }
          img{
            width: 100%;
            display: block;
            border-radius: rem(8);
          }
          p{
            height: rem(40);
            margin-top: rem(8);
            white-space: normal;
            line-height: rem(16);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
