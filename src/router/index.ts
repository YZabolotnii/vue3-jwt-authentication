import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/signin',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUp.vue'),
      meta: {
        auth: false,
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignIn.vue'),
      meta: {
        auth: false,
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        auth: true,
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if(to.meta.auth && !authStore.userInfo.token) {
    next('/signin')
  } else if(!to.meta.auth && authStore.userInfo.token) {
    next('/about')
  } else {
    next()
  }
})

export default router
