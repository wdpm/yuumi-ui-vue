import type { App } from 'vue'
import CheckboxGroup from './src/index.vue'

export default {
  install: (app: App) => {
    app.component(CheckboxGroup.name, CheckboxGroup)
  }
}

export const YuumiCheckboxGroup = CheckboxGroup