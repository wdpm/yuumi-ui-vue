import type { App } from 'vue'
import DatePicker from './src/index'
import './src/index.scss'

export default {
  install: (app: App): void => {
    app.component(DatePicker.name, DatePicker)
  }
}

export const YuumiDatePicker = DatePicker
