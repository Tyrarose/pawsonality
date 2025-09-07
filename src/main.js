import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // Import router


import './assets/global.css';
import './assets/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css';
import 'tailwindcss/tailwind.css'


const app = createApp(App)
app.use(router)
app.mount('#app')