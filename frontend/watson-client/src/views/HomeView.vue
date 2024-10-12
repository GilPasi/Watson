<script setup lang="ts">
import Title from '../components/Title.vue';
import TextArea from "primevue/textarea";

</script>

<template>
  <Title text="Welcome To Watson!" :level="1" />
  <p>What should we encode to QR?</p>
  <!-- <TextArea /> -->
  <TextArea />
</template>

<style scoped>
</style>
