import { createRouter, createWebHashHistory } from 'vue-router'
import BoardView from '../components/BoardView.vue'
import Calendar from '../components/Calendar.vue'
import Settings from '../components/Settings.vue'

const routes = [
  {
    path: '/',
    redirect:'/boardView',//设置路由重定向第一次进入的页面
  },

 {
   path: '/boardView',
   name: 'BoardView',
   component: BoardView
 },
 {
   path: '/calendar',
   name: 'Calendar',
   component: Calendar
 },
 {
   path: '/settings',
   name: 'Settings',
   component: Settings
 },
]

const VueRouter = createRouter ({
  history: createWebHashHistory(),
 routes
})

export default VueRouter