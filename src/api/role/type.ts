
// 有权限的角色接口
export type IRoleWithAuth = {
  roleName: string; // 角色名称
  roleId: number;   // 角色id
  authority: number[]; // 权限
};
