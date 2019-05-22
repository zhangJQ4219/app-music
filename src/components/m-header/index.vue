<template>
  <div class="m-header">
    <div class="title">
      <h1 class="text">Music</h1>
    </div>
    <div class="tab">
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
    </div>
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
      height: rem(44);
      text-align: center;
      line-height: rem(44);
      .text{
        color: $font-color;
        font-size: rem(24)
      }
    }
    .tab{
      display: flex;
      height: rem(44);
      line-height: rem(44);
      font-size: rem(16);
      .tab-item{
        flex: 1;
        text-align: center;
        color: #eee;
        span{
          padding-bottom: rem(5);
        }
        &.router-link-active{
          span{
            border-bottom: rem(2) solid $font-color;
          }
        }
      }
    }
  }
</style>
