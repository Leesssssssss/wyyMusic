import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Recommend from '@/components/recommend/recommend'
// import Rank from '@/components/rank/rank'
// import Radio from '@/components/radio/radio'
// import Singer from '@/components/singer/singer'

const SongListDetail = (resolve) => {
  import('@/components/songListDetail/songListDetail').then((module) => {
    resolve(module)
  })
}


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    // 懒加载，不会一次性加载所有组件，访问到哪个组件才会加载哪个组件
    { path: '/recommend/:id', name: 'recommend', component: SongListDetail },
    { path: '/recommend', component: resolve => require(['@/components/recommend/recommend'], resolve)},
    { path: '/rank', component: resolve => require(['@/components/rank/rank'], resolve) },
    { path: '/radio', component: resolve => require(['@/components/radio/radio'], resolve) },
    { path: '/singer', component: resolve => require(['@/components/singer/singer'], resolve) },
    { path: '/search', component: resolve => require(['@/components/search/search'], resolve) }
  ]
})
