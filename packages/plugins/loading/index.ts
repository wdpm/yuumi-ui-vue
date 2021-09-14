import './index.scss';
import { createRange } from '../../share/helper';
import { createVNode, h, isVNode, mergeProps, resolveComponent, Teleport, Transition } from 'vue'
import { getPluginApp } from '..'
import type { VNode } from 'vue'

export interface CreateLoadingOptions {
  id?: number
  teleport?: string
  spinner?: 'circle'|'rect'|VNode
}

function getPartialLoading (options: CreateLoadingOptions) {
  let vnode: VNode|null = createVNode({
    data () {
      return {
        id: options.id,
        show: true
      }
    },
    render () {
      const rectSpinner = h('div', { class: 'loading__rect' }, createRange(0, 5).map(item => {
        return h('div', { class: [`rect${item}`] })
      }))

      const circleSpinner = h('svg', { class: 'loading__pie' }, [
        h('circle', {
          cx: '50%',
          cy: '50%',
          r: '40%',
          fill: 'none',
          'stroke-width': 2
        })
      ])

      const _spinner = () => {
        if (isVNode(options.spinner)) return options.spinner
        if (options.spinner === 'rect') return rectSpinner
        return circleSpinner
      }

      const _YuumiLoading = () => {
        return h('div', {
          class: ['yuumi-loading', {
            __fixed: options.teleport === 'body'
          }]
        }, [
          h('div', { class: 'loading-content' }, [_spinner()])
        ])
      }

      const { show } = this

      return h(Teleport, { to: options.teleport }, [
        h(Transition, {
          name: 'yuumi-loading',
          appear: true,
          'onAfterLeave': () => {
            const loadings = getLoadings()
            const index = loadings.findIndex((item: VNode) => item === vnode)
            if (index > -1) { loadings.splice(index, 1) }
            vnode = null as any
          }
        }, {
          default: () => show ? _YuumiLoading() : null
        })
      ])
    }
  })

  return vnode
}

let loadingId = 0

export const getLoadingId = function () {
  return ++loadingId
}

export const getLoadings = () => {
  const { loadings } = (getPluginApp()._instance?.proxy) || {} as any
  return loadings
}

export const createLoading = function (options: CreateLoadingOptions = {}) {
  if (!options.teleport) {
    options.teleport = 'body'
  }

  if (!options.id) {
    options.id = ++loadingId
  }

  const vnode = getPartialLoading(options)

  const loadings = getLoadings()
  if (loadings) loadings.push(vnode)

  return vnode
}

export const removeLoading = function (vnode: VNode) {
  if (vnode && vnode.component) {
    vnode.component.data.show = false
  }
}

export const removeAllLoading = function () {
  const loadings = getLoadings()
  if (loadings) {
    loadings.forEach((item: VNode) => removeLoading(item))
  }
}