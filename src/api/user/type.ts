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

type IRole = {
  role: number; // 角色编号
  roleName: string; // 角色名称
};

// 所有用户信息类型
export type IUser = {
  id: number; // 用户编号
  nickName: string; // 昵称
  userName: string; // 用户名
  role: IRole[];  // 角色
};
