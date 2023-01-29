<template>
<YuumiButton @click="showAlert()" style="margin: 0 10px 10px 0;">阻止穿透</YuumiButton>
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
        stopPenetrate: true,
        title: '阻止穿透',
        content: '阻止穿透'
      })
    }
  }
}
</script>