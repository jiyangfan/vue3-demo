<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/MapDemo">高德地图DEMO</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/BackgroundFromRandomImg">根据随机图片设置对应颜色背景图</RouterLink>
        <RouterLink to="/ImageLazyLoad">图片懒加载</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
  header {
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    max-height: 100vh;

  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 5px;
    border-left: 1px solid var(--color-border);
    margin-bottom: 5px;
  }

  nav a:first-of-type {
    border: 0;
  }


</style>
