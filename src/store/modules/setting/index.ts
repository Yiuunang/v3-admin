import { defineStore } from "pinia";
import { RouteRecordNormalized } from "vue-router";
import store from '@/store';

type Info = {
    name: string
    title: string
  }


export const useSettingStore = defineStore("setting", () => {
  /** 路由标题信息(面包屑) */
  const routeInfo = ref<Info[]>([]);

  /**
   * 设定路由标题信息(面包屑)
   */
  const setTitle = (name: string, routes: RouteRecordNormalized[]) => {
    const infos: Info[] = [];

    let routeName = name;

    while (routeName) {
      const currentRouterObj = routes.find((route) => route.name === routeName);
      infos.unshift({
          name: currentRouterObj?.name as string,
          title: currentRouterObj?.meta?.title as string
      });
      const parentRouterObj = routes.find((route) => route.name === currentRouterObj?.meta?.parentRouter);
      if (parentRouterObj && parentRouterObj.meta.isShow) {
        routeName = parentRouterObj.name as string;
      } else {
        routeName = '';
      }
    }


    routeInfo.value = infos;
  };

  return {
    routeInfo,
    setTitle,
  };
});

/** 全局调用 */
export const useSettingStoreHooks = () => {
    return useSettingStore(store);
};
