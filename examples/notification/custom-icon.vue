<template>
<YuumiButton @click="createNotification">自定义图标</YuumiButton>
</template>

<script>
import { h, defineComponent } from 'vue'
import { YuumiIcon } from '../../packages'

export default {
  components: {
    YuumiIcon
  },
  methods: {
    createNotification () {
      this.$yuumi.createNotification({
        title: "自定义图标",
        message: "自定义图标",
        icon: h(YuumiIcon, {
          icon: 'flat-shield-correct'
        }),
        theme: 'success'
      })
    }
  }
}
</script>