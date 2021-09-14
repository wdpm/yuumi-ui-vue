import { getCurrentInstance, ref, watch } from 'vue'
import type { ComponentInternalInstance } from 'vue'

function useStyle () {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const { proxy, props }: any = instance

  const rectStyle = ref({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  })

  function updateRectPosition () {
    const element = proxy.tabsElement.querySelector('.nav-item.__active') as HTMLElement
    if(!element) return

    const parentElement = element.parentElement as HTMLElement

    if (/top|bottom/.test(props.position)) {
      const { left, width } = element.getBoundingClientRect()
      rectStyle.value.left = left - parentElement.getBoundingClientRect().left
      rectStyle.value.width = width
    } else {
      const { top, height } = element.getBoundingClientRect()
      rectStyle.value.top = top - parentElement.getBoundingClientRect().top
      rectStyle.value.height = height
    }
  }

  const navsStyle = ref({
    left: 0,
    top: 0
  })

  function updateNavsPosition (factor: -1|0|1) {
    const navsBodyRect = proxy.navsBodyElement.getBoundingClientRect()
    const navsRect = proxy.navsBodyElement.parentElement.getBoundingClientRect()

    switch (props.position) {
      case 'top':
      case 'bottom':
        let left = navsStyle.value.left + factor * navsRect.width

        if (factor > 0) {
          navsStyle.value.left = Math.min(left, navsBodyRect.width - navsRect.width)
        } else if (factor < 0) {
          navsStyle.value.left = Math.max(left, 0)
        } else {
          const activeItemElement = proxy.tabsElement.querySelector('.nav-item.__active') as HTMLElement
          if (activeItemElement) {
            const activeItemRect = activeItemElement.getBoundingClientRect()

            if (activeItemRect.left < navsRect.left) {
              left -= (navsRect.left - activeItemRect.left )
            } else if (activeItemRect.right > navsRect.right) {
              left += (activeItemRect.right - navsRect.right)
            }
          }

          navsStyle.value.left = Math.max(0, Math.min(left, navsBodyRect.width - navsRect.width))
        }
        break
      case 'left':
      case 'right':
        let top = navsStyle.value.top + factor * navsRect.height

        if (factor > 0) {
          navsStyle.value.top = Math.min(top, navsBodyRect.height - navsRect.height)
        } else if (factor < 0) {
          navsStyle.value.top = Math.max(top, 0)
        } else {
          const activeItemElement = proxy.tabsElement.querySelector('.nav-item.__active') as HTMLElement
          if (activeItemElement) {
            const activeItemRect = activeItemElement.getBoundingClientRect()

            if (activeItemRect.top < navsRect.top) {
              top -= (navsRect.top - activeItemRect.top )
            } else if (activeItemRect.bottom > navsRect.bottom) {
              top += (activeItemRect.bottom - navsRect.bottom)
            }
          }

          navsStyle.value.top = Math.max(0, Math.min(top, navsBodyRect.height - navsRect.height))
        }
        break
    }
  }

  const hasScrollbar = ref(false)

  function updateScollbarState () {
    const element = proxy.navsBodyElement
    const parentElement = element.parentElement as HTMLElement

    if (/top|bottom/.test(props.position)) {
      hasScrollbar.value = parentElement.clientWidth < element.clientWidth
    } else {
      hasScrollbar.value = parentElement.clientHeight < element.clientHeight
    }
  }

  return {
    rectStyle,
    updateRectPosition,
    navsStyle,
    updateNavsPosition,
    hasScrollbar,
    updateScollbarState
  }
}

export default useStyle