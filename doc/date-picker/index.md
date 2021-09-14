### 基本用法

``` vue demo
<template>
  <YuumiDatePicker v-model="value1" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>

  <YuumiDatePicker v-model="value2" type="datetime" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>
</template>

<script>
  export default {
    data () {
      return {
        value1: null,
        value2: null
      }
    },
    methods: {
      log(type, value) {
        console.log(type, value)
      }
    }
  }
</script>
```

### 范围选择

``` vue demo
<template>
  <YuumiDatePicker v-model="value1" type="range" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>

  <YuumiDatePicker v-model="value2" type="rangetime" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>
</template>

<script>
  export default {
    data () {
      return {
        value1: null,
        value2: null
      }
    },
    methods: {
      log(type, value) {
        console.log(type, value)
      }
    }
  }
</script>
```

### 禁用

``` vue demo
<template>
  <YuumiDatePicker v-model="value1" type="range" disabled @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>

  <YuumiDatePicker v-model="value2" type="rangetime" disabled @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>
</template>

<script>
  export default {
    data () {
      return {
        value1: null,
        value2: null
      }
    },
    methods: {
      log(type, value) {
        console.log(type, value)
      }
    }
  }
</script>
```

### 禁用日期

``` vue demo
<template>
  <YuumiDatePicker v-model="value1" :disabled-dates="disabledBeforeDates" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>

  <YuumiDatePicker v-model="value2" type="range" :disabled-dates="disabledAfterDates" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>
</template>

<script>
  export default {
    data () {
      return {
        value1: null,
        value2: null
      }
    },
    methods: {
      log(type, value) {
        console.log(type, value)
      },
      disabledBeforeDates (value) {
        return value.getTime() < Date.now()
      },
      disabledAfterDates (value) {
        return value.getTime() > Date.now()
      }
    }
  }
</script>
```

### 一键清除

``` vue demo
<template>
  <YuumiDatePicker v-model="value1" clearable @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>
  <YuumiDatePicker v-model="value2" type="range" clearable @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>
</template>

<script>
  export default {
    data () {
      return {
        value1: null,
        value2: null
      }
    },
    methods: {
      log(type, value) {
        console.log(type, value)
      }
    }
  }
</script>
```

### 最大范围天数

``` vue demo
<template>
  <YuumiDatePicker v-model="value" type="range" :maxdays="7" @change="log('change', $event)" style="margin: 0 10px 10px 0;"></YuumiDatePicker>
</template>

<script>
  export default {
    data () {
      return {
        value: null
      }
    },
    methods: {
      log(type, value) {
        console.log(type, value)
      }
    }
  }
</script>
```

