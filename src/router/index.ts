import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign',
      name: 'signup',
      component: () => import('../views/SignUp.vue')
    },
  ]
})

export default router
