import { createApp } from 'vue'
import Layout from './layouts/Layout.vue'
import router from './router/index'

const app = createApp(Layout)

app.use(router)

app.mount('#app')
