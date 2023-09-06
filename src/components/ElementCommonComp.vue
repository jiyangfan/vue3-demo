<template>
  <component v-bind="$attrs" :is="props.mode">
    <slot></slot>
  </component>
</template>
<script setup>
const props = defineProps({
  mode: {
    type: String,
    default: 'button'
  }
})
</script>