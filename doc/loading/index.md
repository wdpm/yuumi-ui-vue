### 局部加载

```vue demo
<template>
  <YuumiTabs v-model="value" v-loading="loading" @change="showLoading">
    <YuumiTabItem label="北京市" value="京">
      <template #label="{ $props }">{{$props.label}}(首都)</template>

      北京市 简称 {{value}}
    </YuumiTabItem>
    <YuumiTabItem label="上海市" value="沪">上海市 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="天津市" value="津">天津市 简称 {{value}}</YuumiTabItem>
    <YuumiTabItem label="重庆市" value="渝">重庆市 简称 {{value}}</YuumiTabItem>
  </YuumiTabs>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      value: "京"
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
```

### 全局加载


```vue demo
<template>
  <YuumiButton @click="showLoading">show global loading</YuumiButton>
</template>

<script>
export default {
  methods: {
    showLoading () {
      const { createLoading, removeLoading } = this.$yuumi
      const vnode = createLoading()

      setTimeout(() => {
        removeLoading(vnode)
      }, 1000)
    }
  }
}
</script>
```

### 自定义loading

```vue demo
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
```