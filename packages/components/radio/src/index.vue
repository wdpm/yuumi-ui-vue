<template>
<label :class="['yuumi-radio', 'size__' + size, {
  '__checked': radioChecked,
  '__disabled': radioDisabled
}]" v-bind="$attrs"
  @click="onClick"
>
  <span class="radio__icon">
    <transition name="yuumi-radio">
      <YuumiIcon v-if="radioChecked" v-bind="checkedIcon" ></YuumiIcon>
      <YuumiIcon v-else v-bind="uncheckedIcon" ></YuumiIcon>
    </transition>
  </span>
  <span class="radio__content">
    <slot></slot>
  </span>
</label>
</template>

<script lang="ts">
import { isValidComponentSize } from '../../../share/validator'
import { computed, defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'YuumiRadio',
  props: {
    modelValue: [String, Number, Boolean],
    disabled: Boolean,
    unique: {
      type: [String, Number, Boolean],
      required: true
    },
    size: {
      type: String,
      validator: isValidComponentSize,
      default: 'md'
    },
    checkedIcon: {
      type: Object,
      default: () => ({
        icon: 'radio-selected'
      })
    },
    uncheckedIcon: {
      type: Object,
      default: () => ({
        icon: 'radio-unselected'
      })
    }
  },
  data() {
    return {}
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const {isRadioGroup, modelValue, disabled, onChange, updateModelValue } = inject('YuumiRadioGroup', {}) as any

    const radioChecked = computed(() => (isRadioGroup ? modelValue.value : props.modelValue) === props.unique)
    const radioDisabled  = computed(() => isRadioGroup ? disabled.value : props.disabled)

    function onClick () {
      if (radioDisabled.value || radioChecked.value) return

      const detail = {
        value: props.unique,
        checked: !radioChecked.value
      }

      if (isRadioGroup) {
        updateModelValue(detail)
        onChange(detail)
      } else {
        emit('update:modelValue', detail.value)
        emit('change', detail)
      }
    }

    return {
      radioChecked,
      radioDisabled,
      onClick
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";

.yuumi-radio {
  cursor: pointer;
  display: inline-table;

  .radio__icon, .radio__content {
    display: table-cell;
    vertical-align: middle;
  }

  .radio__icon {
    line-height: 0;
    position: relative;

    .yuumi-icon {
      display: block;
      color: map-get($--color, "border");
    }
  }

  .radio__content {
    padding-left: map-get($--space, "xm");
  }

  &.__checked {
    .radio__icon .yuumi-icon {
      color: map-get($--color, "primary");
    }
  }

  &.__disabled {
    opacity: 0.5;
    cursor: no-drop;

    .radio__icon .yuumi-icon {
      color: map-get($--color, "disabled");
    }
  }

  @each $key, $value in $--height {
    &.size__#{$key} {
      height: $value;

      .radio__icon {
        font-size: $value*0.5;
      }
    }
  }
}

.yuumi-radio-leave-from, .yuumi-radio-leave-active {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.yuumi-radio-enter-active, .yuumi-radio-leave-active {
  transition: opacity 0.2s, color 0.2s;
}

.yuumi-radio-enter-from, .yuumi-radio-leave-to {
  opacity: 0;
}
</style>