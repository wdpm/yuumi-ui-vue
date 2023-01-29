<template>
  <teleport to="body">
    <div :class="['yuumi-drawer', 'postion_' + position]" v-if="visible">
      <div class="drawer-mask" @click="hideDrawer"></div>

      <transition name="yuumiDrawer"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
      >
        <div class="drawer-body" v-show="show" :style="bodyStyle">
          <slot></slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts">
import { clearEmpty } from '../../../share/helper'
import { computed, defineComponent, Ref, ref, watch } from 'vue'

export default defineComponent({
  name: 'YuumiDrawer',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      validator: (value: string) => {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) > -1
      },
      default: 'right'
    },
    width: String,
    height: String
  },
  setup (props, { emit }) {
    // TODO why
    // why use two variables to reflect show/hide logic?
    // Is it impossible to use only one variable?
    const visible = ref(props.modelValue)
    const show = ref(props.modelValue)

    watch(() => props.modelValue, function (value, oldValue) {
      if (value !== oldValue) updateSwitch(value)
    })

    watch(visible, function (value) {
      if (value !== props.modelValue) {
        emit('update:modelValue', value)
      }
    })

    function updateSwitch (value: boolean) {
      if (value) {
        visible.value = value
      }

      setTimeout(() => {
        show.value = value
      }, 0)
    }

    function hideDrawer () {
      show.value =false
    }

    const bodyStyle = computed(() => {
      return clearEmpty({
        width: props.width,
        height: props.height
      })
    })

    function beforeEnter (el: Element) {
      emit('before-open', el)
    }

    function afterEnter (el: Element) {
      emit('after-open', el)
    }

    function beforeLeave (el: Element) {
      emit('before-close', el)
    }

    function afterLeave (el: Element) {
      visible.value = false
      emit('after-close', el)
    }

    return {
      visible,
      show,
      hideDrawer,
      bodyStyle,
      beforeEnter,
      afterEnter,
      beforeLeave,
      afterLeave
    }
  },
  emits: ['update:modelValue', "before-open", 'after-open', 'before-close', 'after-close']
})
</script>

<style lang="scss">
@import "../../../theme.scss";

.yuumi-drawer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: nth($--index, 2);

  .drawer-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(map-get($--color, "black"), 0.3);
  }

  .drawer-body {
    position: absolute;
    background-color: map-get($--color, "white");
    box-shadow: 0 0 map-get($--space, "sm") nth($--box-shadow-color, 3);
  }

  &.postion_ {
    &right .drawer-body, &left .drawer-body {
      width: 400px;
      height: 100%;
      top: 0;
    }

    &right .drawer-body {
      right: 0;
    }

    &left .drawer-body {
      left: 0;
    }

    &bottom .drawer-body, &top .drawer-body {
      width: 100%;
      height: 300px;
      left: 0;
    }

    &bottom .drawer-body {
      bottom: 0;
    }

    &top .drawer-body {
      top: 0;
    }
  }
}

.yuumiDrawer-enter-active, .yuumiDrawer-leave-active {
  transition: transform .3s;
  transform: translate3d(0, 0, 0);
}

.postion_right {
  .yuumiDrawer-enter-from, .yuumiDrawer-leave-to {
    transform: translate3d(100%, 0, 0);
  }
}

.postion_left {
  .yuumiDrawer-enter-from, .yuumiDrawer-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
}

.postion_top {
  .yuumiDrawer-enter-from, .yuumiDrawer-leave-to {
    transform: translate3d(0, -100%, 0);
  }
}

.postion_bottom {
  .yuumiDrawer-enter-from, .yuumiDrawer-leave-to {
    transform: translate3d(0, 100%, 0);
  }
}
</style>
