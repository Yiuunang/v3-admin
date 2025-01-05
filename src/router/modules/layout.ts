import { RouteRecordRaw } from "vue-router";

export default {
  path: "/",
  name: "Layout",
  component: () => import("@/layout/index.vue"),
  meta: {
    role: ["common", "admin"],
  },
  children: [
    {
      path: "/",
      name: "HomePage",
      component: () => import("@/views/home/index.vue"),
      meta: {
        isShow: true,
        title: "默认首页",
        parentRouter: "Layout",
      },
    },
    {
      path: "/parent",
      name: "ParentPage",
      meta: {
        isShow: true,
        title: "父级菜单",
        parentRouter: "Layout",
      },
      children: [
        {
          path: "/parent/child1",
          name: "ChildPage1",
          component: () => import("@/views/parent/children1.vue"),
          meta: {
            isShow: true,
            title: "子级菜单1",
            parentRouter: "ParentPage",
          },
        },
        {
          path: "/parent/child2",
          name: "ChildPage2",
          component: () => import("@/views/parent/children2.vue"),
          meta: {
            isShow: true,
            title: "子级菜单2",
            parentRouter: "ParentPage",
          },
        },
        {
          path: "/parent/child3",
          name: "ChildPage3",
          component: () => import("@/views/parent/children3.vue"),
          meta: {
            isShow: true,
            title: "子级菜单3",
            parentRouter: "ParentPage",
          },
        },
      ],
    },
    {
      path: "/user",
      name: "UserPage",
      component: () => import("@/views/user/index.vue"),
      meta: {
        title: "用户模块",
        isShow: true,
        parentRouter: "Layout",
      },
    },
    {
      path: "/role",
      name: "RolePage",
      component: () => import("@/views/role/index.vue"),
      meta: {
        title: "角色模块",
        isShow: true,
        parentRouter: "Layout",
      },
    },
    {
      path: "/auth",
      name: "AuthPage",
      component: () => import("@/views/auth/index.vue"),
      meta: {
        title: "权限模块",
        isShow: true,
        parentRouter: "Layout",
      },
    },
  ],
} as RouteRecordRaw;
