<template>
  <template v-for="size in ['xl', 'lg', 'md', 'sm', 'xm']" :key="size">
    <YuumiInput v-model="value" placeholder="请输入" style="margin: 0 10px 10px 0;" :size="size"></YuumiInput>
  </template>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>