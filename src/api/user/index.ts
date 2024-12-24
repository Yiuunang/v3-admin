import { get, post } from "@/http/request";
import { LoginRequest, LoginResponse, ReLoginRequest, IUser } from "./type";

// 登录
export const uesrLogin = async (data: LoginRequest) => {
  return post<LoginResponse>({}, "/login", data);
};

// 刷新 token
export const refreshUserInfo = async (data: ReLoginRequest) => {
  return post<LoginResponse>({}, "/getUserInfo", data);
};

// 获取所有用户
export const getUserList = () => {
  return get<IUser[]>({}, "/getUserList");
};
