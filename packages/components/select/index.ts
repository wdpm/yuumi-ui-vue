import type { App } from 'vue'
import Select from './src/index'
import './src/index.scss'

export default {
  install: (app: App): void => {
    app.component(Select.name, Select)
  }
}

export const YuumiSelect = Select
