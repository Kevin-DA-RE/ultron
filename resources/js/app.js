import { createApp } from 'vue'
import Layout from './layouts/Layout.vue'
import router from './router/index'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'

const app = createApp(Layout)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
app.use(router)

app.mount('#app')
