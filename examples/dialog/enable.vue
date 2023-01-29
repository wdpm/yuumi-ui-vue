<template>
<YuumiButton @click="showDialog({closeEnable: false})" style="margin: 0 10px 10px 0;">不显示关闭</YuumiButton>
<YuumiButton @click="showDialog({cancelEnable: false})" style="margin: 0 10px 10px 0;">不显示取消</YuumiButton>
<YuumiButton @click="showDialog({confirmEnable: false})" style="margin: 0 10px 10px 0;">不显示确认</YuumiButton>
<YuumiButton @click="showDialog({cancelEnable: false, confirmEnable: false})" style="margin: 0 10px 10px 0;">不显示取消和确认</YuumiButton>

<YuumiDialog title="dialog title" v-model="show" v-bind="enable">
  <YuumiIcon icon="line-help" ></YuumiIcon>
  <span>部分显示</span>
</YuumiDialog>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      enable: null
    }
  },
  methods: {
    showDialog (options) {
      this.enable = options
      this.show = true
    }
  }
}
</script>