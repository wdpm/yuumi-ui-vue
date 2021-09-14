<template>
  <button ref="buttonEl" :class="['yuumi-button', 'size__'+size, 'theme__'+theme, {
    '__outline': outline,
    '__circle': circle,
    '__round': round,
    '__splash': splash
  }]" :disabled="disabled" @click="onclick" v-bind="$attrs">
    <span class="button__animation" ref="animationEl" v-if="splash"></span>
    <span class="button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import { isValidComponentSize, isValidComponentTheme } from '../../../share/validator'

export default defineComponent({
  name: 'YuumiButton',
  props: {
    size: {
      type: String,
      validator: isValidComponentSize,
      default: 'md'
    },
    theme: {
      type: String,
      validator: isValidComponentTheme,
      default: 'default'
    },
    outline: Boolean,
    splash: Boolean,
    disabled: Boolean,
    circle: Boolean,
    round: Boolean
  },
  data () {
    return {
      splashs: []
    }
  },
  emits: ['click'],
  setup (props, { emit }) {
    const buttonEl: Ref<any> = ref(null)
    const animationEl: Ref<any> = ref(null)

    function addSplash (e: MouseEvent) {
      const { left, top, width } = buttonEl.value.getBoundingClientRect()
      const size = Math.max(e.pageX - left, width - (e.pageX - left))
      const splash = {
        size: size * 2,
        x: e.pageX - (document.body.scrollLeft || document.documentElement.scrollLeft) - left - size,
        y: e.pageY - (document.body.scrollTop || document.documentElement.scrollTop) - top - size
      }
      const element = document.createElement('span')
      element.setAttribute('style', `left: ${splash.x}px; top: ${splash.y}px; width: ${splash.size}px; height: ${splash.size}px;`)

      const parentElement: any = animationEl.value
      parentElement.insertBefore(element, parentElement.firstChild)

      window.setTimeout(() => {
        parentElement && parentElement.removeChild(element)
      }, 300)
    }

    function onclick (e: MouseEvent) {
      if (props.splash && props.theme) addSplash(e)
      emit('click', e)
    }

    return {
      buttonEl,
      animationEl,
      onclick
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";

.yuumi-button {
  position: relative;
  display: inline-block;
  overflow: hidden;
  user-select: none;
  outline: none;
  border-radius: map-get($--border-radius, "primary");
  border: 1px solid map-get($--color, "border");
  background-color: transparent;
  color: inherit;
  box-sizing: border-box;
  padding: 0 map-get($--space, "xm");
  transition: borderColor 0.2s, color 0.2s, background 0.2s;
  cursor: pointer;
  // line-height: 0;

  .button__animation {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    > span {
      position: absolute;
      display: block;
      transform-origin: center;
      animation: splash .3s;
      border-radius: 100%;
      background-color: rgba(map-get($--color, "primary"), 0.15);
    }
  }

  .button__content {
    position: relative;
  }

  @each $key, $value in $--height {
    &.size__#{$key} {
      height: $value;
      padding: 0 $value*0.4;

      &.__round {
        border-radius: $value;
      }

      &.__circle {
        width: $value;
        padding: 0;
        overflow: hidden;
        border-radius: $value;
      }
    }
  }

  &[disabled] {
    opacity: 0.5;
    cursor: no-drop;
  }

  &.theme__default {
    &:hover {
      border-color: mix(map-get($--color, "primary"), map-get($--color, "white"), 85%);
      color: mix(map-get($--color, "primary"), map-get($--color, "white"), 85%);
    }

    &:active {
      border-color: mix(map-get($--color, "primary"), map-get($--color, "dark"), 85%);
      color: mix(map-get($--color, "primary"), map-get($--color, "dark"), 85%);
    }

    &.__splash{
      &:hover, &:active {
        border-color: map-get($--color, "primary");
        color: map-get($--color, "primary");
      }
    }

    &[disabled] {
      border-color: map-get($--color, "border");
      color: inherit;
    }
  }

  @each $key in $--theme {
    &.theme__#{$key} {
      background-color: map-get($--color, $key);
      border-color: map-get($--color, $key);
      @if $key == "warn" {
        color: inherit;
      } @else {
        color: map-get($--color, "white");
      }

      &:hover {
        border-color: mix(map-get($--color, $key), map-get($--color, "white"), 85%);
        background-color: mix(map-get($--color, $key), map-get($--color, "white"), 85%);
      }

      &:active {
        border-color: mix(map-get($--color, $key), map-get($--color, "dark"), 85%);
        background-color: mix(map-get($--color, $key), map-get($--color, "dark"), 85%);
      }

      &.__splash{
        .button__animation > span {
          background-color: rgba(map-get($--color, "white"), 0.25);
        }

        &:hover, &:active {
          border-color: map-get($--color, $key);
          background-color: map-get($--color, $key);
        }
      }

      &[disabled] {
        background-color: map-get($--color, $key);
        border-color: map-get($--color, $key);
      }

      &.__outline {
        background-color: transparent;
        color: map-get($--color, $key);

        &:hover {
          background-color: mix(map-get($--color, $key), map-get($--color, "white"), 10%);
          color: mix(map-get($--color, $key), map-get($--color, "white"), 85%);
        }

        &:active {
          border-color: map-get($--color, $key);
          background-color: map-get($--color, $key);
          @if $key == "warn" {
            color: inherit;
          } @else {
            color: map-get($--color, "white");
          }
        }

        &.__splash{
          .button__animation > span {
            background-color: rgba(map-get($--color, $key), 0.15);
          }

          &:hover, &:active {
            background-color: transparent;
            color: map-get($--color, $key);
          }
        }

        &[disabled] {
          background-color: transparent;
          color: map-get($--color, $key);
        }
      }
    }
  }
}

@keyframes splash {
  0% {
    transform: scale(.1);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>