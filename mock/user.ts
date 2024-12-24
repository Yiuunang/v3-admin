import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/mock/api/login",
    method: "post",
    // 可以获取请求体
    response: (body) => {
      if (body.username !== body.password) {
        return {
          code: 1,
          message: "密码错误",
          data: {
            username: "",
            roles: [],
            accessToken: "",
          },
        };
      }

      // 其余的则显示登录成功
      if (body.username === "admin") {
        return {
          code: 0,
          message: "登录成功",
          data: {
            username: "admin",
            roles: ["admin"],
            accessToken: "admin",
          },
        };
      } else {
        return {
          code: 0,
          message: "登录成功",
          data: {
            username: "common",
            roles: ["common"],
            accessToken: "common",
          },
        };
      }
    },
  },
  // 获取用户信息的接口
  {
    url: "/mock/api/getUserInfo",
    method: "post",
    response: ({ body }) => {
      if (body.accessToken === "admin") {
        return {
          code: 0,
          message: "登录成功",
          data: {
            username: "admin",
            roles: ["admin"],
            accessToken: "admin",
          },
        };
      } else if (body.accessToken === "common") {
        return {
          code: 0,
          message: "登录成功",
          data: {
            username: "common",
            roles: ["common"],
            accessToken: "common",
          },
        };
      } else {
        return {
          code: 1,
          message: "Token失效",
          data: {
            username: "",
            roles: [],
            accessToken: "",
          },
        };
      }
    },
  },
  // 获取用户列表的接口
  {
    url: "/mock/api/getUserList",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "获取成功",
        data: [
          {
            id: 1,
            nickName: "张三",
            userName: "张三",
            role: [
              {
                role: 1,
                roleName: "管理员",
              },
              {
                role: 2,
                roleName: "普通用户",
              },
            ],
          },
          {
            id: 2,
            nickName: "李四",
            userName: "李四",
            role: [
              {
                role: 1,
                roleName: "管理员",
              },
            ],
          },
          {
            id: 3,
            nickName: "王五",
            userName: "王五",
            role: [
              {
                role: 2,
                roleName: "普通用户",
              },
            ],
          },
        ],
      };
    },
  },
] as MockMethod[];
