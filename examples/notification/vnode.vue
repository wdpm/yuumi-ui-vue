<template>
<YuumiButton @click="createNotification">使用VNode</YuumiButton>
</template>

<script>
import { h } from 'vue'
export default {
  methods: {
    createNotification () {
      this.$yuumi.createNotification({
        title: h('span', { style: { color: 'red' } }, 'VNode'),
        message: h('span', {
          style: { color: 'red' }
        }, ['use ' , h('span', {
          style: {backgroundColor: 'green', color: '#fff'}
        }, ['VNode']) ,', you can close it.'])
      })
    }
  }
}
</script>