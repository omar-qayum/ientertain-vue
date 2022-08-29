import { createApp } from 'vue';
import { createPinia } from "pinia"
import App from './App.vue';
import router from './router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App).use(createPinia()).use(router).component('icon', FontAwesomeIcon).mount('#app');