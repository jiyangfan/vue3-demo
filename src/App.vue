<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import './public-path';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'vue3-dnd';


</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/MapDemo">高德地图DEMO</RouterLink>
        <RouterLink to="/MapDemo2">高德地图DEMO2</RouterLink>
        <RouterLink to="/MapChart">地图图表</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/BackgroundFromRandomImg">根据随机图片设置对应颜色背景图</RouterLink>
        <RouterLink to="/ImageLazyLoad">图片懒加载</RouterLink>
        <RouterLink to="/Form">表单</RouterLink>
        <RouterLink to="/Vue3Dnd">Vue3Dnd</RouterLink>
      </nav>
    </div>
  </header>
  <div class="main-container">

    <DndProvider :backend="HTML5Backend">
      <RouterView />
    </DndProvider>
  </div>
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

  .main-container{
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
    margin-left: 10px;
  }

</style>
