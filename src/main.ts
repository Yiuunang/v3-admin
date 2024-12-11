import { createApp } from "vue";
import App from "./App.vue";
import "./styles/reset.css";
import createAppRouter from "./router";
import pinia from "./store";

async function bootstrap() {
  const app = createApp(App);

  const router = await createAppRouter();
  app.use(router);
  app.use(pinia);
  app.mount("#app");
}

bootstrap();
