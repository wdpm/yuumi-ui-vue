<template>
<div class="yuumi-radio-group" >
  <slot></slot>
</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, provide, toRefs } from 'vue'

export default defineComponent({
  name: 'YuumiRadioGroup',
  props: {
    modelValue: [String, Number, Boolean],
    disabled: Boolean
  },
  data() {
    return {}
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const { disabled, modelValue } = toRefs(props)

    provide('YuumiRadioGroup', {
      isRadioGroup: true,
      modelValue,
      disabled,
      updateModelValue: ({value}: any) => {
        emit('update:modelValue', value)
      },
      onChange: (detail: any) => {
        nextTick(() => {
          emit('change', { detail, value: detail.value })
        })
      }
    })
  }
})
</script>

<style lang="scss">
</style>