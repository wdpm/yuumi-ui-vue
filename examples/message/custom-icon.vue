<template>
<YuumiButton @click="createMessage">自定义图标</YuumiButton>
</template>

<script>
import { h, defineComponent } from 'vue'
import { YuumiIcon } from '../../packages'

export default {
  components: {
    YuumiIcon
  },
  data () {
    return {
      vnode: null
    }
  },
  methods: {
    createMessage () {
      this.vnode = this.$yuumi.createMessage({
        message: "custom icon",
        icon: h(YuumiIcon, {
          icon: 'line-shield-info'
        })
      })
    }
  }
}
</script>