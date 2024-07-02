import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Countdown from 'vue3-flip-countdown'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  components,
  directives,
})

const app = createApp(App);

app.use(Countdown)
app.use(vuetify)

app.mount('#app')
