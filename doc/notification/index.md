### 基本用法

```vue demo
<template>
  <template v-for="theme in ['default', 'primary', 'success', 'warn', 'error']" :key="theme">
    <YuumiButton style="margin: 0 10px 10px 0;" :theme="theme" @click="createNotification(theme)">{{theme}} notification</YuumiButton>
  </template>
</template>

<script>
export default {
  methods: {
    createNotification (theme) {
      this.$yuumi.createNotification({
        title: '基本用法',
        message: '基本用法',
        theme: theme
      })
    }
  }
}
</script>
```

### 非自动关闭

默认 `3s` 后自动关闭

```vue demo
<template>
<YuumiButton style="margin: 0 10px 10px 0;" @click="createNotification">show notification</YuumiButton>
<YuumiButton @click="removeNotification(vnode)">hide notification</YuumiButton>
</template>

<script>
export default {
  data () {
    return {
      vnodes: []
    }
  },
  beforeUnmount () {
    this.$yuumi.removeAllNotification()
  },
  methods: {
    createNotification () {
      this.vnodes.push(this.$yuumi.createNotification({
        title: '非自动关闭',
        message: '非自动关闭' + this.vnodes.length,
        duration: 0
      }))
    },

    removeNotification (vnode) {
      this.$yuumi.removeNotification(this.vnodes.shift())
    }
  }
}
</script>
```

### 选择位置

```vue demo
<template>
<div>
  <YuumiButton @click="createNotification('tl')" style="margin: 0 10px 10px 0;">top left</YuumiButton>
  <YuumiButton @click="createNotification('tr')" style="margin: 0 10px 10px 0;">top right</YuumiButton>
</div>
<div>
  <YuumiButton @click="createNotification('bl')" style="margin: 0 10px 10px 0;">bottom left</YuumiButton>
  <YuumiButton @click="createNotification('br')" style="margin: 0 10px 10px 0;">bottom right</YuumiButton>
</div>
</template>

<script>
import { h } from 'vue'
export default {
  methods: {
    createNotification (direction) {
      this.$yuumi.createNotification({
        direction,
        title: '选择位置',
        message: '选择位置'
      })
    }
  }
}
</script>
```

### 使用VNode

```vue demo
<template>
<YuumiButton @click="createNotification">使用VNode</YuumiButton>
</template>

<script>
import { h } from 'vue'
export default {
  methods: {
    createNotification () {
      this.$yuumi.createNotification({
        title: h('span', { style: { color: 'red' } }, 'VNode'),
        message: h('span', {
          style: { color: 'red' }
        }, ['use ' , h('span', {
          style: {backgroundColor: 'green', color: '#fff'}
        }, ['VNode']) ,', you can close it.'])
      })
    }
  }
}
</script>
```

### 自定义图标

```vue demo
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
```