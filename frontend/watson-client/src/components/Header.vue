<!-- src/components/Header.vue -->
<script setup lang="ts">
defineProps<{
  title: string;
  logo: string; 
  options: Array<string>;
}>();
</script>

<template>
  <header class="header">
    <img :src="logo" alt="Logo" class="logo" />
    <h1 class="header-title">{{ title }}</h1>
    <nav>
      <ul class="header-options">
        <li v-for="(option, index) in options" :key="index" class="header-option">{{ option }}</li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: var(--secondary-background-color);
  padding: 10px;
}

.logo {
  max-width: 50px;
  margin-right: 10px;
}

.header-title {
  font-size: 1.5rem;
  margin-right: auto;
}

.header-options {
  display: flex;
  gap: 10px;
  list-style: none;
}

.header-option {
  cursor: pointer;
}
</style>
