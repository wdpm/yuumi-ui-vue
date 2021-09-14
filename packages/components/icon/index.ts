import type { App } from 'vue'
import Icon from './src/index.vue'

export default {
  install: (app: App): void => {
    app.component(Icon.name, Icon)
  }
}

export const YuumiIcon = Icon
