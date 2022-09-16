<template>
<div :class="['yuumi-switch', 'size__' + size, {
  '__checked': checked,
  '__readonly': readonly,
  '__disabled': disabled
}]" v-bind="$attrs"
  :style="{ backgroundColor: checked ? openColor : closeColor }"
  @click="onClick"
>
  <div class="switch__content">
    <div class="open">
      <div class="content__body">
        <div class="body__slot">
          <slot name="open"></slot>
        </div>
      </div>
    </div>

    <div class="close">
      <div class="content__body">
        <div class="body__slot">
          <slot name="close"></slot>
        </div>
      </div>
    </div>
  </div>

  <div class="switch__btn"></div>
</div>
</template>

<script lang="ts">
import { isValidComponentSize } from '../../../share/validator'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'YuumiSwitch',
  props: {
    modelValue: Boolean,
    size: {
      type: String,
      validator: isValidComponentSize,
      default: 'md'
    },
    disabled: Boolean,
    readonly: Boolean,
    openColor: {
      type: String,
      default: '#0d6efd'
    },
    closeColor: {
      type: String,
      default: '#d9d9d9'
    }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const checked = ref(props.modelValue)

    watch(() => props.modelValue, function (val, oldVal) {
      if (val !== oldVal) {
        checked.value = val
      }
    })

    watch(checked, function (val, oldVal) {
      if (val !== oldVal) emit('change', val)
    })

    function onClick () {
      if (props.readonly || props.disabled) return

      checked.value = !checked.value
      emit('update:modelValue', checked.value)
    }

    return {
      checked,
      onClick
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";
$space: 2px;

.yuumi-switch {
  display: inline-block;
  border-radius: map-get($--border-radius, "round");
  overflow: hidden;
  position: relative;
  transition: background .15s;
  cursor: pointer;
  user-select: none;

  .switch__content {
    width: 200%;
    height: 100%;
    // 因为初始化为[----ON][OFF----] -50%表示自身左移50%。也就在容器内显示[OFF---]
    transform: translateX(-50%);
    transition: transform 0.15s;

    .open, .close {
      display: block;
      float: left;
      width: 50%;
      height: 100%;
      box-sizing: border-box;

      .content__body {
        display: table;
        width: 100%;
        height: 100%;

        .body__slot {
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          color: map-get($--color, "white");
        }
      }
    }
  }

  .switch__btn {
    display: block;
    background-color: map-get($--color, "white");
    position: absolute;
    top: $space;
    left: $space;
    transition: all .15s;
  }

  &.__checked {
    .switch__content {
      transform: translateX(0%);
    }
  }

  &.__disabled {
    opacity: 0.5;
    cursor: no-drop;
  }

  @each $key, $value in $--height {
    &.size__#{$key} {
      height: $value;
      width: $value * 2;

      .switch__content {
        .open {
          padding-right: $value - $space;
        }

        .close {
          padding-left: $value - $space;
        }
      }

      .switch__btn {
        width: $value - ($space * 2);
        height: $value - ($space * 2);
        border-radius: map-get($--border-radius, "circle");
      }

      &.__checked {
        .switch__btn {
          left: calc(100% - #{$value - $space});
        }
      }
    }
  }
}
</style>
