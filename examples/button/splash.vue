<template>
  <YuumiButton splash style="margin: 0 10px 10px 0;">默认按钮</YuumiButton>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" splash style="margin: 0 10px 10px 0;">{{theme}} button</YuumiButton>
  </div>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" outline splash style="margin: 0 10px 10px 0;">{{theme}} outline</YuumiButton>
  </div>
</template>