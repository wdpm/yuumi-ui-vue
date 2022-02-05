<template>
<div class="page">
  <header class="header">
    <div class="header-main">
      <div class="logo">
        <a href="#/">
          <img class="img" src="../assets/images/logo.png" alt="">
          <div class="name">YUUMI</div>
        </a>
      </div>

      <div class="_expand"></div>

      <div class="_active">组件</div>
      <div class="version">{{appVersion}}</div>
    </div>
  </header>

  <aside class="aside" ref="asideEl">
    <YuumiScrollbar>
      <section class="group" v-for="group in navs" :key="group.label">
        <div class="group-name">{{group.label}}</div>

        <nav :class="{ active: nav.path === $route.path}"
          v-for="nav in group.children" :key="nav.label"
          @click="toNavDetail(nav)"
        >
          <span class="nav-name">{{nav.name}}</span>
          <span class="nav-label">{{nav.label}}</span>
        </nav>
      </section>
    </YuumiScrollbar>
  </aside>

  <div class="component">
    <YuumiScrollbar ref="mainScrollbar">
      <div class="main" ref="mainEl">
        <router-view class="component-view"></router-view>
      </div>
    </YuumiScrollbar>
  </div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, Ref, ref, watch } from "vue"
import { useRouter } from "vue-router"
import NAVS from '../common/navs'

export default defineComponent({
  setup() {
    const router = useRouter()
    const appVersion = computed(() => `v${__APP_VERSION__}`)
    const navs = computed(() => NAVS)

    function toNavDetail (nav: any) {
      if (!nav.path) return
      router.push(nav.path)
    }

    const asideEl: Ref<any> = ref()
    const mainEl: Ref<any> = ref()
    function onResize () {
      const mainRect = mainEl.value.getBoundingClientRect()
      const navsRect = asideEl.value.getBoundingClientRect()

      mainEl.value.setAttribute('style', `padding-left: ${navsRect.width + 20}px;`)
      asideEl.value.setAttribute('style', `left: ${mainRect.left}px;`)
    }

    onMounted(() => {
      onResize()
      window.addEventListener('resize', onResize, false)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize, false)
    })

    const mainScrollbar: Ref<any> = ref()
    watch(() => router.currentRoute.value, (value, oldValue) => {
      if (value.fullPath !== oldValue.fullPath) {
        mainScrollbar.value.$refs.body.scrollTop = 0
      }
    })

    return {
      appVersion,
      navs,
      toNavDetail,
      asideEl,
      mainEl,
      mainScrollbar
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../packages/theme.scss";

$header-height: 60px;

.page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.header {
  width: 100%;
  height: $header-height;
  background-color: #ffffff;
  z-index: 9;
  box-shadow: 0 0 4px nth($--box-shadow-color, 1);

  position: sticky;
  top: 0;
  left: 0;

  .header-main {
    max-width: 1000px;
    margin: 0 auto;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    >* {
      flex: 0 0 1px;
      white-space: nowrap;
      padding: map-get($--space, "xm");
      font-size: map-get($--font-size, "md");
    }

    ._active {
      color: map-get($--color, "primary");
    }

    >._expand {
      flex-grow: 1;
    }

    .logo {
      height: 61.8%;

      a {
        height: 100%;
        display: flex;
        align-items: center;
        text-decoration: none;
      }

      .name {
        padding: map-get($--space, "xm");
        font-size: map-get($--font-size, "lg");
        color: map-get($--color, "primary");
        font-weight: bold;
      }

      .img {
        height: 100%;
      }
    }

    .version {
      font-size: map-get($--font-size, "sm");
      padding-left: map-get($--font-size, "xl");
    }
  }
}
.aside {
  position: fixed;
  z-index: 8;
  top: $header-height;
  font-size: map-get($--font-size, "sm");

  height: calc(100vh - #{$header-height});
  cursor: pointer;

  .group {
    &:first-child {
      padding-top: map-get($--space, "sm");
    }
    &:last-child {
      padding-bottom: map-get($--space, "sm");
    }
  }
  .group-name {
    color: map-get($--text-color, "tertiary");
    font-size: map-get($--font-size, "xm");

    box-sizing: border-box;
    padding: map-get($--space, "xm") map-get($--space, "md");
  }

  nav {
    box-sizing: border-box;
    padding: map-get($--space, "xm") map-get($--space, "md");

    .nav-label {
      color: map-get($--text-color, "secondary");
      padding-left: map-get($--space, "xm");
      font-size: 0.9em;
    }

    &.active, &.active .nav-label {
      color: map-get($--color, "primary");
    }
  }
}

.component {
  height: calc(100vh - #{$header-height});
  .main {
    max-width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .component-view {
    padding-bottom: 100px;
    padding-right: map-get($--space, "sm");
  }
}

:deep(.vuedoc) {
  h1, h2, h3, h4, h5, h6 {
    > a {
      display: none;
    }
  }

  .vuedoc-demo__preview {
    color: #333333;
  }

  >.vuedoc__hljs {
    background-color: #fafafa;
    border: 1px solid #eaeefb;
  }
}

:deep(.vuedoc-demo__footer:hover) {
  color: #0d6efd;
}
</style>