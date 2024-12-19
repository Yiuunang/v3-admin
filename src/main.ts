import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import "./styles/index.less"

// 样式
import 'element-plus/theme-chalk/el-message.css';
// 黑色主题样式
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
