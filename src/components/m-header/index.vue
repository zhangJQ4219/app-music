<template>
  <div class="m-header">
    <div class="title">
      <span class="text">音乐馆</span>
      <div class="search">
        <div class="fontFamily search-icon">&#xe600; 搜索</div>
      </div>
      <div class="fontFamily info">&#xe601;</div>
    </div>
    <!-- <div class="tab">
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/singer">
        <span class="tab-link">歌手</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/rank">
        <span class="tab-link">排行</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/search">
        <span class="tab-link">搜索</span>
      </router-link>
    </div> -->
  </div>
</template>

<script>
export default {
}
</script>

<style lang='scss' scoped>
  @import '~/style/variables.scss';
  .m-header{
     background-color: $bg;
    .title{
      position: relative;
      display: flex;
      height: rem(50);
      line-height: rem(50);
      .text{
        color: $text-color2;
        font-size: rem(24);
        padding-left: rem(16);
        font-weight: 600;
      }
      .search{
        flex: 1;
        background-color: #fff;
        margin: rem(10);
        border-radius: rem(25);
        .search-icon{
          line-height: rem(30);
          text-align: center;
          color: $text-color1;
        }
      }
      .info{
        font-size: rem(24);
        padding: 0 rem(16);
      }
    }
    // .tab{
    //   display: flex;
    //   height: rem(44);
    //   line-height: rem(44);
    //   font-size: rem(16);
    //   .tab-item{
    //     flex: 1;
    //     text-align: center;
    //     color: #eee;
    //     span{
    //       padding-bottom: rem(5);
    //     }
    //     &.router-link-active{
    //       span{
    //         border-bottom: rem(2) solid $font-color;
    //       }
    //     }
    //   }
    // }
  }
</style>
