import {createApp} from 'vue'
import App from './App.vue'
import router, {setupRouter} from './router'
import {setupStore} from "./store";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

async function bootstrap() {
    const app = createApp(App);
    setupStore(app);
    // mount route
    await setupRouter(app);


    // Mount the APP instance after the route is ready
    await router.isReady();
    const vuetify = createVuetify()
    app.use(vuetify)

    app.mount('#app', true);
}

void bootstrap();
