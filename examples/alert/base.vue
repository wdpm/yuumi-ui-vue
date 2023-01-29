<template>
<YuumiButton @click="showAlert" style="margin: 0 10px 10px 0;">基本用法</YuumiButton>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    showAlert() {
      this.$yuumi.createAlert({
        title: '基本用法',
        content: '基本用法',
        onClose: () => {
          this.$yuumi.createMessage({ message: 'close', theme: 'info' })
        },
        onCancel: () => {
          this.$yuumi.createMessage({ message: 'cancel', theme: 'warn' })
        },
        onConfirm: () => {
          this.$yuumi.createMessage({ message: 'confirm', theme: 'success' })
        }
      })
    }
  }
}
</script>