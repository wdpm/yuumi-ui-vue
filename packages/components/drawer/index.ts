import type { App } from 'vue'
import Drawer from './src/index.vue'

export default {
  install: (app: App): void => {
    app.component(Drawer.name, Drawer)
  }
}

export const YuumiDrawer = Drawer