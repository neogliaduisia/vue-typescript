import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: () => import('@/pages/movies/index.vue'),
      name: 'Movies',
      path: '/movies',
    },
    {
      component: () => import('@/pages/movies/top-rated.vue'),
      name: 'Top Rated',
      path: '/top-rated',
    },
    {
      component: () => import('@/pages/movies/_id/index.vue'),
      name: 'Movie',
      path: '/top-rated/:id',
      props: (route) => ({ movieId: route.params.id }),
    },
    {
      component: () => import('@/pages/tv-shows/index.vue'),
      name: 'TV Shows',
      path: '/tv',
    },
  ],
});

export default router;
