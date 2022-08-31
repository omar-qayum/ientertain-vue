import { createApp } from 'vue';
import { createPinia } from "pinia"
import App from './App.vue';
import router from './router';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

createApp(App)
.use(createPinia())
.use(router)
.component('icon', FontAwesomeIcon)
.component('icon-layers', FontAwesomeLayers)
.component('icon-layers-text', FontAwesomeLayersText)
.mount('#app');