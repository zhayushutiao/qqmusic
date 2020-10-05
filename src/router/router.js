import Vue from 'vue'
import VueRouter from 'vue-router'

import Rank from '@comp/rank/rank'
import Recommend from '@comp/recommend/recommend'
import Search from '@comp/search/search'
import Singer from '@comp/singer/singer'
import SingerDetail from '@comp/singerDetail/singerDetail'
import RecomDetail from '@comp/recommend/recomDetail'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':dissid',
          component: RecomDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':fid',
          name: "singerDetail",
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
  ]
})