import './index.scss';
import { createVNode, h, mergeProps, resolveComponent } from 'vue'
import { getPluginAppComponentInstance } from '..'
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

function getPartialAlert (options: CreateAlertOptions) {
  const {content, title, ..._props} = options
  let vnode: VNode|null = createVNode({
    data () {
      return {
        show: true
      }
    },
    render () {
      const _YuumiDialog = resolveComponent('YuumiDialog')
      const props = mergeProps({
        modelValue: this.show,
        'onUpdate:modelValue': (value: boolean) => {
          this.show = value
        },
        'onAfterLeave': () => {
          const { alerts } = (getPluginAppComponentInstance()?.proxy) || {} as any
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
  const { alerts } = (getPluginAppComponentInstance()?.proxy) || {} as any

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
  const { alerts } = (getPluginAppComponentInstance()?.proxy) || {} as any
  if (alerts) {
    alerts.forEach((item: VNode) => removeAlert(item))
  }
}