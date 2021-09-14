<template>
<div class="yuumi-checkbox-group" >
  <slot></slot>
</div>
</template>

<script lang="ts">
import { defineComponent, provide, toRefs, ref, nextTick } from 'vue'

export default defineComponent({
  name: 'YuumiCheckboxGroup',
  props: {
    modelValue: Array as any,
    disabled: Boolean
  },
  data() {
    return {}
  },
  emits: ['update:modelValue', 'change'],
  setup (props, { emit }) {
    const { disabled, modelValue } = toRefs(props)

    provide('YuumiCheckboxGroup', {
      isCheckboxGroup: true,
      modelValue,
      disabled,
      updateGroupModelValue: ({ value, checked }: any) => {
        const items = modelValue.value || []

        if (checked) {
          items.push(value)
        } else {
          const index = items.findIndex((item: any) => item === value)
          items.splice(index, 1)
        }

        emit('update:modelValue', items)
      },
      onChange: (detail: any) => {
        nextTick(() => {
          emit('change', { detail, value: modelValue.value })
        })
      }
    })
  }
})
</script>

<style lang="scss">
</style>