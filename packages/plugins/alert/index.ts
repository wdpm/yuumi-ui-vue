import './index.scss';
import { createVNode, h, mergeProps, resolveComponent } from 'vue'
import { getPluginApp } from '..'
import type { VNode } from 'vue'

export interface CreateAlertOptions {
  title?: String|VNode
  content?: String|VNode
  alignCenter?: Boolean
  closeEnable?: Boolean
  cancelText?: String,
  cancelEnable?: Boolean
  confirmText?: String
  confirmEnable?: Boolean
  stopPenetrate?: Boolean
  onClose?: Function
  onCancel?: Function
  onConfirm?: Function
}

/**
 * Alert extends from Dialog
 * @param options
 */
function getPartialAlert (options: CreateAlertOptions) {
  const {content, title, ..._props} = options
  let vnode: VNode|null = createVNode({
    data () {
      return {
        show: true
      }
    },
    beforeCreate() {
      // generate instance UID in here. Try using global mixin.
    },
    render () {
      const _YuumiDialog = resolveComponent('YuumiDialog')
      const props = mergeProps({
        modelValue: this.show,
        'onUpdate:modelValue': (value: boolean) => {
          this.show = value
        },
        'onAfterLeave': () => {
          // REMOVE　alert instance
          const { alerts } = (getPluginApp()._instance?.proxy) || {} as any
          // improve perf: find by ID, not by === operator
          const index = alerts.findIndex((item: any) => item === vnode)
          if (index > -1) { alerts.splice(index, 1)}
          vnode = null
        }
      }, _props as any)

      return h(createVNode(_YuumiDialog, props), {
        class: 'yuumi-alert',
      }, {
        title: () => title,
        default: () => content
      })
    }
  })

  return vnode
}

export const createAlert = function (options: CreateAlertOptions) {
  const vnode = getPartialAlert(options)
  // App.getInstance.getProxy
  const { alerts } = (getPluginApp()._instance?.proxy) || {} as any

  if (alerts) {
    alerts.push(vnode)
  }

  return vnode
}

export const removeAlert = function (vnode: VNode) {
  if (vnode && vnode.component) {
    vnode.component.data.show = false
  }
}

export const removeAllAlert = function () {
  const { alerts } = (getPluginApp()._instance?.proxy) || {} as any
  if (alerts) {
    alerts.forEach((item: VNode) => removeAlert(item))
  }
}
