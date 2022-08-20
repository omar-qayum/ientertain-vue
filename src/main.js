import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App).use(store).use(router).component('icon', FontAwesomeIcon).mount("#app");
