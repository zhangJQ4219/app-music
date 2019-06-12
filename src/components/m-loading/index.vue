<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style scoped lang="scss">
  @import '~/style/variables.scss';
  .loading{
    width: 100%;
    text-align: center;
    .desc{
      line-height: rem(20);
      font-size: rem(16);
      color: $text-color-dark;
    }
  }
</style>
