import type { App } from 'vue'
import Popper from './src/index'
import './src/index.scss'

export default {
  install: (app: App): void => {
    app.component(Popper.name, Popper)
  }
}

export const YuumiPopper = Popper
