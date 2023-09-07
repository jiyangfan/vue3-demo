<template>
  <component v-bind="$attrs" :is="props.mode">
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
import type {PropType} from "vue";

type Mode = String

const props = defineProps({
  mode: {
    type: String as PropType<Mode>,
    default: 'button',

  }
})
</script>