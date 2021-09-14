### 基本用法

```vue demo
<template>
  <template v-for="theme in ['default', 'primary', 'success', 'warn', 'error']" :key="theme">
    <YuumiButton style="margin: 0 10px 10px 0;"  @click="createMessage(theme)" :theme="theme">{{theme}} message</YuumiButton>
  </template>
</template>

<script>
export default {
  methods: {
    createMessage (theme) {
      this.$yuumi.createMessage({
        message: 'this is a message',
        theme: theme
      })
    }
  }
}
</script>
```

### 非自动关闭

```vue demo
<template>
<YuumiButton @click="createMessage">show message</YuumiButton>
<YuumiButton @click="removeMessage(vnode)">hide message</YuumiButton>
</template>

<script>
export default {
  data () {
    return {
      vnode: null
    }
  },
  beforeUnmount () {
    this.$yuumi.removeAllMessage()
  },
  methods: {
    createMessage () {
      const vnode = this.vnode
      if (vnode) {
        this.removeMessage(vnode)
      }

      this.vnode = this.$yuumi.createMessage({
        message: 'this is a message, you can close it.',
        duration: 0
      })
    },

    removeMessage (vnode) {
      this.$yuumi.removeMessage(vnode)
    }
  }
}
</script>
```

### 使用VNode

```vue demo
<template>
<YuumiButton @click="createMessage">使用VNode</YuumiButton>
</template>

<script>
import { h } from 'vue'
export default {
  data () {
    return {
      vnode: null
    }
  },
  methods: {
    createMessage () {
      this.vnode = this.$yuumi.createMessage({
        message: h('span', {
          style: {
            color: 'red'
          }
        }, ['this is a ' , h('span', {
          style: {backgroundColor: 'green', color: '#fff'}
        }, ['message']) ,', you can close it.'])
      })
    }
  }
}
</script>
```

### 自定义图标

```vue demo
<template>
<YuumiButton @click="createMessage">自定义图标</YuumiButton>
</template>

<script>
import { h, defineComponent } from 'vue'
import { YuumiIcon } from '../../packages'

export default {
  components: {
    YuumiIcon
  },
  data () {
    return {
      vnode: null
    }
  },
  methods: {
    createMessage () {
      this.vnode = this.$yuumi.createMessage({
        message: "custom icon",
        icon: h(YuumiIcon, {
          icon: 'line-shield-info'
        })
      })
    }
  }
}
</script>
```