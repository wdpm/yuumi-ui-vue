<template>
<YuumiButton @click="showDialog">异步操作</YuumiButton>
<YuumiDialog title="dialog title" v-model="show" :sync="false" @close="onclose" @cancel="oncancel" @confirm="onconfirm">
  <YuumiIcon icon="line-help" ></YuumiIcon>
  <span>异步操作</span>
</YuumiDialog>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      timeout: 0
    }
  },
  methods: {
    showDialog () {
      this.show = true
    },
    hideDialog () {
      if (this.timeout) clearTimeout(this.timeout)

      this.$yuumi.createMessage({ message: '3s后关闭', theme: 'warn' })

      this.timeout = setTimeout(() => {
        this.show = false
      }, 3000)
    },
    onclose () {
      console.log('on close')
      this.hideDialog()
    },
    oncancel () {
      console.log('on cancel')
      this.hideDialog()
    },
    onconfirm () {
      console.log('on confirm'),
      this.hideDialog()
    }
  }
}
</script>