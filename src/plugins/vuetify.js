/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#D32F2F',
          accent: '#FF5252',
          secondary: "#BDBDBD",
          info: "#42A5F5",
          warning: "#FFA000",
          error: "#D50000",
          success: "#81C784",
        },
      },
    },
  },
})

