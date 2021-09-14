import type { App } from 'vue'
import Input from './src/index.vue'

export default {
  install: (app: App): void => {
    app.component(Input.name, Input)
  }
}

export const YuumiInput = Input
