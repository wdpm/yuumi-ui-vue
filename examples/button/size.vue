<template>
  <YuumiButton v-for="size in ['xl', 'lg', 'md', 'sm', 'xm']" :key="size" :size="size" style="margin: 0 10px 10px 0;">size {{size}}</YuumiButton>
</template>