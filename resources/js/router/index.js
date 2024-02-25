import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Media from '../views/Media.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'media',
      component: Media
    },
  ]
})

export default router
