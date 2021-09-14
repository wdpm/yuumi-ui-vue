import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import YuumiUIVue from '../packages/index'

const app = createApp(App)
app.use(router)
app.use(YuumiUIVue)

app.mount('#app')
