import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('../views/recommend/Recommend.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/search/Search.vue'),
      children: [{
        path: ':id',
        name: 'searchList',
        component: () => import('../views/searchList/SearchList.vue')
      }]
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import('../views/rank/Rank.vue'),
      children: [{
        path: ':id',
        name: 'musicList',
        component: () => import('../views/musicList/MusicList.vue')
      }]
    },
    {
      path: '/singer',
      name: 'singer',
      component: () => import('../views/singer/Singer.vue')
    },
    {
      path: '/player',
      name: 'player',
      component: () => import('../views/player/Player.vue')
    }
  ]
})
