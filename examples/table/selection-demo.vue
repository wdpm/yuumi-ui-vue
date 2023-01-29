<template>
<div style="height: 320px; margin: 0 0 10px;">
  <YuumiTable :data="students" summary ref="table"
    @select="logSelectionEventDetail($event, 'select')"
    @selectAll="logSelectionEventDetail($event, 'selectAll')"
    @selectionChange="logSelectionEventDetail($event, 'selectionChange')"
  >
    <YuumiTableColumn :width="45" type="selection" fixed="left"/>
    <YuumiTableColumn title="姓名" prop="name" fixed="left"/>
    <YuumiTableColumn :width="150" title="语文" prop="chinese" />
    <YuumiTableColumn :width="150" title="数学" prop="math"/>
    <YuumiTableColumn :width="150" title="英语" prop="english"/>
    <YuumiTableColumn :width="150" title="物理" prop="physics"/>
    <YuumiTableColumn :width="150" title="化学" prop="chemistry"/>
    <YuumiTableColumn :width="150" title="生物" prop="biology"/>
    <YuumiTableColumn :width="150" title="总分" prop="summary" fixed="right" align="center"/>
  </YuumiTable>
</div>

<div>
  <YuumiButton @click="toggleRowsSelected(true)" style="margin: 0 10px 10px 0;">设置第二和第三行选中</YuumiButton>
  <YuumiButton @click="toggleRowsSelected(false)" style="margin: 0 10px 10px 0;">取消第二和第三行选中</YuumiButton>
  <YuumiButton @click="getSelections" style="margin: 0 10px 10px 0;">获取选中的行</YuumiButton>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  data() {
    return {
      students: [
        { name: '张三', chinese: 110, math: 145,  english: 136, physics: 108, chemistry: 97, biology: 72 },
        { name: '李四', chinese: 114, math: 125,  english: 132, physics: 101, chemistry: 94, biology: 76 },
        { name: '王五', chinese: 105, math: 132,  english: 124, physics: 90, chemistry: 87, biology: 78 },
        { name: '小丽', chinese: 96, math: 115,  english: 106, physics: 98, chemistry: 91, biology: 70 },
        { name: '小红', chinese: 112, math: 135,  english: 113, physics: 98, chemistry: 87, biology: 76 },
        { name: '小明', chinese: 105, math: 125,  english: 124, physics: 101, chemistry: 77, biology: 73 },
        { name: '李明', chinese: 102, math: 135,  english: 118, physics: 99, chemistry: 67, biology: 72 },
        { name: '韩梅', chinese: 100, math: 105,  english: 109, physics: 100, chemistry: 93, biology: 78 },
      ].map((item: {[key: string]: string|number}) => {
        item.summary = (Object.values(item).filter(value => typeof value === 'number') as number[]).reduce((acc, value) => acc + value, 0)
        return item
      })
    }
  },
  methods: {
    getAverages ({ data, columns }: any) {
      const sum = Array(columns.length).fill(0)

      data.forEach((row: any) => {
        columns.forEach((column: any, index: number) => {
          if (index == 0) sum[index] = '平均分'

          if (typeof sum[index] !== 'number') return

          const itemValue = Number(row[column.props.prop])
          if (itemValue.toString() === 'NaN') {
            sum[index] = 'N/A'
            return
          }

          sum[index] += itemValue
        })
      })

      return sum.map(item => {
        if (typeof item !== 'number') return item
        return (item / data.length).toFixed(2)
      })
    },

    toggleRowsSelected (value: boolean) {
      (this.$refs.table as any).toggleRowsSelection(this.students.slice(1,3), value)
    },

    getSelections () {
      const selections = (this.$refs.table as any).selections
      console.log(selections)
    },
    logSelectionEventDetail (...args: any[]) {
      console.log(args)
    }
  }
})
</script>

<style lang="scss" scoped>
</style>