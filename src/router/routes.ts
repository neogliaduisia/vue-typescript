import HomeView from '@/pages/index.vue'

export default [
  {
    component: HomeView,
    name: 'home',
    path: '/',
  },
  {
    component: () => import('@/pages/about.vue'),
    name: 'about',
    path: '/about',
  },
]