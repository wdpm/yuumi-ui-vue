import type { App } from 'vue'
import Radio from './src/index.vue'

export default {
  install: (app: App): void => {
    app.component(Radio.name, Radio)
  }
}

export const YuumiRadio = Radio
