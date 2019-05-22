<template>
  <div class="home">
    {{name}}
    sssssssssssssssssssssssssssssss
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created () {
    this.get()
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    get () {
      console.log(this.$store.getters.name)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/style/variables.scss';
  .home{
    width: rem(100);
    height: 100px;
    background-color: $bg;
    @include ellipsis;
  }
</style>
