<template>
<YuumiButton @click="showDialog">自定义标题VNode</YuumiButton>

<YuumiDialog v-model="show">
  <template v-slot:title>
    <YuumiIcon icon="line-help" style="vertical-align: middle; margin-right: 5px;" ></YuumiIcon>
    <span style="color: red;">自定义标题VNode</span>
  </template>
</YuumiDialog>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    showDialog () {
      this.show = true
    }
  }
}
</script>