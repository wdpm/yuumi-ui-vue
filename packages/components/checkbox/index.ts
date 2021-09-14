import type { App } from 'vue'
import Checkbox from './src/index.vue'

export default {
  install: (app: App) => {
    app.component(Checkbox.name, Checkbox)
  }
}

export const YuumiCheckbox = Checkbox
