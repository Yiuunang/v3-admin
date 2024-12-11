// 登录参数
export type LoginRequest = {
  username: string;
  password: string;
};

// 登录返回的结果
export type LoginResponse = {
  username: string;
  roles: string[];
  accessToken: string;
};

// 刷新登录信息需要的参数
export type ReLoginRequest = {
  accessToken: string;
};
