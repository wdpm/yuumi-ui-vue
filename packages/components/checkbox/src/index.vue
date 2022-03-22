<template>
<label :class="['yuumi-checkbox', 'size__' + size, {
  '__checked': checkboxChecked||indeterminate,
  '__disabled': checkboxDisabled
}]" v-bind="$attrs"
  @click="onClick"
>
  <span class="checkbox__icon">
    <transition name="yuumi-checkbox">
      <YuumiIcon v-if="checkboxChecked" v-bind="checkedIcon"></YuumiIcon>
      <YuumiIcon v-else-if="indeterminate" v-bind="indeterminateIcon"></YuumiIcon>
      <YuumiIcon v-else v-bind="uncheckedIcon"></YuumiIcon>
    </transition>
  </span>
  <span class="checkbox__content">
    <slot></slot>
  </span>
</label>

</template>

<script lang="ts">
import { isValidComponentSize } from '../../../share/validator'
import { computed, defineComponent, inject } from 'vue'
import type { ComputedRef } from 'vue'

export default defineComponent({
  name: 'YuumiCheckbox',
  props: {
    modelValue: [String, Number, Boolean],
    disabled: Boolean,
    unique: { type: [String, Number, Boolean], required: true },
    size: { type: String, validator: isValidComponentSize, default: 'md' },
    checkedIcon: { type: Object, default: () => ({ icon: 'checkbox-selected' })},
    uncheckedIcon: {type: Object, default: () => ({ icon: 'checkbox-unselected' })},
    indeterminate: Boolean,
    indeterminateIcon: { type: Object, default: () => ({ icon: 'line-checkbox-indeterminate' })}
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const { isCheckboxGroup, modelValue, disabled, onChange, updateGroupModelValue } = inject('YuumiCheckboxGroup', {}) as any

    const checkboxChecked: ComputedRef<boolean> = computed(() => isCheckboxGroup ? (modelValue.value || []).indexOf(props.unique) > -1 : Boolean(props.modelValue))
    const checkboxDisabled  = computed(() => isCheckboxGroup ? disabled.value : props.disabled)

    function onClick () {
      if (checkboxDisabled.value) return

      const detail = {
        value: props.unique,
        checked: !checkboxChecked.value
      }

      if (isCheckboxGroup) {
        updateGroupModelValue(detail)
        onChange(detail)
      } else {
        emit('update:modelValue', detail.checked)
        emit('change', detail)
      }
    }

    return {
      checkboxChecked,
      checkboxDisabled,
      onClick
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";

.yuumi-checkbox {
  cursor: pointer;
  display: inline-table;

  .checkbox__icon, .checkbox__content {
    display: table-cell;
    vertical-align: middle;
  }

  .checkbox__icon {
    line-height: 0;
    position: relative;

    .yuumi-icon {
      display: block;
      color: map-get($--color, "border");
    }
  }

  .checkbox__content {
    padding-left: map-get($--space, "xm");
  }

  &.__checked {
    .checkbox__icon .yuumi-icon {
      color: map-get($--color, "primary");
    }
  }

  &.__disabled {
    opacity: 0.5;
    cursor: no-drop;

    .checkbox__icon .yuumi-icon {
      color: map-get($--color, "disabled");
    }
  }

  @each $key, $value in $--height {
    &.size__#{$key} {
      height: $value;

      .checkbox__icon {
        font-size: $value*0.5;
      }
    }
  }
}

.yuumi-checkbox-leave-from, .yuumi-checkbox-leave-active {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.yuumi-checkbox-enter-active, .yuumi-checkbox-leave-active {
  transition: opacity 0.2s, color 0.2s;
}

.yuumi-checkbox-enter-from, .yuumi-checkbox-leave-to {
  opacity: 0;
}
</style>