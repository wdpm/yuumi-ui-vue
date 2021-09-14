<template>
<div style="height: 320px; margin: 0 0 40px;">
  <YuumiTable :data="students">
    <YuumiTableColumn title="姓名" prop="name" fixed="left"/>
    <YuumiTableColumn :width="120" title="语文" prop="chinese" />
    <YuumiTableColumn :width="120" title="数学" prop="math"/>
    <YuumiTableColumn :width="120" title="英语" prop="english"/>
    <YuumiTableColumn :width="120" title="物理" prop="physics"/>
    <YuumiTableColumn :width="120" title="化学" prop="chemistry"/>
    <YuumiTableColumn :width="120" title="生物" prop="biology"/>
    <YuumiTableColumn :width="120" title="总分" prop="summary" fixed="right" align="center"/>
  </YuumiTable>
</div>

<div style="height: 320px; ">
  <YuumiTable :data="students" border>
    <YuumiTableColumn title="姓名" prop="name" fixed="left"/>
    <YuumiTableColumn :width="120" title="语文" prop="chinese" />
    <YuumiTableColumn :width="120" title="数学" prop="math"/>
    <YuumiTableColumn :width="120" title="英语" prop="english"/>
    <YuumiTableColumn :width="120" title="物理" prop="physics"/>
    <YuumiTableColumn :width="120" title="化学" prop="chemistry"/>
    <YuumiTableColumn :width="120" title="生物" prop="biology"/>
    <YuumiTableColumn :width="120" title="总分" prop="summary" fixed="right" align="center"/>
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
        { name: '韩梅', chinese: 100, math: 105,  english: 109, physics: 100, chemistry: 93, biology: 78 },
      ].map((item: {[key: string]: string|number}) => {
        item.summary = (Object.values(item).filter(value => typeof value === 'number') as number[]).reduce((acc, value) => acc + value, 0)
        return item
      })
    }
  }
})
</script>

<style lang="scss" scoped>
</style>