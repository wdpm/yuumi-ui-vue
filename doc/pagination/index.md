## pagination 分页

### 基本用法

```vue demo
<template>
<div style="margin-bottom: 20px;">
  <YuumiPagination :page="page1.page" :page-total="page1.pageTotal" :total="page1.total" align="left"></YuumiPagination>
</div>
<div style="margin-bottom: 20px;">
  <YuumiPagination :page="page2.page" :page-total="page2.pageTotal" :total="page2.total" align="right"></YuumiPagination>
</div>

<div style="margin-bottom: 20px;">
  <YuumiPagination :page="page3.page" :page-total="page3.pageTotal" :total="page3.total"></YuumiPagination>
</div>
</template>

<script>
export default {
  data () {
    return {
      page1: {
        page: 1,
        pageTotal: 2,
        total: 20
      },
      page2: {
        page: "3",
        pageTotal: "20",
        total: 200
      },
      page3: {
        page: "10",
        pageTotal: "20",
        total: 200
      }
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
