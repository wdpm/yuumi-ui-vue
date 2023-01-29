<template>
<YuumiButton @click="createMessage">使用VNode</YuumiButton>
</template>

<script>
import { h } from 'vue'
export default {
  data () {
    return {
      vnode: null
    }
  },
  methods: {
    createMessage () {
      this.vnode = this.$yuumi.createMessage({
        message: h('span', {
          style: {
            color: 'red'
          }
        }, ['this is a ' , h('span', {
          style: {backgroundColor: 'green', color: '#fff'}
        }, ['message']) ,', you can close it.'])
      })
    }
  }
}
</script>