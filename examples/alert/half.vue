<template>
<YuumiButton @click="showAlert({closeEnable: false})" style="margin: 0 10px 10px 0;">不显示关闭</YuumiButton>
<YuumiButton @click="showAlert({cancelEnable: false})" style="margin: 0 10px 10px 0;">不显示取消</YuumiButton>
<YuumiButton @click="showAlert({confirmEnable: false})" style="margin: 0 10px 10px 0;">不显示确认</YuumiButton>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    showAlert(options) {
      this.$yuumi.createAlert({
        ...options,
        title: '部分显示',
        content: '部分显示'
      })
    }
  }
}
</script>