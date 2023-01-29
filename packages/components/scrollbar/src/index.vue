<template>
<div :class="['yuumi-scrollbar', 'behavior_' + behavior]">
  <div class="scrollbar__body" ref="body">
    <slot></slot>
  </div>

  <section class="scrollbar" horizontal ref="horizontal" @mousedown.stop="dragstart"></section>
  <section class="scrollbar" vertical ref="vertical" @mousedown.stop="dragstart"></section>
</div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'

export default defineComponent({
  name: 'YuumiScrollbar',
  props: {
    behavior: {
      type: String,
      default: 'hover',
      validator: (value: string) => ['hover', 'always'].indexOf(value) > -1
    }
  },
  data() {
    return {
      cache: null as any
    }
  },
  computed: {
    barMinSize (): number {
      return 20
    }
  },
  emits: ['init', 'scroll'],
  mounted () {
    nextTick(() => {
      this.updateBodyStyle()
      this.updateVerticalStyle()
      this.updateHorizontalStyle()

      ;(this.$refs.body as any).addEventListener('scroll', this.onScroll, false)
      this.$emit('init',  this)
    })
  },
  updated () {
    nextTick(() => {
      this.updateBodyStyle()
      this.updateVerticalStyle()
      this.updateHorizontalStyle()
    })
  },
  beforeUnmount () {
    (this.$refs.body as any).removeEventListener('scroll', this.onScroll, false)
  },
  methods: {
    onScroll (e: any) {
      this.updateVerticalStyle()
      this.updateHorizontalStyle()
      this.$emit('scroll', e)
    },

    updateBodyStyle () {
      const bodyElement = this.$refs.body as HTMLElement
      const { clientWidth, offsetWidth, clientHeight, offsetHeight } = bodyElement
      bodyElement.setAttribute('style', this.combineStyle({
        width: `calc(100% + ${offsetWidth - clientWidth}px)`,
        height: `calc(100% + ${offsetHeight - clientHeight}px)`
      }, bodyElement.getAttribute('style')))
    },

    updateVerticalStyle () {
      const { clientWidth, offsetWidth, offsetHeight, scrollWidth, scrollHeight, scrollLeft } = this.$refs.body as HTMLElement

      const horizontalElement = this.$refs.horizontal as HTMLElement
      const horizontalWidth = offsetHeight < scrollHeight ? horizontalElement.clientWidth : 0

      const verticalElement = this.$refs.vertical as HTMLElement
      const _width = Math.max(this.barMinSize, clientWidth / scrollWidth * (clientWidth - horizontalWidth))
      const left = (scrollLeft + clientWidth) / scrollWidth * (clientWidth - horizontalWidth) - _width

      verticalElement.setAttribute('style', this.combineStyle({
        width: `${_width}px`,
        left: `${left}px`,
        display: offsetWidth < scrollWidth ? 'block' : 'none'
      }, verticalElement.getAttribute('style')))
    },

    updateHorizontalStyle () {
      const { clientHeight, offsetWidth, offsetHeight, scrollWidth, scrollHeight, scrollTop } = this.$refs.body as HTMLElement

      const verticalElement = this.$refs.vertical as HTMLElement
      const verticalHeight = offsetWidth < scrollWidth ? verticalElement.clientHeight : 0

      const horizontalElement = this.$refs.horizontal as HTMLElement
      const _height = Math.max(this.barMinSize, clientHeight / scrollHeight * (clientHeight - verticalHeight))
      const top = (scrollTop + clientHeight) / scrollHeight * (clientHeight - verticalHeight) - _height
      horizontalElement.setAttribute('style', this.combineStyle({
        height: `${_height}px`,
        top: `${top}px`,
        display: offsetHeight < scrollHeight ? 'block' : 'none'
      }, horizontalElement.getAttribute('style')))
    },

    combineStyle (attrs: {[key: string]: string}, style: string|null) {
      style = style || ''

      for (let key in attrs) {
        const value = attrs[key] ? `${key}:${attrs[key]};` : ''
        const reg = RegExp(`${key}.*?;`)
        style = reg.test(style) ? style.replace(reg, value): style + value
      }

      return style
    },

    dragstart ({ pageX, pageY, target}: any) {
      if (target.hasAttribute('horizontal')) {
        this.cache = {
          y: pageY,
          top: parseInt((this.$refs.horizontal as HTMLElement).style.top)
        }
      } else if (target.hasAttribute('vertical')) {
        this.cache = {
          x: pageX,
          left: parseInt((this.$refs.vertical as HTMLElement).style.left)
        }
      }

      if (this.behavior === 'hover') {
        this.$el.classList.remove(`behavior_${this.behavior}`)
      }

      window.addEventListener('mousemove', this.dragmove, false)
      window.addEventListener('mouseup', this.dragend, false)
    },

    dragmove (e: any) {
      const bodyElement = this.$refs.body as HTMLElement
      const verticalElement = this.$refs.vertical as HTMLElement
      const horizontalElement = this.$refs.horizontal as HTMLElement
      const { clientWidth, clientHeight, offsetWidth, offsetHeight, scrollWidth, scrollHeight} = bodyElement
      const {x, left,  y, top} = this.cache || {}

      if (x !== undefined) {
        const horizontalWidth = offsetHeight < scrollHeight ? horizontalElement.clientWidth : 0
        const maxAvalidWidth = clientWidth - verticalElement.clientWidth - horizontalWidth
        const _left = Math.max(Math.min(left + e.pageX - x, maxAvalidWidth), 0)
        bodyElement.scrollLeft = (_left + verticalElement.clientWidth) / (clientWidth - horizontalWidth) * scrollWidth - clientWidth
      } else if (y !== undefined) {
        const verticalHeight = offsetWidth < scrollWidth ? verticalElement.clientHeight : 0
        const maxAvalidHeight = clientHeight - horizontalElement.clientHeight - verticalHeight
        const _top = Math.max(Math.min(top + e.pageY - y, maxAvalidHeight), 0)
        bodyElement.scrollTop = (_top + horizontalElement.clientHeight) / (clientHeight - verticalHeight) * scrollHeight - clientHeight
      }
    },

    dragend () {
      if (this.behavior === 'hover') {
        this.$el.classList.add(`behavior_${this.behavior}`)
      }
      this.cache = null
      window.removeEventListener('mousemove', this.dragmove, false)
      window.removeEventListener('mouseup', this.dragend, false)
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";

.yuumi-scrollbar {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .scrollbar__body {
    position: relative;
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  .scrollbar {
    background-color: rgba(#000000, .3);
    border-radius: map-get($--border-radius, "round");
    cursor: pointer;
    position: absolute;
    z-index: 1;
    user-select: none;
    transition: opacity 0.2s;

    &[horizontal] {
      width: 8px;
      right: 0;
      top: 0;
    }

    &[vertical] {
      height: 8px;
      bottom: 0;
      left: 0;
    }
  }

  &.behavior_hover .scrollbar {
    opacity: 0;
  }

  &:hover .scrollbar{
    opacity: 1;

    &:hover {
      background-color: rgba(#000000, .6);
    }
  }
}
</style>