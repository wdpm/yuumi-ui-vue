<template>
<label :class="['yuumi-input', 'theme__' + theme, 'size__' + size,
  {
    '__disabled': disabled,
    '__readonly': readonly,
    '__round': round,
    '__has-prefix-icon': hasPrefixIcon,
    '__has-suffix-icon': hasSuffixIcon || clearIconVisible,
    '__has-prefix': hasPrefix,
    '__has-suffix': hasSuffix
  }]"
  @mouseenter="onMouseenter"
  @mouseleave="onMouseleave"

  v-bind="$attrs"
>

  <span class="input__prefix" v-if="hasPrefix">
    <slot name="prefix"></slot>
  </span>

  <span class="input__content">
    <span class="input__prefix-icon" v-if="hasPrefixIcon">
      <slot name="prefixIcon"></slot>
    </span>

    <input ref="inputEl" :type="type" :value="modelValue" @input="onInput" v-bind="inputListeners"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :placeholder="placeholder"
      @compositionstart="onCompositionstart"
      @compositionend="onCompositionend"
    >

    <span class="input__suffix-icon" v-if="hasSuffixIcon || clearIconVisible">
      <YuumiIcon class="clear-btn" v-if="clearIconVisible" icon="line-circle-close" @click="clearValue"></YuumiIcon>
      <slot name="suffixIcon" v-else></slot>
    </span>
  </span>

  <span class="input__suffix" v-if="hasSuffix">
    <slot name="suffix"></slot>
  </span>
</label>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import { isDefined, isValidComponentSize, isInputType, isValidComponentTheme } from '../../../share/validator'
import { computed, defineComponent, onMounted, ref, watch, nextTick } from 'vue'

export default defineComponent({
  name: 'YuumiInput',
  props: {
    modelValue: String,
    disabled: Boolean,
    autoFocus: Boolean,
    readonly: Boolean,
    maxlength: Number,
    placeholder: String,
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
    limit: [Function, RegExp],
    clearable: Boolean,
    round: Boolean,
    type: {
      type: String,
      validator: isInputType,
      default: 'text'
    }
  },
  setup (props, { emit, slots, attrs }) {
    // 是否有插槽
    const hasPrefixIcon: Ref<boolean> = ref(isDefined(slots.prefixIcon))
    const hasSuffixIcon: Ref<boolean> = ref(isDefined(slots.suffixIcon))
    const hasPrefix: Ref<boolean> = ref(isDefined(slots.prefix))
    const hasSuffix: Ref<boolean> = ref(isDefined(slots.suffix))

    const compositionupdating = ref(false)

    function valueIsValid (value: string) {
      const { limit } = props
      if (!value || !limit || compositionupdating.value) return true

      return (typeof limit === 'function' && limit(value)) ||
        (limit instanceof RegExp && limit.test(value))
    }

    function onCompositionstart () {
      compositionupdating.value = true
    }

    function onCompositionend (e: Event) {
      compositionupdating.value = false
      onInput(e)
    }

    function onInput (e: Event) {
      const target = e.target as HTMLInputElement
      if (!valueIsValid(target.value)) {
        target.value = props.modelValue || ''
      }

      if (!compositionupdating.value) {
        emit('update:modelValue', target.value)
        emit('input', e)
      }
    }

    // 自动获取焦点 auto focus
    const inputEl: Ref<any> = ref(null)

    onMounted(() => {
      nextTick(() => {
        if (props.autoFocus) {
          inputEl.value.focus()
        }
      })
    })

    // clearable
    const clearIconVisible = ref(false)
    const isMouseenter = ref(false)

    function updateClearIconVisible () {
      const _value = Boolean(inputEl.value.value) && isMouseenter.value

      if (clearIconVisible.value !== _value) {
        clearIconVisible.value = _value
      }
    }

    function onMouseenter () {
      if (props.readonly || props.disabled) return
      isMouseenter.value = true

      if (props.clearable) updateClearIconVisible()
    }

    function onMouseleave () {
      if (props.readonly || props.disabled) return
      isMouseenter.value = false
      if (props.clearable) updateClearIconVisible()
    }

    function clearValue () {
      emit('update:modelValue', '')

      nextTick(() => {
        updateClearIconVisible()
      })
    }

    watch(() => props.modelValue, function (value = '', oldValue = '') {
      // 值是否可用
      let _value = valueIsValid(value) ? value : valueIsValid(oldValue) ? oldValue : ''

      // 初始值是否超出最大长度
      if (props.maxlength && _value.length > props.maxlength) {
        _value = _value.slice(0, props.maxlength)
      }

      if (_value !== value) {
        emit('update:modelValue', _value)
      }

      // 是否显示清楚按钮
      if (props.clearable && isMouseenter.value) {
        updateClearIconVisible()
      }
    }, { immediate: true })

    attrs = (attrs || {})
    const inputListeners = computed(() => {
      return {
        onBlur: attrs.onBlur,
        onFocus: attrs.onFocus,
        onChange: attrs.onChange,
        onKeydown: attrs.onKeydown,
        onKeyup: attrs.onKeyup,
        onKeypress: attrs.onKeypress
      }
    })

    return {
      hasPrefixIcon,
      hasSuffixIcon,
      hasPrefix,
      hasSuffix,
      inputEl,
      onCompositionstart,
      onCompositionend,
      onInput,
      clearIconVisible,
      isMouseenter,
      onMouseenter,
      onMouseleave,
      clearValue,
      inputListeners
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";

.yuumi-input {
  display: inline-table;
  border: 0px solid map-get($--color, "border");

  .input__content {
    line-height: 0;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    border-width: 0px;
    border-style: solid;
    border-color: inherit;
  }

  input {
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
    border-radius: map-get($--border-radius, "primary");
    background-color: inherit;
    color: inherit;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s;

    &::placeholder {
      color: map-get($--color, "placeholder");
    }

    &:focus {
      border-color: map-get($--color, 'primary');
    }
  }

  .input__prefix, .input__suffix {
    background-color: map-get($--color, "light");
    width: 0;
    display: table-cell;
    vertical-align: middle;
    padding: 0 map-get($--space, "xm");
    border-width: 1px;
    border-style: solid;
    border-color: inherit;
    border-radius: map-get($--border-radius, "primary");
  }

  .input__prefix-icon, .input__suffix-icon {
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .input__prefix-icon {
    left: 0;
  }

  .input__suffix-icon {
    right: 0;
  }

  .clear-btn {
    cursor: pointer;
    color: map-get($--text-color, "secondary");
  }

  &.__has-prefix {
    .input__prefix {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
    }

    input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  &.__has-suffix {
    .input__suffix {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
    }

    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &.__disabled {
    opacity: 0.5;
    cursor: no-drop;
    background-color: transparent;

    input {
      cursor: no-drop;
    }
  }

  @each $key, $value in $--height {
    &.size__#{$key} {
      height: $value;

      .input__prefix-icon, .input__suffix-icon  {
        width: $value;
      }

      input {
        height: $value;
        padding: 0 $value*0.25;
      }

      &.__has-prefix-icon input {
        padding-left: $value;
      }

      &.__has-suffix-icon input {
        padding-right: $value;
      }

      &.__round input {
        border-radius: $value;
      }
    }
  }

  @each $key in $--theme {
    &.theme__#{$key} {
      border-color: map-get($--color, $key);
      color: map-get($--color, $key);

      .input__prefix, .input__suffix {
        background-color: mix(map-get($--color, $key), map-get($--color, "white"), 25%);
      }

      input::placeholder {
        color: mix(map-get($--color, $key), map-get($--color, "white"), 45%);
      }

      input:focus {
        border-color: map-get($--color, $key);
      }
    }
  }
}
</style>