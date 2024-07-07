/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import router from './routes'

// Composables
import { createApp } from 'vue'
import { createPinia } from "pinia";
import vuetify from './plugins/vuetify';

const app = createApp(App).use(router);

const pinia = createPinia();

app.use(vuetify)
app.use(pinia);

registerPlugins(app)

app.mount('#app')
