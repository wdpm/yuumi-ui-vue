<template>
  <YuumiTimePicker v-model="value" format="h:m" style="margin: 0 10px 10px 0;" clearable></YuumiTimePicker>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  }
}
</script>
