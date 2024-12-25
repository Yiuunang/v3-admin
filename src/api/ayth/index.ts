import { get } from '@/http/request';
import { IAuth } from './type';

// 角色列表接口
export const getAuthList = async () => {
    return get<IAuth[]>({}, '/getAuthList');
};
