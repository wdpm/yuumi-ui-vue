import type { App, VNode } from 'vue'
import ButtonPlug from './components/button'
import CascaderPlug from './components/cascader'
import CheckboxPlug from './components/checkbox'
import CheckboxGroupPlug from './components/checkbox-group'
import DatePickerPlug from './components/date-picker'
import DialogPlug from './components/dialog'
import DividerPlug from './components/divider'
import DrawerPlug from './components/drawer'
import EmptyPlug from './components/empty'
import IconPlug from './components/icon'
import InputPlug from './components/input'
import PopperPlug from './components/popper'
import RadioPlug from './components/radio'
import RadioGroupPlug from './components/radio-group'
import ScrollbarPlug from './components/scrollbar'
import SelectPlug from './components/select'
import StepPlug from './components/step'
import SwitchPlug from './components/switch'
import TablePlug from './components/table'
import TabsPlug from './components/tabs'
import TimePicerPlug from './components/time-picker'
import TooltipPlug from './components/tooltip'
import TreePlug from './components/tree'
import WarningPlug from './components/warning'

import { createAlert, removeAlert, removeAllAlert, CreateAlertOptions } from './plugins/alert'
import { createMessage, removeMessage, removeAllMessage, CreateMessageOptions } from './plugins/message'
import { createNotification, removeNotification, removeAllNotification, CreateNotificationOptions } from './plugins/notification'
import { createLoading, removeLoading, removeAllLoading, CreateLoadingOptions } from './plugins/loading'

import LoadingPlug from './directives/loading'

export * from './components/button'
export * from './components/cascader'
export * from './components/checkbox'
export * from './components/checkbox-group'
export * from './components/date-picker'
export * from './components/dialog'
export * from './components/divider'
export * from './components/drawer'
export * from './components/empty'
export * from './components/icon'
export * from './components/input'
export * from './components/popper'
export * from './components/radio'
export * from './components/radio-group'
export * from './components/scrollbar'
export * from './components/select'
export * from './components/step'
export * from './components/switch'
export * from './components/table'
export * from './components/tabs'
export * from './components/time-picker'
export * from './components/tooltip'
export * from './components/warning'

export * from './plugins/alert'
export * from './plugins/message'
export * from './plugins/notification'
export * from './plugins/loading'

export default {
  install: (app: App): void => {
    app.use(ButtonPlug)
    app.use(CascaderPlug)
    app.use(CheckboxPlug)
    app.use(CheckboxGroupPlug)
    app.use(DatePickerPlug)
    app.use(DialogPlug)
    app.use(DividerPlug)
    app.use(DrawerPlug)
    app.use(EmptyPlug)
    app.use(IconPlug)
    app.use(InputPlug)
    app.use(PopperPlug)
    app.use(RadioPlug)
    app.use(RadioGroupPlug)
    app.use(ScrollbarPlug)
    app.use(SelectPlug)
    app.use(StepPlug)
    app.use(SwitchPlug)
    app.use(TablePlug)
    app.use(TabsPlug)
    app.use(TimePicerPlug)
    app.use(TooltipPlug)
    app.use(TreePlug)
    app.use(WarningPlug)

    app.config.globalProperties.$yuumi = {
      createAlert, removeAlert, removeAllAlert,
      createMessage, removeMessage, removeAllMessage,
      createNotification, removeNotification, removeAllNotification,
      createLoading, removeLoading, removeAllLoading
    }

    app.use(LoadingPlug)
  }
}

interface YuumiExtension {
  createAlert: (options: CreateAlertOptions) => VNode
  removeAlert: (vnode: VNode) => void
  removeAllAlert: () => void

  createMessage: (options: CreateMessageOptions) => VNode
  removeMessage: (vnode: VNode) => void
  removeAllMessage: () => void

  createNotification: (options: CreateNotificationOptions) => VNode
  removeNotification: (vnode: VNode) => void
  removeAllNotification: () => void

  createLoading: (options: CreateLoadingOptions) => VNode
  removeLoading: (vnode: VNode) => void
  removeAllLoading: () => void
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $yuumi: YuumiExtension
  }
}