<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import logo from '@/assets/watson-logo.svg'; 
import avatar from '@/assets/otter-avatar-cu.png';
let options = ['Home', 'About'] 
</script>

<template>
  <div class="layout">
    <Header 
      title="Watson" 
      :logo="logo"
      :options="options" 
    />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer :logo="avatar" />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the layout takes the full height of the viewport */
}

.main-content {
  flex: 1; 
  padding: 20px; 
}

header {
  position: sticky;
  top: 0;
  z-index: 1000; /* Ensure the header stays on top of other elements */
}

</style>
