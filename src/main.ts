import { createApp } from "vue";
import App from "./App.vue";
import createAppRouter from "./router";
import pinia from "./store";
import "./styles/index.less"

async function bootstrap() {
  const app = createApp(App);

  const router = await createAppRouter();
  app.use(router);
  app.use(pinia);
  app.mount("#app");
}

bootstrap();
