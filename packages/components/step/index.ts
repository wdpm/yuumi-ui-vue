import type { App } from 'vue'
import Step from './src/index'
import StepItem from './src/item'

export default {
  install: (app: App): void => {
    app.component(Step.name, Step)
    app.component(StepItem.name, StepItem)
  }
}

export const YuumiStep = Step
export const YuumiStepItem = StepItem
