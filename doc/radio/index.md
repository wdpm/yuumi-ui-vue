## radio 单选框

### 基本用法

```vue demo
<template>
  <YuumiRadio v-model="value" unique="香蕉" style="margin: 0 10px 10px 0;" @change="consoleLog">香蕉</YuumiRadio>
  <YuumiRadio v-model="value" unique="苹果" style="margin: 0 10px 10px 0;" @change="consoleLog">苹果</YuumiRadio>
  <div>当前选择的为：{{value}}</div>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
```

### 设置大小

可选值为：`xl`、 `lg`、 `md`、 `sm`、 `xm`， 默认值 `md`。

```vue demo
<template>
  <YuumiRadio v-model="value" size="xl" unique="香蕉" style="margin: 0 10px 10px 0;" @change="consoleLog">香蕉</YuumiRadio>
  <YuumiRadio v-model="value" size="lg" unique="苹果" style="margin: 0 10px 10px 0;" @change="consoleLog">苹果</YuumiRadio>
  <YuumiRadio v-model="value" size="md" unique="梨" style="margin: 0 10px 10px 0;" @change="consoleLog">梨</YuumiRadio>
  <YuumiRadio v-model="value" size="sm" unique="橘子" style="margin: 0 10px 10px 0;" @change="consoleLog">橘子</YuumiRadio>
  <YuumiRadio v-model="value" size="xm" unique="柚子" style="margin: 0 10px 10px 0;" @change="consoleLog">柚子</YuumiRadio>
  <div>当前选择的为：{{value}}</div>
</template>
<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
```

### 禁用

```vue demo
<template>
  <YuumiRadio v-model="value" disabled unique="香蕉" style="margin: 0 10px 10px 0;" @change="consoleLog">香蕉</YuumiRadio>
  <YuumiRadio v-model="value" disabled unique="苹果" style="margin: 0 10px 10px 0;" @change="consoleLog">苹果</YuumiRadio>
  <YuumiRadio v-model="value" disabled unique="梨" style="margin: 0 10px 10px 0;" @change="consoleLog">梨</YuumiRadio>
  <YuumiRadio v-model="value" disabled unique="橘子" style="margin: 0 10px 10px 0;" @change="consoleLog">橘子</YuumiRadio>
  <YuumiRadio v-model="value" disabled unique="柚子" style="margin: 0 10px 10px 0;" @change="consoleLog">柚子</YuumiRadio>
  <div>当前选择的为：{{value}}</div>
</template>
<script>
export default {
  data () {
    return {
      value: '苹果'
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
```

### 更改图标

```vue demo
<template>
  <YuumiRadio v-model="value" :unique="false" style="margin: 0 10px 10px 0;" :checked-icon="{ icon: 'line-unlock' }" :unchecked-icon="{ icon: 'line-unlock' }" @change="consoleLog">不锁定</YuumiRadio>
  <YuumiRadio v-model="value" :unique="true" style="margin: 0 10px 10px 0;" :checked-icon="{ icon: 'flat-lock' }" :unchecked-icon="{ icon: 'flat-lock' }"  @change="consoleLog">锁定</YuumiRadio>
  <div>当前选择的为：{{value}}</div>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
```


## radio-group 单选组

### 基本用法

```vue demo
<template>
  <YuumiRadioGroup v-model="value" @change="consoleLog">
    <YuumiRadio unique="香蕉" style="margin: 0 10px 10px 0;">香蕉</YuumiRadio>
    <YuumiRadio unique="苹果" style="margin: 0 10px 10px 0;">苹果</YuumiRadio>
  </YuumiRadioGroup>
  <div>当前选择的为：{{value}}</div>
</template>

<script>
export default {
  data () {
    return {
      value: null
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
```

### 禁用

```vue demo
<template>
  <YuumiRadioGroup v-model="value" @change="consoleLog" disabled>
    <YuumiRadio unique="香蕉" style="margin: 0 10px 10px 0;">香蕉</YuumiRadio>
    <YuumiRadio unique="苹果" style="margin: 0 10px 10px 0;">苹果</YuumiRadio>
  </YuumiRadioGroup>
  <div>当前选择的为：{{value}}</div>
</template>

<script>
export default {
  data () {
    return {
      value: '香蕉'
    }
  },
  methods: {
    consoleLog (value) {
      console.log(value)
    }
  }
}
</script>
```