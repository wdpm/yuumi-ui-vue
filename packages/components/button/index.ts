import type { App } from 'vue'
import Button from './src/index.vue'

export default {
  install: (app: App) => {
    app.component(Button.name, Button)
  }
}

export const YuumiButton = Button
