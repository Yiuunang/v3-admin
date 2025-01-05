import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import { useSettingStoreHooks } from "@/store/modules/setting";

type RouteModuleType = {
  default: RouteRecordRaw;
};

// 获取所有模块的路由（异步）
// const modules = import.meta.glob<RouteModuleType>(["./modules/*.ts"]);
// 组合路由信息
// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(["./modules/*.ts"], {
  eager: true,
});

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {},
    children: [],
  },
];
Object.keys(modules).forEach((key) => {
  const module = modules[key].default;
  routes.push(module);
});

// // 动态加载路由并创建 Router 实例
// async function createAppRouter() {
//   for (const path in modules) {
//     const mod = await modules[path]();
//     routes.push(mod.default);
//   }

//   return createRouter({
//     history: createWebHashHistory(),
//     routes,
//   });
// }

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const settingStore = useSettingStoreHooks();
// 处理路由
const handlerRouters = (currentName: string) => {
  settingStore.setTitle(currentName, router.getRoutes());
};

// 白名单路由
const whiteList = ["/login", "/404", "/about"];

router.beforeEach((to, from, next) => {
  NProgress.start();

  const token = sessionStorage.getItem("userInfo");
  const userIsLogin = token ? true : false;
  if (userIsLogin || whiteList.includes(to.path)) {
    next();
  } else {
    next("/login");
  }
  
  handlerRouters(to.name as string);
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
