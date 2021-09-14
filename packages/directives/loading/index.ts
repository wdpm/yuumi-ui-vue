import { createLoading, removeLoading, getLoadingId, getLoadings } from '../../plugins/loading'
import type { App, VNode } from 'vue'

export default {
  install: (app: App) => {
    function showLoading (loadingId: number, spinner?: any) {
      const loadings = getLoadings()
      const vnode = loadings.find((item: VNode) => item.component?.data.id === loadingId)

      if (vnode) {
        vnode.component.data.show = true
      } else {
        createLoading({
          id: loadingId,
          teleport: `[data-loading-id="${loadingId}"]`,
          spinner
        })
      }
    }

    function hideLoading (loadingId: number) {
      const loadings = getLoadings()
      const vnode = loadings.find((item: VNode) => item.component?.data.id === loadingId)
      if (vnode) removeLoading(vnode)
    }

    app.directive('loading', {
      // 在绑定元素的 attribute 或事件监听器被应用之前调用
      created (el, binding) {
        const loadingId = getLoadingId()
        el.dataset.loadingId = loadingId

        const _value = binding.value
        if (typeof _value === 'boolean' && _value) {
          showLoading(loadingId)
        } else if(_value.value) {
          showLoading(loadingId, _value.spinner)
        }
      },
      // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
      updated (el, binding) {
        const loadingId = Number(el.dataset.loadingId)

        const _value = binding.value
        if (typeof _value === 'boolean' && _value) {
          showLoading(loadingId)
        } else if(_value.value) {
          showLoading(loadingId, _value.spinner)
        } else {
          hideLoading(loadingId)
        }
      }
    })
  }
}