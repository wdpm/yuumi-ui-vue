import type { App } from 'vue'
import Tooltip from './src/index'
import './src/index.scss'

export default {
  install: (app: App): void => {
    app.component(Tooltip.name, Tooltip)
  }
}

export const YuumiTooltip = Tooltip
