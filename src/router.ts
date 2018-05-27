import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './views/homepage.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
