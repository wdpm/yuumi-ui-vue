<template>
  <div class="picker-time-item">
    <div class="time-item__split" ref="split"></div>

    <YuumiScrollbar @init="onInit" @scroll="onScroll">
      <!--  上方空间保持高度    -->
      <div class="item__prefix" :style="{height: horizontalPadding}"></div>
      <!--  一行    -->
      <div :class="['time-item', {
        selected: selected && selected.value === item.value,
        disabled: item.disabled
      }]"
           v-for="(item, index) in list" :key="item.value"
           @click="onItemSelect(item, index)"
      >
        {{ item.text }}
      </div>
      <!-- 下方空间保持高度 -->
      <div class="item__suffix" :style="{height: horizontalPadding}"></div>
    </YuumiScrollbar>
  </div>
</template>

<script lang="ts">
import {getValueByPath} from '../../../share/helper'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'PickerTimeItem',
  props: {
    modelValue: Number,
    type: {
      type: String,
      validator: (value: string) => {
        return ['hours', 'minutes', 'seconds'].indexOf(value) > -1
      }
    },
    disabled: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      scrollbar: null as any,
      horizontalPadding: '',
      itemHeight: 0,
      selected: null as any,
      scrollTimeout: null as any,
      updateSelectedTimeout: null as any
    }
  },
  computed: {
    list(): Array<{ [key: string]: any }> {
      const arr: any = []

      for (let i = 0; i < (this.type === 'hours' ? 24 : 60); i++) {
        arr.push({
          text: `0${i}`.slice(-2),
          index: i,
          value: i,
          disabled: this.disabled.indexOf(i) > -1
        })
      }

      return arr
    }
  },
  watch: {
    'modelValue': function (value, oldValue) {
      if (value !== oldValue && value !== getValueByPath(this.selected, 'value')) {
        this.modelValueChanged(value)
      }
    },
    'selected': function (value, oldValue) {
      if (value) this.$emit('update:modelValue', value.value)

      if (getValueByPath(value, 'value') !== getValueByPath(oldValue, 'value')) {
        this.$emit('change', value)
      }
    },
    'disabled': function () {
      let index = this.list.findIndex(item => item.value === this.modelValue) || 0

      if (this.list[index].disabled) {
        index = this.list.findIndex(item => !item.disabled)
        this.onItemSelect(this.list[index], index)
        this.scrollToSelected()
      }
    }
  },
  methods: {
    onInit(vm: any) {
      this.scrollbar = vm

      const scrollbarRect = vm.$el.getBoundingClientRect()
      const splitRect = (this.$refs.split as any).getBoundingClientRect()
      this.horizontalPadding = `${(scrollbarRect.height - splitRect.height) / 2}px`
      this.itemHeight = vm.$el.querySelector('.time-item').clientHeight

      this.$nextTick(() => {
        this.modelValueChanged(this.modelValue)
      })
    },
    modelValueChanged(modelValue: any) {
      let index = this.list.findIndex(item => item.value === modelValue) || 0

      if (this.list[index].disabled) {
        index = this.list.findIndex(item => !item.disabled)
      }

      this.onItemSelect(this.list[index], index)
      this.scrollToSelected()
    },

    onScroll(e: any) {
      this.updateSelected(e.target.scrollTop)

      if (this.scrollTimeout) clearTimeout(this.scrollTimeout)
      this.scrollTimeout = setTimeout(() => {
        const index = Math.abs(Math.ceil((e.target.scrollTop - this.itemHeight / 3) / this.itemHeight))
        this.onItemSelect(this.list[index], index)
        this.scrollToSelected()
      }, 200)
    },

    updateSelected(scrollTop: number) {
      if (this.updateSelectedTimeout) return

      this.updateSelectedTimeout = setTimeout(() => {
        this.updateSelectedTimeout = null

        const index = Math.abs(Math.ceil((scrollTop - this.itemHeight / 2) / this.itemHeight))
        this.onItemSelect(this.list[index], index)
      }, 32)
    },

    scrollToSelected() {
      if (this.$.isUnmounted) return
      this.scrollbar.$refs.body.scrollTop = this.selected.index * this.itemHeight
    },

    onItemSelect(item: any, index: number) {
      if (item.disabled) return

      if (!this.selected || this.list[index].value !== this.selected.value) {
        this.selected = item
        this.scrollToSelected()
      }
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";

.picker-time-item {
  display: table-cell;
  height: 100%;
  position: relative;

  .yuumi-scrollbar {
    height: 200px;
  }
}

.time-item__split {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: map-get($--height, "sm");
  box-sizing: border-box;
  border: 1px solid transparent;
  border-top-color: map-get($--color, "border");
  border-bottom-color: map-get($--color, "border");
}

.time-item {
  line-height: map-get($--height, "sm");
  padding: 0 map-get($--space, "sm");
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(map-get($--color, "border"), .5);
  }

  &.selected {
    font-weight: bold;
    color: map-get($--color, "primary");

    &:hover {
      background-color: transparent;
    }
  }

  &.disabled {
    color: map-get($--color, "disabled");

    &:hover {
      background-color: transparent;
    }
  }
}
</style>
