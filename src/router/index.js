import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '@/views/SplashView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import QuizView from '@/views/QuizView.vue'
import ResultsView from '@/views/ResultView.vue' // Import ResultsView

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
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView // Add ResultsView route
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
