import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './views/homepage.vue'
import About from './views/About.vue'
import techoList from './views/techo/list.vue'
import techoCreate from './views/techo/create.vue'

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
    },
    {
      path: '/admin/techo-list',
      name: 'techoList',
      component: techoList
    },
    {
      path: '/admin/techo-create',
      name: 'techoCreate',
      component: techoCreate
    }
  ]
})
