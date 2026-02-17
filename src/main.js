import { createApp } from 'vue'
import App from './App.vue'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
      variant: 'tonal',
      color: 'primary',
      rounded: 'lg',
      density: 'comfortable',
      elevation: 0,
      class: 'text-none',
    },
  },
})

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')