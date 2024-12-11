import { refreshUserInfo, uesrLogin } from "@/api/user";
import store from "@/store";
import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore(
  "userInfo",
  () => {
    const username = ref("");
    const roles = ref<string[]>([]);
    const accessToken = ref("");

    const storeUserLogin = async (data) => {
      try {
        const res = await uesrLogin(data);
        username.value = res.username;
        roles.value = res.roles;
        accessToken.value = res.accessToken;
        return res;
      } catch (error) {}
    };

    const refreshToken = async () => {
      if (!username || !accessToken) return;
      try {
        const res = await refreshUserInfo({
          accessToken: accessToken.value,
        });
        username.value = res.username;
        roles.value = res.roles;
        accessToken.value = res.accessToken;
      } catch (error) {
        accessToken.value = "";
      }
    };

    return {
      username,
      roles,
      accessToken,
      storeUserLogin,
      refreshToken,
    };
  },
  {
    persist: {
        key: 'userInfo',
        storage: sessionStorage,
        pick: ['accessToken'],
    },
  }
);

export default useUserStore;


/**
 * 在组件外使用 userStore
 * @returns 
 */
export const useUserStoreWithOut = () => useUserStore(store)
