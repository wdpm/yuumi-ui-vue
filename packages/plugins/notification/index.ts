import './index.scss';
import { h, createVNode, resolveComponent, Transition, Teleport } from 'vue'
import { getPluginApp } from '..';
import { isValidNotificationDirection, isValidNotificationTheme } from '../../share/validator';
import type { VNode } from 'vue'

export interface CreateNotificationOptions {
  title: string|VNode
  message: string|VNode
  icon?: VNode
  theme?: 'default'|'primary'|'warn'|'error'|'succss'
  duration?: number
  offset?: number
  direction: 'bl'|'br'|'tl'|'tr'
}

function getPartialNotification (options: CreateNotificationOptions) {
  let vnode = createVNode({
    props: {
      theme: {
        type: String,
        validator: isValidNotificationTheme,
        default: 'default'
      },
      direction: {
        type: String,
        validator: isValidNotificationDirection,
        default: 'tr'
      },
      duration: {
        type: Number,
        default: 3000
      },
      offset: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        show: true,
        y: 0,
        timeout: 0
      }
    },
    computed: {
      iconMap () {
        return {
          primary: 'line-info',
          warn: 'flat-info',
          success: 'flat-circle-correct',
          error: 'flat-circle-close'
        }
      }
    },
    beforeMount () {
      updateNotificationY(vnode)
    },
    mounted () {
      this.addTimeout()
      this.$nextTick(() => {
        this.$refs.notification.classList.add('appeared')
      })
    },
    methods: {
      hide () {
        this.show = false
        updateNotificationY(vnode)
      },
      addTimeout () {
        // duration is 0
        if (!this.duration) return

        this.timeout = window.setTimeout(() => {
          this.timeout = 0
          this.hide()
        }, this.duration)
      },
      removeTimeout () {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = 0
      }
    },
    render () {
      const { direction, theme } = this

      return h(Teleport, { to: 'body' }, [
        h(Transition, {
          name: 'yuumi-notification',
          appear: true,
          onAfterLeave: () => {
            const { notifications } = (getPluginApp()._instance?.proxy) || {} as any
            const index = notifications.findIndex((item: VNode) => item === vnode)
            if (index > -1) { notifications.splice(index, 1) }
            vnode = null as any
          }
        }, {
          default: () => this.show ? h('div', {
            class: ['yuumi-notification', `direction__${direction}`, `theme__${theme}`],
            style: {
              top: /t/.test(direction) ? `${this.y}px` : null,
              bottom: /b/.test(direction) ? `${this.y}px` : null,
            },
            onMouseenter: this.removeTimeout,
            onMouseleave: this.addTimeout,
            ref: 'notification'
          }, [
            //  THINK: use JSX to avoid multiple h function hell
            h('div', { class: 'notification-body' }, [
              h('div', { class: 'notification-icon' }, [
                options.icon || h(resolveComponent('YuumiIcon'), { icon: this.iconMap[theme] || this.iconMap.primary })
              ]),
              h('div', { class: 'notification-content' }, [
                options.title ? h('div', { class: 'content-title' }, options.title) : null,
                h('div', { class: 'content-body' }, options.message),
              ]),
            ]),
            h(resolveComponent('YuumiIcon'), {
              class: 'notification-close',
              icon: 'line-close',
              onClick: () => {
                this.removeTimeout()
                this.hide()
              }
            })
          ]) : null
        })
      ])
    }
  }, {
    theme: options.theme,
    direction: options.direction,
    duration: options.duration,
    offset: options.offset
  })

  return vnode
}

function updateNotificationY (vnode: VNode) {
  const { notifications } = (getPluginApp()._instance?.proxy) || {} as any
  if (!notifications) return

  const _direction = vnode.component?.props?.direction
  let vnodeIndex = -1
  let y = 0

  notifications.forEach((item: VNode, index: number) => {
    if (item === vnode) { vnodeIndex = index }

    const { $refs, show, offset, direction }: any = item.component?.proxy

    // 当出现以下情况，则会直接返回，不需要处理vnode的Y offset的累加问题
    // 1. item 不显示
    // 2. item的direction和 vnode direction不一致，说明item是在其他的位置生成的，不会影响目前的vnode。
    if (!show || direction !== _direction) return

    // 找到当前vnode，那就处理当前vnode（这个item就是vnode）的y offset
    if (vnodeIndex >= 0) {
      item.component!.data.y = y + offset
    }

    // 不是当前vnode，那就累加Y offset
    if ($refs.notification) {
      const rect = $refs.notification.getBoundingClientRect()
      y += (offset + rect.height)
    }
  })
}

export const createNotification = function (options: CreateNotificationOptions) {
  const vnode = getPartialNotification(options)

  const { notifications } = (getPluginApp()._instance?.proxy) || {} as any
  if (notifications) { notifications.push(vnode) }

  return vnode
}

export const removeNotification = function (vnode: VNode) {
  if (vnode && vnode.component?.proxy) {
    (vnode.component.proxy as any).hide()
  }
}

export const removeAllNotification = function () {
  const { notifications } = (getPluginApp()._instance?.proxy) || {} as any
  if (notifications) {
    notifications.forEach((item: VNode) => removeNotification(item))
  }
}
