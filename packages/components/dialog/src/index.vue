<template>
<teleport to="body">
  <transition name="yuumi-dialog" appear
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
  >
    <div class="yuumi-dialog" v-bind="$attrs" v-if="modelValue">
      <div class="dialog-panel">
        <div class="dialog--header">
          <div class="dialog-title">
            <slot name="title">{{title}}</slot>
          </div>

          <YuumiIcon v-if="closeEnable" class="dialog-close" icon="line-close" @click="close"></YuumiIcon>
        </div>
        <div :class="['dialog--content', { '_center': alignCenter }]">
          <slot></slot>
        </div>

        <div class="dialog--footer" v-if="cancelEnable || confirmEnable">
          <YuumiButton v-if="cancelEnable" @click="cancel">{{cancelText}}</YuumiButton>
          <YuumiButton v-if="confirmEnable" @click="confirm" theme="primary">{{confirmText}}</YuumiButton>
        </div>
      </div>
    </div>
  </transition>
</teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getCss } from '../../../share/helper'

export default defineComponent({
  name: 'YuumiDialog',
  props: {
    modelValue: Boolean,
    title: {
      type: String
    },
    closeEnable: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    cancelEnable: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    confirmEnable: {
      type: Boolean,
      default: true
    },
    sync: {
      type: Boolean,
      default: true
    },
    alignCenter: Boolean,
    stopPenetrate: Boolean
  },
  data () {
    return {
      store: {
        overflow: '',
        scrollLeft: 0,
        scrollTop: 0
      }
    }
  },
  emits: ['update:modelValue', 'close', 'cancel', 'confirm', 'beforeEnter', 'afterEnter', 'beforeLeave', 'afterLeave'],
  methods: {
    hide () {
      if (!this.sync) return
      this.$emit('update:modelValue', false)
    },
    close () {
      this.hide()
      this.$emit('close', false)
    },
    cancel () {
      this.hide()
      this.$emit('cancel', false)
    },
    confirm () {
      this.hide()
      this.$emit('confirm', false)
    },
    beforeEnter (el: any) {
      this.$emit('beforeEnter', el)

      if (this.stopPenetrate) {
        this.saveScrollBehavior()
      }
    },
    afterEnter (el: any) {
      this.$emit('afterEnter', el)
    },
    beforeLeave (el: any) {
      this.$emit('beforeLeave', el)
    },
    afterLeave (el: any) {
      this.$emit('afterLeave', el)

      if (this.stopPenetrate) {
        this.restoreScrollBehavior()
      }
    },
    saveScrollBehavior () {
      this.store.scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft
      this.store.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      this.store.overflow = getCss(document.body, 'overflow') || ''

      this.updateOverflow('hidden')
    },
    restoreScrollBehavior () {
      document.body.scrollLeft = document.documentElement.scrollLeft = this.store.scrollLeft
      document.body.scrollTop = document.documentElement.scrollTop = this.store.scrollTop
      this.updateOverflow(this.store.overflow)

      this.store.scrollLeft = 0
      this.store.scrollTop = 0
      this.store.overflow = ''
    },
    updateOverflow (value: string) {
      let style = document.body.getAttribute('style') || ''

      if (/overflow/.test(style)) {
        style = style.replace(/overflow.*?;/, `overflow: ${value};`)
      } else {
        style += `overflow: ${value};`
      }

      document.body.setAttribute('style', style)
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";

$panel-top: 50%;

.yuumi-dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: nth($--index, 2);

  font-size: 14px;

  &::before {
    display: block;
    content: '';

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    background-color: rgba(map-get($--color, "black"), 0.3);
  }

  .dialog-panel {
    width: 500px;
    position: absolute;
    left: 50%;
    top: $panel-top;
    transform: translate3d(-50%, -50%, 0);
    background-color: map-get($--color, "white");
    border-radius: map-get($--border-radius, "primary");
    overflow: hidden;
    box-shadow: 0 0 map-get($--space, "sm") nth($--box-shadow-color, 3);
  }

  .dialog--header {
    padding: map-get($--height, "sm")*0.5 map-get($--space, "sm");
    background-color: map-get($--color, "light");
    position: relative;

    .dialog-title {
      padding-right: map-get($--space, "xm");
      font-size: 1.14em;
    }

    .dialog-close {
      position: absolute;
      right: map-get($--space, "xm");
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }

  .dialog--content {
    min-height: 128px;
    padding: map-get($--space, "sm");

    &._center {
      text-align: center;
    }
  }

  .dialog--footer {
    padding: 0 map-get($--space, "sm") map-get($--space, "sm");
    text-align: center;

    .yuumi-button {
      min-width: 80px;
    }

    :not(:last-child) {
      margin-right: map-get($--space, "sm");
    }
  }
}

.yuumi-dialog-enter-active, .yuumi-dialog-leave-active {
  transition: opacity .2s;

  .dialog-panel {
    transition: top .2s;
  }
}

.yuumi-dialog-enter-from, .yuumi-dialog-leave-to {
  opacity: 0;
}

.yuumi-dialog-enter-from .dialog-panel {
  top: $panel-top - 10%;
}

.yuumi-dialog-leave-to .dialog-panel {
  top: $panel-top + 10%;
}
</style>