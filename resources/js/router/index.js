import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import ListMovies from '../views/component/ListMovies.vue';


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
      component: ListMovies
    },
  ]
})

export default router
