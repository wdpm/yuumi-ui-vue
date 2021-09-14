<template>
<div class="date-panel">
  <slot></slot>
  <div class="panel__header">
    <div class="week-item" v-for="item in weeks" :key="item">
      <div class="item-content">{{item}}</div>
    </div>
  </div>
  <div class="panel__body">
    <template v-for="item in dates" :key="item.value.toString()">
      <div :class="['date-item', item.className, {
        '_selected': item.isSelected,
        'in-range': item.inRange,
        'range_start': item.isRangeStart,
        'range_end': item.isRangeEnd,
        '_disabled': item.disabled
      }]" @click="onSelect(item)" @mouseenter="onMouseenter(item)">
        <div class="item-content">{{item.value.getDate()}}</div>
      </div>
    </template>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    dates: Array as any
  },
  setup (props) {
    const weeks = ['日', '一', '二', '三', '四', '五', '六']

    return {
      weeks
    }
  },
  emits: ['select', 'itemEnter'],
  methods: {
    onSelect (item: any) {
      if (item.disabled) return
      this.$emit('select', item.value)
    },

    onMouseenter (item: any) {
      if (item.disabled) return
      this.$emit('itemEnter', item.value)
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";
$item-size: 24px;
$item-space: 5px;

.date-panel {
  display: inline-block;
  padding: map-get($--space, "sm") map-get($--space, "sm");

  &:not(:last-child) {
    border-right: 1px solid map-get($--color, "border");
  }

  .panel__header, .panel__body {
    overflow: hidden;
    width: ($item-size + $item-space * 2) * 7;
  }

  .panel__header {
    border-bottom: 1px solid map-get($--color, "border");
  }

  .week-item, .date-item {
    display: block;
    float: left;
    text-align: center;
    padding: $item-space;
    margin: $item-space * 0.5 0;

    .item-content {
      width: $item-size;
      line-height: $item-size;
    }
  }

  .date-item {
    cursor: pointer;
    font-size: 12px;

    &._prev-month, &._next-month {
      color: map-get($--color, "placeholder");
    }

    &._current-month {
      &.in-range {
        background-color: rgba(map-get($--color, "primary"), 0.1);
      }

      &._selected, &.range_start, &.range_end {
        .item-content {
          color: map-get($--color, "white");
          background-color: map-get($--color, "primary");
          border-radius: map-get($--border-radius, "circle");
        }
      }

      &.range_start {
        border-top-left-radius: map-get($--border-radius, "round");
        border-bottom-left-radius: map-get($--border-radius, "round");
      }

      &.range_end {
        border-top-right-radius: map-get($--border-radius, "round");
        border-bottom-right-radius: map-get($--border-radius, "round");
      }

      &._disabled {
        color: map-get($--color, "placeholder");
      }
    }
  }
}
</style>