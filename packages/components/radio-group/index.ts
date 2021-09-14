import type { App } from 'vue'
import RadioGroup from './src/index.vue'

export default {
  install: (app: App): void => {
    app.component(RadioGroup.name, RadioGroup)
  }
}

export const YuumiRadioGroup = RadioGroup
