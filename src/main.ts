import {createApp} from 'vue'
import App from './App.vue'
import router, {setupRouter} from './router'
import {setupStore} from "./store";
import vuetify from "./plugins/vuetify.ts";
import './styles/main.css'
async function bootstrap() {
    const app = createApp(App);
    setupStore(app);
    // mount route
    await setupRouter(app);
    // Mount the APP instance after the route is ready
    await router.isReady();

    app.use(vuetify);

    app.mount('#app', true);
}

void bootstrap();
