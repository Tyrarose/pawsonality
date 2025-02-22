import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import QuizView from '@/views/QuizView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: SplashView
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizView
    }
  ]
})

// Handle initial route based on timing
router.beforeEach((to, from, next) => {
  if (to.name === 'splash' && from.name === undefined) {
    setTimeout(() => {
      router.push('/welcome')
    }, 5000)
  }
  next()
})

export default router