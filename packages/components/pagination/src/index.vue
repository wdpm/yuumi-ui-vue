<template>
<div class="yuumi-pagination" :class="['_'+align]">
  <template v-for="item in buttons" :key="item.text">
    <YuumiButton v-if="item.type === 'btn'" size="sm" outline :theme="item.selected ? 'primary' : 'default' "
      :disabled="item.disabled"
      @click="onClick(item)"
    >{{item.text}}</YuumiButton>
    <div v-else>{{item.text}}</div>
  </template>

  <div class="total" v-if="totalVisible && total > 0">共 <span>{{total}}</span> 条</div>
  <YuumiInput size="sm" v-model="skipValue" :limit="skipValueLimit"></YuumiInput>
  <YuumiButton size="sm" theme="primary" @click="onSkip">确认</YuumiButton>
</div>
</template>

<script lang="ts">
import { createRange } from '../../../share/helper'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'YuumiPagination',
  props: {
    page: { type: [Number, String], default: 1, validator: (value: any) => Number(value) >= 0 },
    pageTotal: { type: [Number, String], validator: (value: any) => Number(value) >= 0 },
    total: { type: [Number, String], validator: (value: any) => Number(value) >= 0},
    totalVisible: { type: Boolean, default: true },
    maxLength: { type: Number, default: 5, validator: (value: number) => {
      return value % 2 === 1 && value >= 3
    }},
    align: { type: String, default: 'center', validator: (value: string) => /left|center|right/.test(value)},
  },
  emits: ['change'],
  setup (props, { emit }) {
    const page = computed(() => Number(props.page))
    const pageTotal = computed(() => Number(props.pageTotal || props.page || 0))

    const buttons = computed(() => {
      const half = Math.floor(props.maxLength / 2)
      const left = Math.max(1, page.value - half)
      const right = Math.min(Math.max(page.value + half, props.maxLength), pageTotal.value)
      const btns = createRange(left, right + 1, (item) => ({
        type: 'btn',
        text: item,
        value: item,
        selected: item === page.value
      }))

      if (left > 2) {
        btns.unshift(
          { type: 'btn', text: 1, value: 1 },
          { type: 'text', text: '...' }
        )
      }

      btns.unshift({
        type: 'btn',
        text: '上一页',
        value: page.value - 1,
        disabled: page.value <= 1
      })

      if (right + 2 < pageTotal.value) {
        btns.push(
          { type: 'text', text: '...' },
          { type: 'btn', text: pageTotal.value, value: pageTotal },
        )
      }

      btns.push({
        type: 'btn',
        text: '下一页',
        value: page.value + 1,
        disabled: page.value >= pageTotal.value
      })

      return btns
    })

    const skipValue = ref("")

    function skipValueLimit (vlaue: number) {
      const _v = Number(vlaue)
      if (!_v || _v <= 0 || _v > pageTotal.value) return false
      return true
    }

    function onClick (item: any) {
      skipPage(item.value)
    }

    function onSkip() {
      skipPage(Number(skipValue.value))
    }

    function skipPage (page: number) {
      page && emit("change", page)
    }

    return {
      buttons,
      skipValue,
      skipValueLimit,
      onSkip,
      onClick
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";
.yuumi-pagination {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  &._left {
    justify-content: flex-start;
  }

  &._center {
    justify-content: center;
  }

  &._right {
    justify-content: flex-end;
  }

  .yuumi-button, .yuumi-input {
    margin: 0 map-get($--space, "xm")*0.5;
  }

  .yuumi-input {
    width: 50px;

    input {
      text-align: center;
    }
  }

  .total {
    white-space: nowrap;
    margin: 0 map-get($--space, "xm")*0.5;

    span {
      color: map-get($--color, "primary");
    }
  }
}
</style>