import type { App } from 'vue'
import Menu from './src/index'
import './src/index.scss'

export default {
  install: (app: App): void => {
    app.component(Menu.name, Menu)
  }
}

export const YuumiMenu = Menu
