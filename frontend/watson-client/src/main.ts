import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { definePreset } from "@primevue/themes"
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue'
import router from './router'

const app = createApp(App)

const watsonPreset = definePreset( Aura,
    {
        semantic:{
            primary :{
                50: "{Lime.50}",
                100: "{Rose.100}",
                200: "{Rose.200}",
                300: "{Rose.300}",
                400: "{Rose.400}",
                500: "{Rose.500}",
                600: "{Rose.600}",
                700: "{Rose.700}",
                800: "{Rose.800}",
                900: "{Rose.900}",
                950: "{Rose.950}",
            }
        }
    }
)

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
app.use(createPinia())
app.use(router)

// app.component('Button', Button);

app.mount('#app')
