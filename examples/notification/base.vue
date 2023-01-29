<template>
  <template v-for="theme in ['default', 'primary', 'success', 'warn', 'error']" :key="theme">
    <YuumiButton style="margin: 0 10px 10px 0;" :theme="theme" @click="createNotification(theme)">{{theme}} notification</YuumiButton>
  </template>
</template>

<script>
export default {
  methods: {
    createNotification (theme) {
      this.$yuumi.createNotification({
        title: '基本用法',
        message: '基本用法',
        theme: theme
      })
    }
  }
}
</script>