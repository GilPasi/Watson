<script setup lang="ts">
import Button from 'primevue/button';
import router from '../router'; 

defineProps<{
  title: string;
  logo: string; 
  options: Array<string>;
}>();

// Navigate to the option
const navigateToOption = (option: string) => {
    router.push({ name: option.toLowerCase() });
};
</script>

<template>
  <header class="header">
    <img :src="logo" alt="Logo" class="logo" />
    <h1 class="header-title">{{ title }}</h1>
    <nav class="header-options">
      <ul class="header-options-list">
        <li v-for="(option, index) in options" :key="index" class="header-option">
          <Button 
            :label="option"  
            class="p-button" 
            @click="navigateToOption(option)" 
          />
        </li>
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
  font-family: "Sixtyfour Convergence", sans-serif;
}

.header-options {
  display: flex;
  gap: 10px;
}

.header-options-list {
  display: flex; /* Horizontal alignment */
  gap: 10px;
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margin */
  list-style: none; /* Remove default bullet points */
}

.header-option {
  flex: 1;
}

.p-button {
  min-width: 85px; /* Ensure buttons have consistent width */
  opacity: 0.85;
}
</style>
