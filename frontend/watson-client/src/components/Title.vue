<!-- src/components/Title.vue -->
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  text: string;
  level?: number;
}>();
</script>

<template>
  <component :is="`h${level}`" class="title">
    {{ text }}
  </component>
</template>

<style scoped>
.title {
  font-size: 2rem; /* Default font size */
  font-weight: bold;
  margin: 0.5em 0;
  color: #333; /* Default text color */
}

/* Additional styles based on heading level if needed */
h1.title {
  font-size: 2.5rem;
}

h2.title {
  font-size: 2rem;
}

h3.title {
  font-size: 1.75rem;
}

h4.title {
  font-size: 1.5rem;
}

h5.title {
  font-size: 1.25rem;
}

h6.title {
  font-size: 1rem;
}
</style>
