### 基本用法
```vue demo
<template>
  <YuumiTimePicker v-model="value" @change="onChange" style="margin: 0 10px 10px 0;"></YuumiTimePicker>
  <YuumiTimePicker v-model="value1" @change="onChange" style="margin: 0 10px 10px 0;"></YuumiTimePicker>
</template>

<script>
export default {
  data () {
    return {
      value: new Date('Thu Sep 09 2021 17:05:04 GMT+0800 (中国标准时间)'),
      value1: null
    }
  },
  methods: {
    onChange (detail) {
      console.log("onChange", detail)
    }
  }
}
</script>
```

### 范围选择
```vue demo
<template>
  <YuumiTimePicker v-model="value" @change="onChange" range style="margin: 0 10px 10px 0;"></YuumiTimePicker>
  <YuumiTimePicker v-model="value1" @change="onChange" range style="margin: 0 10px 10px 0;"></YuumiTimePicker>
</template>

<script>
export default {
  data () {
    return {
      value: [new Date('Thu Sep 09 2021 17:05:04 GMT+0800 (中国标准时间)'), new Date('Thu Sep 09 2021 18:05:04 GMT+0800 (中国标准时间)')],
      value1: null
    }
  },
  methods: {
    onChange (detail) {
      console.log("onChange", detail)
    }
  }
}
</script>
```

### 设置大小

可选值为：`xl`、 `lg`、 `md`、 `sm`、 `xm`， 默认值 `md`。

```vue demo
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
```

### 禁用

``` vue demo
<template>
  <YuumiTimePicker disabled style="margin: 0 10px 10px 0;"></YuumiTimePicker>
  <YuumiTimePicker disabled v-model="value" style="margin: 0 10px 10px 0;"></YuumiTimePicker>

  <YuumiTimePicker v-model="value1" :disabled-hours="disabledHours" style="margin: 0 10px 10px 0;"></YuumiTimePicker>
  <YuumiTimePicker v-model="value2" :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes" style="margin: 0 10px 10px 0;"></YuumiTimePicker>
  <YuumiTimePicker v-model="value3" :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes" :disabled-seconds="disabledSeconds" style="margin: 0 10px 10px 0;"></YuumiTimePicker>
</template>

<script>
export default {
  data () {
    return {
      value: new Date(2021, 8, 10, 0, 0, 0),
      value1: new Date(2021, 8, 10, 0, 0, 0),
      value2: new Date(2021, 8, 10, 0, 0, 0),
      value3: new Date(2021, 8, 10, 0, 0, 0),
    }
  },
  methods: {
    disabledHours () {
      return [0, 1, 2, 3, 4, 5]
    },
    disabledMinutes ({hours}) {
      if (hours === 6) return [0, 1, 2, 3, 4, 5]
      return [58, 59]
    },
    disabledSeconds ({minutes}) {
      if (minutes === 6) return [0, 1, 2, 3, 4, 5]
      return [58, 59]
    }
  }
}
</script>
```

### 可清除

``` vue demo
<template>
  <YuumiTimePicker v-model="value1" style="margin: 0 10px 10px 0;" clearable></YuumiTimePicker>
  <YuumiTimePicker v-model="value2" style="margin: 0 10px 10px 0;" clearable range></YuumiTimePicker>
</template>

<script>
export default {
  data () {
    return {
      value1: null,
      value2: null,
    }
  }
}
</script>
```

### 其他格式

``` vue demo
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
```