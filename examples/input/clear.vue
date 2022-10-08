<template>
  <YuumiInput placeholder="一键清除" v-model="value" clearable style="width: 100%;"></YuumiInput>
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