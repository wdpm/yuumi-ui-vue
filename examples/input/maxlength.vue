<template>
  <YuumiInput placeholder="maxlength = 5" :maxlength="5" v-model="value"></YuumiInput>
</template>
<script>
export default {
  data () {
    return {
      value: '这是一段测试文字'
    }
  }
}
</script>