<template>
<YuumiTable :data="students" :row-class-name="rowClassName" :cell-class-name="cellClassName">
  <YuumiTableColumn title="姓名" prop="name"/>
  <YuumiTableColumn :width="150" title="语文" prop="chinese" />
  <YuumiTableColumn :width="150" title="数学" prop="math"/>
  <YuumiTableColumn :width="150" title="英语" prop="english"/>
</YuumiTable>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      students: [
        { name: '张三',  chinese: 10, math: 80,  english: 90 },
        { name: '李四', chinese: 86, math: 70,  english: 92 },
        { name: '王五', chinese: 96, math: 90,  english: 80 },
        { name: '小丽', chinese: 83, math: 89,  english: 92 },
        { name: '小红', chinese: 79, math: 99,  english: 100 },
        { name: '小明', chinese: 88, math: 80,  english: 95}
      ]
    }
  },
  methods: {
    rowClassName ({ rowIndex }: any) {
      console.log(rowIndex)
      switch (rowIndex % 4) {
        case 0:
          return '__success'
        case 1:
          return '__warn'
        case 2:
          return '__error'
        case 3:
          return '__info'
      }
    },
    cellClassName ({ col, colIndex, row, rowIndex}: any) {
      switch ((rowIndex + colIndex) % 4) {
        case 0:
          return '__success'
        case 1:
          return '__warn'
        case 2:
          return '__error'
        case 3:
          return '__info'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.yuumi-table :deep() table {
  tr.__success td {
    background-color: rgba(#00b450, 0.15);
  }

  tr.__warn td {
    background-color: rgba(#ffc107, 0.15);
  }

  tr.__error td {
    background-color: rgba(#dc3545, 0.15);
  }

  tr.__info td {
    background-color: rgba(#0d6efd, 0.15);
  }

  td.__success {
    color: rgba(#00b450, 1);
  }

  td.__warn {
    color: rgba(#ffc107, 1);
  }

  td.__error {
    color: rgba(#dc3545, 1);
  }

  td.__info {
    color: rgba(#0d6efd, 1);
  }
}
</style>