<template>
<span :class="[family, 'icon-'+icon]" v-bind="$attrs">
  <slot></slot>
</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'YuumiIcon',
  props: {
    family: {
      type: String,
      default: 'yuumi-icon'
    },
    icon: String
  }
})
</script>

<style lang="scss">
@import "./assets/iconfont.css";
</style>