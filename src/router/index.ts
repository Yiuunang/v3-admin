import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";

type RouteModuleType = {
  default: RouteRecordRaw;
};

// 获取所有模块的路由（异步）
const modules = import.meta.glob<RouteModuleType>(["./modules/*.ts"]);
// const modules: Record<string, any> = import.meta.glob(["./modules/*.ts"], {
//   eager: true,
// });

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

// 动态加载路由并创建 Router 实例
async function createAppRouter() {
  for (const path in modules) {
    const mod = await modules[path]();
    routes.push(mod.default);
  }

  return createRouter({
    history: createWebHashHistory(),
    routes,
  });
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default createAppRouter;
