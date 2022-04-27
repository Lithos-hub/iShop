import { createApp } from "vue";
import mdiVue from 'mdi-vue/v3';
import * as mdijs from '@mdi/js';
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
  .use(mdiVue, { icons: mdijs })
  .use(VueAxios, axios)
  .use(router)
  .use(createPinia())
  .mount("#app");
