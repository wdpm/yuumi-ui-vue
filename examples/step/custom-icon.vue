<template>
  <YuumiStep :active="1">
    <YuumiStepItem title="设置账号" icon="edit">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="设置密码" icon="line-key">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="完成" :icon="completedIcon">这里描述信息</YuumiStepItem>
  </YuumiStep>
</template>

<script>
import { h } from 'vue'
import { YuumiIcon } from '../../packages'

export default {
  computed: {
    completedIcon () {
      return h('YuumiIcon', { icon: 'line-shield-correct' })
    }
  }
}
</script>