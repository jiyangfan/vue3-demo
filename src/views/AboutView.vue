<!--<template>-->
<!--  <div class="about">-->
<!--    <h1>This is an about page</h1>-->
<!--  </div>-->
<!--  {{ demoHtml }}-->
<!--</template>-->

<script lang="jsx">
  import {demoHtml, demo2Html, demoFunc} from "./demo";
  export default {
    data () {

    },
    render () {
      return <div>123{demoHtml}{demo2Html}{demoFunc}</div>
    },
    methods: {

    }
  }
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
