<template>
  <div>
    <YuumiInput placeholder="disabled" style="margin: 0 10px 10px 0;" disabled></YuumiInput>

    <YuumiInput v-for="(item, index) in ['primary', 'success', 'warn', 'error']" :key="index"
      placeholder="disabled"
      style="margin: 0 10px 10px 0;"
      :theme="item"
      disabled
    ></YuumiInput>
  </div>
</template>