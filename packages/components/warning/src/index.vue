<template>
<div :class="['yuumi-warning', 'theme__'+theme]" v-bind="$attrs">
  <slot></slot>
</div>
</template>

<script lang="ts">
import { isValidWarningTheme } from '../../../share/validator'
import { defineComponent } from 'vue'

export default defineComponent({
  name: "YuumiWarning",
  props: {
    theme: {
      type: String,
      validator: isValidWarningTheme,
      default: 'default'
    }
  }
})
</script>

<style lang="scss">
@import "../../../theme.scss";
.yuumi-warning {
  color: map-get($--text-color, "secondary");
  border-radius: map-get($--border-radius, "primary");
  padding: map-get($--space, "xm") map-get($--space, "sm");
  border: 1px solid transparent;

  &.theme__default {
    border-color: mix(map-get($--color, "border"), map-get($--color, "white"), 50%);
    background-color: map-get($--color, "light");
  }

  @each $key in ("primary", "warn", "success", "error") {
    &.theme__#{$key} {
      @if $key != "warn" {
        color: map-get($--color, $key);
      }
      background-color: mix(map-get($--color, $key), map-get($--color, "white"), 15%);
      border-color: mix(map-get($--color, $key), map-get($--color, "white"), 45%);
    }
  }
}
</style>
