<template>
  <div class="m-header">
    <div class="title">
      <span class="text">音乐馆</span>
      <div class="search" @click="toSearch">
        <div class="fontFamily search-icon">&#xe600; 搜索</div>
      </div>
      <div class="fontFamily info">&#xe601;</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toSearch () {
      this.$emit('handleClick')
    }
  }
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
        color: $text-color-dark;
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
          color: $text-color-light;
        }
      }
      .info{
        font-size: rem(24);
        padding: 0 rem(16);
      }
    }
  }
</style>
