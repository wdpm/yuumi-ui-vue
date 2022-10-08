<template>
<YuumiButton @click="showAlert()" style="margin: 0 10px 10px 0;">居中显示</YuumiButton>
</template>

<script>
import { createVNode } from 'vue'
export default {
  data () {
    return {}
  },
  methods: {
    showAlert() {
      this.$yuumi.createAlert({
        alignCenter: true,
        title: '居中显示',
        content: '居中显示'
      })
    }
  }
}
</script>