<!-- src/components/Header.vue -->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import router from '../router'; 
defineProps<{
  title: string;
  logo: string; 
  options: Array<string>;
}>();

const navigateToOption = (option: string) => {
    router.push({name: option.toLowerCase()})
};
</script>

<template>
  <header class="header">
    <img :src="logo" alt="Logo" class="logo" />
    <h1 class="header-title">{{ title }}</h1>
    <nav>
      <ul class="header-options">
        <li v-for="(option, index) in options"
            :key="index"
            class="header-option"
            @click="navigateToOption(option)"
          >{{ option }}</li>
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
  font-family: "Playfair Display", sans-serif ;
  /* "Sixtyfour Convergence1", */
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
