<template>
<YuumiButton @click="createMessage">show message</YuumiButton>
<YuumiButton @click="removeMessage(vnode)">hide message</YuumiButton>
</template>

<script>
export default {
  data () {
    return {
      vnode: null
    }
  },
  beforeUnmount () {
    this.$yuumi.removeAllMessage()
  },
  methods: {
    createMessage () {
      const vnode = this.vnode
      if (vnode) {
        this.removeMessage(vnode)
      }

      this.vnode = this.$yuumi.createMessage({
        message: 'this is a message, you can close it.',
        duration: 0
      })
    },

    removeMessage (vnode) {
      this.$yuumi.removeMessage(vnode)
    }
  }
}
</script>