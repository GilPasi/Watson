<script setup lang="ts">
import { ref } from 'vue';
import Title from '../components/Title.vue';
import TextArea from "primevue/textarea";
import Button from 'primevue/button';

// Store the text input and QR code URL
const textToEncode = ref('');
const qrCodeUrl = ref('');

// Function to generate the QR code
function generateQRCode() {
  const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
  const size = '150x150'; // Size of the QR code
  qrCodeUrl.value = `${baseUrl}?size=${size}&data=${encodeURIComponent(textToEncode.value)}`;
}

// Function to download the generated QR code
function downloadQRCode() {
  if (qrCodeUrl.value) {
    const link = document.createElement('a');
    link.href = qrCodeUrl.value;
    link.download = 'qr-code.png'; // File name for the downloaded QR code
    link.click();
  }
}
</script>

<template>
  <center>
    <Title text="Welcome To Watson!" :level="1" />
  </center>

  <center>
    <div class="justifier homeview-canvas">
      <div class="homeview-container homeview-container-left">
        <p>What should we encode to QR?</p>
        <TextArea  
          class="homeview-textarea homeview-box" 
          v-model="textToEncode" 
          placeholder="Enter text"
        />
        <Button
          class="homeview-action-buttons"
          label="Generate QR Code"  
          @click="generateQRCode()" 
        />
      </div>
      
      <div class="homeview-container homeview-container-right">
        <p>QR code from here!</p>
        <div class="homeview-qr homeview-box">
          <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="Generated QR Code" />
        </div>
        <Button
          class="homeview-action-buttons"
          label="Download QR Code"  
          @click="downloadQRCode()" 
        />
      </div>
    </div>
  </center>
</template>

<style scoped>
.homeview-box {
  margin:1em;
}

.homeview-qr {
  --edge-size: 12em;
  width: var(--edge-size);
  height: var(--edge-size);
  border: 1px solid var(--primary-500);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.homeview-textarea {
  resize: none;
  display: block;
  width: 17em;
  height: 11.25em;
}

.homeview-action-buttons {
  margin-top: 20px;
  display: block;
}

.homeview-canvas {
  height: 20em;
  width: 75%;
  max-width: 50em;
}

.homeview-container {
  width: 100%;
  height: 100%;
  flex: 1;
}

[class^="homeview-container"] {
  --container-border: 1.5px solid var(--secondary-text-color);
}

.homeview-container-left {
  border-right: var(--container-border);
}

.homeview-container-right {
  border-left: var(--container-border);
}
</style>
