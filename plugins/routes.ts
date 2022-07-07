import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: () => import('@/src/pages/AboutView.vue'),
      name: 'home',
      path: '/',
    },
    {
      component: () => import('@/src/pages/AboutView.vue'),
      name: 'about',
      path: '/about',
    },
  ],
});
export default router;
