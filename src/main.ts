import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
// Import Router
import router from '@/router/index'
// Import Pinia
import store from '@/store'
import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
    plugins: {
        Notify
    },
    lang: quasarLang,
})

app.use(router).use(store)

app.mount('#app')
