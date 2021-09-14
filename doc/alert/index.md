### 基本用法

```vue demo
<template>
<YuumiButton @click="showAlert" style="margin: 0 10px 10px 0;">基本用法</YuumiButton>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    showAlert() {
      this.$yuumi.createAlert({
        title: '基本用法',
        content: '基本用法',
        onClose: () => {
          this.$yuumi.createMessage({ message: 'close', theme: 'info' })
        },
        onCancel: () => {
          this.$yuumi.createMessage({ message: 'cancel', theme: 'warn' })
        },
        onConfirm: () => {
          this.$yuumi.createMessage({ message: 'confirm', theme: 'success' })
        }
      })
    }
  }
}
</script>
```

### 部分显示

```vue demo
<template>
<YuumiButton @click="showAlert({closeEnable: false})" style="margin: 0 10px 10px 0;">不显示关闭</YuumiButton>
<YuumiButton @click="showAlert({cancelEnable: false})" style="margin: 0 10px 10px 0;">不显示取消</YuumiButton>
<YuumiButton @click="showAlert({confirmEnable: false})" style="margin: 0 10px 10px 0;">不显示确认</YuumiButton>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    showAlert(options) {
      this.$yuumi.createAlert({
        ...options,
        title: '部分显示',
        content: '部分显示'
      })
    }
  }
}
</script>
```

### 自定义显示

```vue demo
<template>
<YuumiButton @click="showAlert()" style="margin: 0 10px 10px 0;">自定义显示</YuumiButton>
</template>

<script>
import { createVNode } from 'vue'
export default {
  data () {
    return {}
  },
  methods: {
    showAlert() {
      this.$yuumi.createAlert({
        title: createVNode('span', {style: {color: 'red'}}, '自定义标题'),
        content: createVNode('span', {style: {color: 'green'}}, '自定义内容'),
        concanText: '撤销',
        confirmText: '保存',
      })
    }
  }
}
</script>
```

### 阻止穿透

```vue demo
<template>
<YuumiButton @click="showAlert()" style="margin: 0 10px 10px 0;">阻止穿透</YuumiButton>
</template>

<script>
import { createVNode } from 'vue'
export default {
  data () {
    return {}
  },
  methods: {
    showAlert() {
      this.$yuumi.createAlert({
        stopPenetrate: true,
        title: '阻止穿透',
        content: '阻止穿透'
      })
    }
  }
}
</script>
```

### 居中显示

```vue demo
<template>
<YuumiButton @click="showAlert()" style="margin: 0 10px 10px 0;">居中显示</YuumiButton>
</template>

<script>
import { createVNode } from 'vue'
export default {
  data () {
    return {}
  },
  methods: {
    showAlert() {
      this.$yuumi.createAlert({
        alignCenter: true,
        title: '居中显示',
        content: '居中显示'
      })
    }
  }
}
</script>
```