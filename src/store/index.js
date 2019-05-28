import Vue from 'vue'
import Vuex from 'vuex'
import music from './modules/music'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    music
  },
  getters
})
