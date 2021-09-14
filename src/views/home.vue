<template>
<div class="page">
  <div class="website">
    <img src="../assets/images/website.jpg" alt="">
  </div>

  <div class="main">
    <div class="name">Yuumi UI</div>
    <div class="desc">Based on Vue 3.0</div>

    <div class="btns">
      <a href="#/doc">
        <YuumiButton theme="primary" round>Quick Start</YuumiButton>
      </a>

      <a target="_blank" href="https://github.com/DWYW/yuumi-ui-vue">
        <YuumiButton round>Github</YuumiButton>
      </a>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({

})
</script>

<style lang="scss" scoped>
@import "../../packages/theme.scss";

.page {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    display: block;
    content: " ";
    width: 150vw;
    height: 150vw;
    border-radius: 50%;
    background: map-get($--color, "primary");

    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate3d(-62.25%, 12.25%, 0);
  }
}

.website {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 0);
  img {
    width: 40vw;
    border-radius: 9999px;
    display: block;
  }
}

.main {
  width: 50vw;
  text-align: center;

  position: absolute;
  top: 50%;
  right: 0;
  transform: translate3d(0, -50%, 0);
  line-height: 2;

  .name {
    font-size: map-get($--font-size, "md")*2;
    font-weight: bold;
  }

  .btns {
    margin-top: map-get($--space, "lg");

    :not(:first-child) {
      margin-left: map-get($--space, "sm");
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  }
}
</style>