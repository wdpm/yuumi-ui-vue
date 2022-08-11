<template>
<div class="yuumi-pagination">
  <template v-for="item in buttons" :key="item.text">
    <YuumiButton v-if="item.type === 'btn'" size="sm" outline :theme="item.selected ? 'primary' : '' "
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
    page: { type: Number, default: 1 },
    pageTotal: { type: Number },
    total: { type: Number },
    totalVisible: { type: Boolean, default: true },
    maxLength: { type: Number, default: 5, validator: (value: number) => {
      return value % 2 === 1 && value >= 3
    }}
  },
  emits: ['change'],
  setup (props, { emit }) {
    const buttons = computed(() => {
      const half = Math.floor(props.maxLength / 2)
      const left = Math.max(1, props.page - half)
      const right = Math.min(Math.max(props.page + half, props.maxLength), props.pageTotal || props.page)
      const btns = createRange(left, right + 1, (item) => ({
        type: 'btn',
        text: item,
        value: item,
        selected: item === props.page
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
        value: props.page - 1,
        disabled: props.page <= 1
      })

      if (right + 2 < (props.pageTotal || props.page)) {
        btns.push(
          { type: 'text', text: '...' },
          { type: 'btn', text: props.pageTotal || props.page, value: props.pageTotal || props.page },
        )
      }

      btns.push({
        type: 'btn',
        text: '下一页',
        value: props.page + 1,
        disabled: props.page >= (props.pageTotal || props.page)
      })

      return btns
    })

    const skipValue = ref("")

    function skipValueLimit (vlaue: number) {
      const page = Number(vlaue)
      if (!page || page <= 0 || page > (props.pageTotal || props.page)) return false
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