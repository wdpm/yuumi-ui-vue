<template>
<div>
  <YuumiButton @click="toggleMain" style="margin: 0 10px 10px 0;">是否只显示主科</YuumiButton>
  <YuumiButton @click="toggleSummary" style="margin: 0 10px 10px 0;">是否显示总计</YuumiButton>
</div>
<div style="height: 530px; ">
  <YuumiTable :data="studentScore" border summary :summary-method="getAverages">
    <YuumiTableColumn title="姓名" prop="name" fixed="left"/>
    <YuumiTableColumn :width="150" title="语文" prop="chinese"></YuumiTableColumn>
    <YuumiTableColumn :width="150" title="数学" prop="math"></YuumiTableColumn>
    <YuumiTableColumn :width="150" title="英语" prop="english"></YuumiTableColumn>

    <template v-if="!onlyShowMain">
      <YuumiTableColumn :width="150" title="物理" prop="physics"></YuumiTableColumn>
      <YuumiTableColumn :width="150" title="化学" prop="chemistry"></YuumiTableColumn>
      <YuumiTableColumn :width="150" title="生物" prop="biology"></YuumiTableColumn>
    </template>

    <template v-if="showSummary">
      <YuumiTableColumn :width="150" title="总分" prop="summary" fixed="right" align="center">
        <template #header="{$props}">
          <span>{{$props.title}}(班级)</span>
        </template>

        <template #default="{$props, $attrs, $value}">
          {{students[$attrs.rowIndex][$props.prop]}}
          <YuumiIcon icon="flat-like" v-if="$value > 640" style="color: green;"></YuumiIcon>
        </template>

        <template #footer="{$value}">
          <span>{{$value}}</span>(班级)
        </template>
      </YuumiTableColumn>
    </template>
  </YuumiTable>
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
        { name: '韩梅', chinese: 100, math: 105,  english: 109, physics: 100, chemistry: 93, biology: 78 }
      ],
      onlyShowMain: false,
      showSummary: true
    }
  },
  computed: {
    studentScore (): any[] {
      return this.students.map((item: {[key: string]: string|number}) => {
        const projects = Object.entries(item).filter(([key, value]) => typeof value === 'number') as [string, number][]
        item.summary = projects.reduce((acc, [key, value]) => {
          if (this.onlyShowMain) {
            return /chinese|math|english/.test(key) ? acc + value : acc
          } else {
            return /summary/.test(key) ? acc : acc + value
          }
        }, 0)

        return item
      })
    }
  },
  methods: {
    toggleMain () {
      this.onlyShowMain = !this.onlyShowMain
    },
    toggleSummary () {
      this.showSummary = !this.showSummary
    },
    getAverages ({ data, columns }: any) {
      const sum: (number|string)[] = Array(columns.length).fill(0)

      data.forEach((row: any) => {
        columns.forEach((column: any, index: number) => {
          if (index == 0) sum[index] = '平均分'

          if (typeof sum[index] !== 'number') return

          const itemValue = Number(row[column.props.prop])

          if (itemValue.toString() === 'NaN') {
            sum[index] = ''
            return
          }

          (sum[index] as number) += itemValue
        })
      })

      return sum.map(item => {
        if (typeof item !== 'number') return item
        return (item / data.length).toFixed(2)
      })
    }
  }
})
</script>

<style lang="scss" scoped>
</style>