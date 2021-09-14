import type { App } from 'vue'
import Cascader from './src/index'
import './src/index.scss'

export default {
  install: (app: App) => {
    app.component(Cascader.name, Cascader)
  }
}

export const YuumiCascader = Cascader
