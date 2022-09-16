<template>
<!-- 如果只是一两层，使用pros问题不大，但是多层时，务必使用 $attrs 进行属性透传 -->
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
