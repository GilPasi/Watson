<!-- src/components/Footer.vue -->
<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  logo: string;
}>();
</script>

<template>
  <footer class="footer">
    <p class="footer-text">© 2024 Gil Pasi. All rights reserved.</p>
    <img :src="logo" alt="Footer Logo" class="footer-logo" />
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-background-color);
  padding: 0px;
  border-top: 1px solid #ddd;
}

.footer-logo {
  width: 65px;
  border-radius: 50%;
  margin:1em
}

.footer-text {
  font-size: 0.9rem;
  color: var(--secondary-text-color);
}

</style>
