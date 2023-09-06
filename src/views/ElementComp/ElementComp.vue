<template>
  <div class="element-comp">

    <ElementCommonComp mode="button" @click="handleBtnClick">{{ inputValue }}</ElementCommonComp>

    <ElementCommonComp mode="El-button" @click="handleBtnClick">Default</ElementCommonComp>
    <ElementCommonComp mode="El-button" type="primary" @click="handleBtnClick">Primary</ElementCommonComp>
    <ElementCommonComp mode="El-button" type="success" @click="handleBtnClick">Success</ElementCommonComp>

    <ElementCommonComp mode="El-input" v-model="inputValue"></ElementCommonComp>

    <ElementCommonComp mode="El-tag" @click="handleTagClick">Default</ElementCommonComp>
    <ElementCommonComp mode="El-tag" type="success" @click="handleTagClick">Success</ElementCommonComp>


  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import ElementCommonComp from '@/components/ElementCommonComp.vue'

  const inputValue = ref('button');

  const handleBtnClick = (e) => {
    alert(`点击了按钮 ${e.target.innerText}`);
  }

  const handleTagClick = (e) => {
    alert(`点击了Tag ${e.target.innerText}`);
  }

</script>
<style scoped>
  .element-comp{
    width: 100%;
    padding: 20px 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }
</style>