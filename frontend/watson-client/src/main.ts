// src/main.js
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { definePreset } from "@primevue/themes"
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue'
import router from './router'

const app = createApp(App)

const watsonPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: "#FDEDEE",  // Rose.50
            100: "#FADCD9", // Rose.100
            200: "#F6B0B7", // Rose.200
            300: "#F1929D", // Rose.300
            400: "#E76E7E", // Rose.400
            500: "#E25464", // Rose.500
            600: "#DC3946", // Rose.600
            700: "#CC2432", // Rose.700
            800: "#9E1B26", // Rose.800
            900: "#7B151E", // Rose.900
            950: "#500E14"  // Rose.950
        }
    }
});

interface PrimaryColors {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
}

interface Preset {
    semantic: {
        primary: PrimaryColors;
    };
}


// Helper function to set CSS variables based on the preset
function applyPresetToCSS(preset :Preset) {
    const root = document.documentElement; // This targets the `:root` (global scope) of CSS
    const primaryColors = preset.semantic.primary;

    // Loop through the colors and set them as CSS variables
    for (const [key, value] of Object.entries(primaryColors)) {
        root.style.setProperty(`--primary-${key}`, value);
    }
}

app.use(PrimeVue, {
    theme: {
        preset: watsonPreset,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        },
    }
});

applyPresetToCSS(watsonPreset); // Apply the Rose shades to CSS variables

app.use(createPinia());
app.use(router);

app.mount('#app');
