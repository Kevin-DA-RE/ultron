import { createApp } from 'vue'
import Layout from './layouts/Layout.vue'
import router from './router/index'
import { Quasar, Notify  } from 'quasar'
import 'quasar/dist/quasar.css'

const app = createApp(Layout)
app.use(Quasar, {
    plugins: {Notify},
  })
app.use(router)

app.mount('#app')
