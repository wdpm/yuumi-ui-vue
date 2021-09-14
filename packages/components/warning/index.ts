import type { App } from 'vue'
import Warning from './src/index.vue'

export default {
  install: (app: App): void => {
    app.component(Warning.name, Warning)
  }
}

export const YuumiWarning = Warning
