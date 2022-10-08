<template>
  <div>
    <YuumiInput placeholder="readonly" style="margin: 0 10px 10px 0;" readonly></YuumiInput>

    <YuumiInput v-for="(item, index) in ['primary', 'success', 'warn', 'error']" :key="index"
      placeholder="readonly"
      style="margin: 0 10px 10px 0;"
      :theme="item"
      readonly
    ></YuumiInput>
  </div>
</template>