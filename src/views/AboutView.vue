<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="gradient-transition"></div>
  </div>
</template>

<script lang="typescript">
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.gradient-transition {
  width: 200px;
  height: 200px;
  background: linear-gradient(to right, red, blue);
  animation: gradientAnimation 3s linear infinite;
}

@keyframes gradientAnimation {
  0% { background: linear-gradient(to right, red, blue); }
  50% { background: linear-gradient(to right, yellow, green); }
  100% { background: linear-gradient(to right, red, blue); }
}
</style>