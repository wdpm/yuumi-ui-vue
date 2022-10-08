<template>
  <template v-for="theme in ['default', 'primary', 'success', 'warn', 'error']" :key="theme">
    <YuumiButton style="margin: 0 10px 10px 0;"  @click="createMessage(theme)" :theme="theme">{{theme}} message</YuumiButton>
  </template>
</template>

<script>
export default {
  methods: {
    createMessage (theme) {
      this.$yuumi.createMessage({
        message: 'this is a message',
        theme: theme
      })
    }
  }
}
</script>