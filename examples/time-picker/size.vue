<template>
  <YuumiTimePicker style="margin: 0 10px 10px 0;" v-model="value"
    v-for="size in ['xl', 'lg', 'md', 'sm', 'xm']" :key="size"
    :size="size" @change="onChange"
  ></YuumiTimePicker>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    onChange (detail) {
      console.log("onChange", detail)
    }
  }
}
</script>
