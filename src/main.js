import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

// Remove timestamp query parameter if it exists
const url = new URL(window.location.href)
if (url.searchParams.has('t')) {
   url.searchParams.delete('t')
   window.history.replaceState({}, '', url.toString())
}

const app = createApp(App)
app.use(createPinia())
app.mount('#app')