### 基本用法

position 可选值为 `top`、 `right`、 `bottom`、 `left`， 默认值 `right`。

```vue demo
<template>
  <template v-for="item in ['right', 'left', 'top', 'bottom']" :key="item">
    <YuumiButton @click="showDrawer(item)" style="margin: 0 10px 10px 0;">{{item}}</YuumiButton>
  </template>

  <YuumiDrawer :position="position" v-model="show">{{position}}</YuumiDrawer>
</template>

<script>
export default {
  data () {
    return {
      position: 'right',
      show: false
    }
  },
  methods: {
    showDrawer (position) {
      this.position = position
      this.show = true
    }
  }
}
</script>
```

### 事件

`before-open`, `after-open`, `before-close`, `after-close`。

```vue demo
<template>
  <YuumiButton @click="showDrawer()">默认(right)</YuumiButton>

  <YuumiDrawer v-model="show"
    @before-open="eventLog($event, 'before-open')"
    @after-open="eventLog($event, 'after-open')"
    @before-close="eventLog($event, 'before-close')"
    @after-close="eventLog($event, 'after-close')"
  >events</YuumiDrawer>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    showDrawer () {
      this.show = true
    },
    eventLog (el, type) {
      console.log(type, el)
    }
  }
}
</script>
```