import type { App } from 'vue'
import Switch from './src/index.vue'

export default {
  install: (app: App): void => {
    app.component(Switch.name, Switch)
  }
}

export const YuumiSwitch = Switch
