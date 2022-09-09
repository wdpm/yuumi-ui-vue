import { getValueByPath, equal } from '../../../share/helper'
import { isDefined, isValidAlign, isValidTableColumnFixed, isValidTableColumnType, tableColumnType } from '../../../share/validator'
import { computed, defineComponent, h, inject, ref, Ref, resolveComponent, watch } from 'vue'
import { injectionKey, ProvideGetters } from './provide-helper'
import { TableSelection } from './selection-helper'

export default defineComponent({
  name: 'YuumiTableColumn',
  props: {
    width: { type: Number, default: 100 },
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
    const { getters, selection } = inject(injectionKey) as { getters: ProvideGetters, selection: TableSelection }
    const { rootProps } = getters
    const { selections, selectionChanged } = selection

    const isInSelections = computed(() => selections.value.some(item => equal(item, rootProps.value.data[attrs.rowIndex as number])))
    const checked: Ref<boolean> = ref(isInSelections)

    watch(() => selections.value.length, (value, oldValue) => {
      if (value === oldValue) return

      if (isInSelections.value !== checked.value) {
        checked.value = isInSelections.value
      }
    })

    watch(() => isInSelections.value, (value) => {
      if (value !== checked.value) {
        checked.value = value
      }
    })

    return {
      rootProps,
      isInSelections,
      checked,
      selectionChanged
    }
  },
  methods: {
    getSelectionContent () {
      const checkboxComponent = resolveComponent('YuumiCheckbox')
      return [h(checkboxComponent, {
        unique: this.$attrs.rowIndex,
        modelValue: this.checked,
        style: {
          height: '1em'
        },
        'onUpdate:modelValue': (value: boolean) => {
          this.checked = value
        },
        'onChange': this.selectionChanged
      })]
    },
    getColumnContent () {
      if (this.type === tableColumnType.selection) return this.getSelectionContent()

      let value
      if (typeof this.prop === 'string') {
        value = getValueByPath(this.rootProps.data, `[${this.$attrs.rowIndex}][${this.prop}]`)
      }

      if (typeof value !== 'number' && !value) {
        value = this.placeholder
      }

      if (this.$slots.default) {
        return this.$slots.default({$props: this.$props, $attrs: this.$attrs, $value: value})
      }

      return value
    }
  },
  render () {
    const { align, type } = this

    return h('div', {
      class: ['column', align && `_${align}`],
      style: {
        fontSize: isDefined(type) ? '0px' : null
      }
    }, this.getColumnContent())
  }
})