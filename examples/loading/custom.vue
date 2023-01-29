<template>
  <YuumiTabs v-model="spinner" v-loading="loadingData" @change="showLoading">
    <YuumiTabItem label="圆环" value="circle">{{loadingData}}</YuumiTabItem>
    <YuumiTabItem label="方块" value="rect">{{loadingData}}</YuumiTabItem>
    <YuumiTabItem label="自定义" value="custom">{{loadingData}}</YuumiTabItem>
  </YuumiTabs>
</template>

<script>
import { h, withDirectives, resolveDirective } from 'vue'

export default {
  data () {
    return {
      spinner: "circle",
      loading: false
    }
  },
  computed: {
    loadingData () {
      let spinner = this.spinner

      if (spinner === 'custom') {
        spinner = h('svg', {
          width: '48px',
          height: '48px' ,
          viewBox: '0 0 100 100',
          innerHTML: `<path fill="none" stroke="#e90c59" stroke-width="8" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.8);transform-origin:50px 50px"><animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"/></path>`
        })
      }

      return {
        value : this.loading,
        spinner: spinner
      }
    }
  },
  mounted () {
    this.showLoading()
  },
  methods: {
    showLoading () {
      this.loading = true

      setTimeout(() => {
        this.loading = false
      }, 400)
    }
  }
}
</script>