<script setup lang="ts">
import Title from '../components/Title.vue';
import TextArea from "primevue/textarea";
import Button from 'primevue/button';

function handleGenerateGriddler() {
  console.log("Generating a griddler");
}
</script>

<template>
  <center>
    <Title text="Welcome To Watson!" :level="1" />
  </center>

  <center>
    <div class="justifier homeview-canvas">
      <div class="homeview-container homeview-container-left ">
        <p>What should we encode to QR?</p>
        <TextArea  
          class="homeview-textarea homeview-box" 
        />
        <Button
          class="homeview-action-buttons"
          label="Generate Griddler"  
          @click="handleGenerateGriddler()" 
        />
      </div>
      <div class="homeview-container homeview-container-right">
        <p>
          QR code from here!
        </p>
      <div class="homeview-qr homeview-box"/>
      <Button
          class="homeview-action-buttons"
          label="Download"  
          @click="handleGenerateGriddler()" 
        />
      </div>
    </div>
</ center>
</template>

<style scoped>
.homeview-box
{
  margin:1em ;
}

.homeview-qr{
  --edge-size: 12em;
  width: var(--edge-size);
  height: var(--edge-size);
  border: 1px solid var(--primary-500);
  border-radius: 5px;
}

.homeview-textarea {
  resize: none;
  display:block;
  width: 17em;
  height: 11.25em;
}

.homeview-action-buttons {
  margin-top: 20px;
  display:block
}

.homeview-canvas{
  height: 20em;
  width: 75%;
  max-width: 50em;
}


/* ____Contaner Section____ */
.homeview-container
{
  width: 100%;
  height: 100%;
  flex: 1;
}

[class^="homeview-container"] {
  --container-border:  1.5px solid var(--secondary-text-color)
}
.homeview-container-left
{
  border-right: var(--container-border);
}

.homeview-container-right
{
  border-left: var(--container-border);
}

p
{
}
</style>
