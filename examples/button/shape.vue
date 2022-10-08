<template>
  <YuumiButton round style="margin: 0 10px 10px 0;">默认按钮</YuumiButton>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" round style="margin: 0 10px 10px 0;">{{theme}} button</YuumiButton>
  </div>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" outline round style="margin: 0 10px 10px 0;">{{theme}} outline</YuumiButton>
  </div>

  <YuumiButton circle style="margin: 0 10px 10px 0;">默</YuumiButton>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" circle style="margin: 0 10px 10px 0;">{{theme.slice(0,2)}}</YuumiButton>
  </div>
  <div>
    <YuumiButton v-for="theme in ['primary', 'success', 'error', 'warn']" :key="theme" :theme="theme" outline circle style="margin: 0 10px 10px 0;">{{theme.slice(0,2)}}</YuumiButton>
  </div>
</template>