<template>
<YuumiButton style="margin: 0 10px 10px 0;" @click="createNotification">show notification</YuumiButton>
<YuumiButton @click="removeNotification(vnode)">hide notification</YuumiButton>
</template>

<script>
export default {
  data () {
    return {
      vnodes: []
    }
  },
  beforeUnmount () {
    this.$yuumi.removeAllNotification()
  },
  methods: {
    createNotification () {
      this.vnodes.push(this.$yuumi.createNotification({
        title: '非自动关闭',
        message: '非自动关闭' + this.vnodes.length,
        duration: 0
      }))
    },

    removeNotification (vnode) {
      this.$yuumi.removeNotification(this.vnodes.shift())
    }
  }
}
</script>