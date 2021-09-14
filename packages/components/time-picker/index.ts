import type { App } from 'vue'
// import TimePicker from './src/index.vue'
import TimePicker from './src/index'
import './src/index.scss'

export default {
  install: (app: App): void => {
    app.component(TimePicker.name, TimePicker)
  }
}

export const YuumiTimePicker = TimePicker
