import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Movie from '../views/component/Movie.vue';


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
      component: Movie
    },
  ]
})

export default router
