import { createApp } from 'vue'
import {createPinia} from 'pinia'
import Layout from './layouts/Layout.vue'
import router from './router/index'
import { Quasar, Notify, Dialog  } from 'quasar'
import 'quasar/dist/quasar.css'

const pinia = createPinia()
const app = createApp(Layout)

app.use(pinia)
app.use(Quasar, {
    plugins: {
      Notify,
      Dialog
    },
  })
app.use(router)

app.mount('#app')
