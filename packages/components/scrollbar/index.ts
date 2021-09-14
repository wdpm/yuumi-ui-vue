import type { App } from 'vue'
import Scrollbar from './src/index.vue'

export default {
  install: (app: App): void => {
    app.component(Scrollbar.name, Scrollbar)
  }
}

export const YuumiScrollbar = Scrollbar
