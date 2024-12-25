export type IAuth = {
  name: string;
  roleId: number;
  viewRole?: string;
  roleList: IAuth[];
};
