<template>
  <YuumiTimePicker v-model="value" @change="onChange" range style="margin: 0 10px 10px 0;"></YuumiTimePicker>
  <YuumiTimePicker v-model="value1" @change="onChange" range style="margin: 0 10px 10px 0;"></YuumiTimePicker>
</template>

<script>
export default {
  data () {
    return {
      value: [new Date('Thu Sep 09 2021 17:05:04 GMT+0800 (中国标准时间)'), new Date('Thu Sep 09 2021 18:05:04 GMT+0800 (中国标准时间)')],
      value1: null
    }
  },
  methods: {
    onChange (detail) {
      console.log("onChange", detail)
    }
  }
}
</script>
