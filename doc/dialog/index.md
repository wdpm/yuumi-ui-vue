### 基本用法

```vue demo
<template>
<YuumiButton @click="showDialog">show dialog</YuumiButton>
<YuumiDialog title="dialog title" v-model="show" @close="onclose" @cancel="oncancel" @confirm="onconfirm">
  <YuumiIcon icon="line-help" style="vertical-align: middle;" ></YuumiIcon>
  <span>基本用法</span>
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
    },
    onclose () {
      console.log('on close')
    },
    oncancel () {
      console.log('on cancel')
    },
    onconfirm () {
      console.log('on confirm')
    }
  }
}
</script>
```

### 部分显示

```vue demo
<template>
<YuumiButton @click="showDialog({closeEnable: false})" style="margin: 0 10px 10px 0;">不显示关闭</YuumiButton>
<YuumiButton @click="showDialog({cancelEnable: false})" style="margin: 0 10px 10px 0;">不显示取消</YuumiButton>
<YuumiButton @click="showDialog({confirmEnable: false})" style="margin: 0 10px 10px 0;">不显示确认</YuumiButton>
<YuumiButton @click="showDialog({cancelEnable: false, confirmEnable: false})" style="margin: 0 10px 10px 0;">不显示取消和确认</YuumiButton>

<YuumiDialog title="dialog title" v-model="show" v-bind="enable">
  <YuumiIcon icon="line-help" style="vertical-align: middle;" ></YuumiIcon>
  <span>部分显示</span>
</YuumiDialog>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      enable: null
    }
  },
  methods: {
    showDialog (options) {
      this.enable = options
      this.show = true
    }
  }
}
</script>
```

### 自定义按钮文字

```vue demo
<template>
<YuumiButton @click="showDialog">自定义按钮文字</YuumiButton>
<YuumiDialog title="dialog title" v-model="show" cancel-text="撤销" confirm-text="保存">
  <YuumiIcon icon="line-help" style="vertical-align: middle;" ></YuumiIcon>
  <span>自定义按钮文字</span>
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
```

### 异步操作

```vue demo
<template>
<YuumiButton @click="showDialog">异步操作</YuumiButton>
<YuumiDialog title="dialog title" v-model="show" :sync="false" @close="onclose" @cancel="oncancel" @confirm="onconfirm">
  <YuumiIcon icon="line-help" style="vertical-align: middle;" ></YuumiIcon>
  <span>异步操作</span>
</YuumiDialog>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      timeout: 0
    }
  },
  methods: {
    showDialog () {
      this.show = true
    },
    hideDialog () {
      if (this.timeout) clearTimeout(this.timeout)

      this.$yuumi.createMessage({ message: '3s后关闭', theme: 'warn' })

      this.timeout = setTimeout(() => {
        this.show = false
      }, 3000)
    },
    onclose () {
      console.log('on close')
      this.hideDialog()
    },
    oncancel () {
      console.log('on cancel')
      this.hideDialog()
    },
    onconfirm () {
      console.log('on confirm'),
      this.hideDialog()
    }
  }
}
</script>
```

### 事件监听

`close`、`cancel`、`confirm`、`beforeEnter`、`afterEnter`、`beforeLeave`、`afterLeave`

```vue demo
<template>
<YuumiButton @click="showDialog">事件监听</YuumiButton>

<YuumiDialog title="dialog title" v-model="show"
  @close="onEvent($event, 'close')"
  @cancel="onEvent($event, 'cancel')"
  @confirm="onEvent($event, 'confirm')"
  @beforeEnter="onEvent($event, 'beforeEnter')"
  @afterEnter="onEvent($event, 'afterEnter')"
  @beforeLeave="onEvent($event, 'beforeLeave')"
  @afterLeave="onEvent($event, 'afterLeave')"
>
  <YuumiIcon icon="line-help" style="vertical-align: middle;" ></YuumiIcon>
  <span>事件监听</span>
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
    },
    onEvent (e, type) {
      console.log(`on ${type} event.`, e)
    }
  }
}
</script>
```

### 阻止穿透

`close`、`cancel`、`confirm`、`beforeEnter`、`afterEnter`、`beforeLeave`、`afterLeave`

```vue demo
<template>
<YuumiButton @click="showDialog">阻止穿透</YuumiButton>

<YuumiDialog title="dialog title" v-model="show" :stopPenetrate="true">
  <YuumiIcon icon="line-help" style="vertical-align: middle;" ></YuumiIcon>
  <span>阻止穿透</span>
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
```

### 自定义标题VNode

```vue demo
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
```