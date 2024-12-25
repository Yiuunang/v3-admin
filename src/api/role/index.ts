import { get } from "@/http/request";
import { IRoleWithAuth } from "./type";

/** 角色列表接口 */
export const getRoleList = () => {
  return get<IRoleWithAuth[]>({}, "/getRoleList");
};
