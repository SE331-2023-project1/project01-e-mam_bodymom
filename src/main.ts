import './assets/main.css'
import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/nprogess.css'
// import '@/assets/nprogress.css'; 
import '@/services/AxiosInterceptorSetup.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
