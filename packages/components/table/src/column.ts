import { getValueByPath } from '../../../share/helper'
import { isDefined, isValidAlign, isValidTableColumnFixed, isValidTableColumnType, tableColumnType } from '../../../share/validator'
import { defineComponent, h, inject, ref, resolveComponent, watch } from 'vue'
import { ProvideState } from './provider-helper'
import type { Ref } from 'vue'

export default defineComponent({
  name: 'YuumiTableColumn',
  props: {
    width: { type: Number, default: 75 },
    title: { type: String },
    prop: { type: String },
    placeholder: { type: String, default: '-' },
    align: { type: String, validator: isValidAlign },
    fixed: {
      type: String,
      validator: isValidTableColumnFixed
    },
    type: {
      type: String,
      validator: isValidTableColumnType
    }
  },
  setup (props, { attrs }) {
    const { tableInstance, selections, selectionChanged } = inject('state') as ProvideState
    const { data } = tableInstance.props as any

    const checked: Ref<boolean> = ref(selections.value.some(item => item === data[attrs.rowIndex as number]))

    watch(() => selections.value.length, (value, oldValue) => {
      if (value === oldValue) return

      const _checked = selections.value.some(item => item === data[attrs.rowIndex as number])
      if (_checked !== checked.value) {
        checked.value = _checked
      }
    })

    return {
      data,
      checked,
      selectionChanged
    }
  },
  render () {
    const { align, type, data, $attrs } = this

    const getColumnContent = () => {
      if (type === tableColumnType.selection) {
        const checkboxComponent = resolveComponent('YuumiCheckbox')
        return [h(checkboxComponent, {
          unique: $attrs.rowIndex,
          modelValue: this.checked,
          style: {
            height: '1em'
          },
          'onUpdate:modelValue': (value: boolean) => {
            this.checked = value
          },
          'onChange': this.selectionChanged
        })]
      }

      const value = typeof this.prop === 'string' ? getValueByPath(data, `[${$attrs.rowIndex}][${this.prop}]`, this.placeholder) : this.placeholder

      if (this.$slots.default) {
        return this.$slots.default({$props: this.$props, $attrs, $value: value})
      }

      return value
    }

    return h('div', {
      class: ['column', align && `_${align}`],
      style: {
        fontSize: isDefined(type) ? '0px' : null
      }
    }, getColumnContent())
  }
})