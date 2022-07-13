import './index.scss';
import { h, createVNode, resolveComponent, Transition, Teleport } from 'vue'
import { getPluginAppComponentInstance } from '..';
import { isDefined } from '../../share/validator';
import type { VNode } from 'vue'

export interface CreateMessageOptions {
  message: string
  icon?: VNode
  theme?: 'primary'|'warn'|'error'|'succss'
  duration?: number
  align?: boolean
  offset?: number
}

function getPartialMessage (options: CreateMessageOptions) {
  let vnode = createVNode({
    data () {
      return {
        show: true,
        offset: options.offset || 10,
        top: 0,
        timeout: 0
      }
    },
    beforeMount () {
      updateMessageTop(vnode)
    },
    mounted () {
      this.addTimeout()
      this.$nextTick(() => {
        this.$refs.message.$el.classList.add('appeared')
      })
    },
    methods: {
      hide () {
        this.show = false
        updateMessageTop(vnode)
      },
      addTimeout () {
        if (!options.duration) return

        this.timeout = window.setTimeout(() => {
          this.timeout = 0
          this.hide()
        }, options.duration)
      },
      removeTimeout () {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = 0
      }
    },
    render: function () {
      const _YuumiIcon = createVNode(resolveComponent('YuumiIcon'), { icon: 'line-info' })

      const _YuumiWarning = createVNode(resolveComponent('YuumiWarning'), {
        class: 'yuumi-message',
        theme: options.theme,
        onMouseenter: this.removeTimeout,
        onMouseleave: this.addTimeout,
        style: {
          top: `${this.top}px`
        },
        ref: 'message'
      }, {
        default: () => [
          options.icon || _YuumiIcon,
          h('div', { class: ['message-content'] }, [ options.message ])
        ]
      })

      return h(Teleport, {
        to: 'body'
      }, [
        h(Transition, {
          name: 'yuumi-message',
          appear: true,
          'onAfterLeave': () => {
            const { messages } = (getPluginAppComponentInstance()?.proxy) || {} as any
            const index = messages.findIndex((item: VNode) => item === vnode)
            if (index > -1) { messages.splice(index, 1) }
            vnode = null as any
          }
        }, {
          default: () => this.show ? _YuumiWarning : null
        })
      ])
    }
  })

  return vnode
}

function updateMessageTop (vnode: VNode) {
  const { messages } = (getPluginAppComponentInstance()?.proxy) || {} as any
  if (!messages) return

  let vnodeIndex = -1
  let top = 0

  messages.forEach((item: VNode, index: number) => {
    if (item === vnode) { vnodeIndex = index }

    const { $refs, show, offset }: any = item.component?.proxy
    if (!show) return

    if (vnodeIndex >= 0) {
      item.component!.data.top = top + offset
    }

    if ($refs.message?.$el) {
      const rect = $refs.message.$el.getBoundingClientRect()
      top += (offset + rect.height)
    }
  })
}

export const createMessage = function (options: CreateMessageOptions) {
  if (!isDefined(options.duration)) {
    options.duration = 3000
  }
  const vnode = getPartialMessage(options)
  const { messages } = (getPluginAppComponentInstance()?.proxy) || {} as any

  if (messages) { messages.push(vnode) }

  return vnode
}

export const removeMessage = function (vnode: VNode) {
  if (vnode && vnode.component?.proxy) {
    (vnode.component.proxy as any).hide()
  }
}

export const removeAllMessage = function () {
  const { messages } = (getPluginAppComponentInstance()?.proxy) || {} as any
  if (messages) {
    messages.forEach((item: VNode) => removeMessage(item))
  }
}
