import { createApp } from 'vue'
import { Quasar } from 'quasar'
import Layout from './layouts/Layout.vue'
import router from './router/index'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(Layout)

app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
  
app.use(router)

app.mount('#app')
