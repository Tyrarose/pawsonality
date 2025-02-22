import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '@/views/WelcomeView.vue';
import QuizView from '@/views/QuizView.vue';

const routes = [
  { path: '/', component: WelcomeView },
  { path: '/quiz', component: QuizView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
