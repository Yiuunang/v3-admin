import { MockMethod } from 'vite-plugin-mock';

export default [
    {
        url: '/mock/api/login',
        method: 'post',
        // 可以获取请求体
        response: (body) => {
            if(body.username !== body.password) {
                return {
                    code: 1,
                    message: '用户名或密码错误',
                    data: {
                        username: '',
                        roles: [],
                        accessToken: '',
                    },
                }
            }

            let data = {
                username: 'common',
                roles: ['common'],
                accessToken: 'common',
            }
            if(body.username === 'admin') {
                data.username = 'admin';
                data.roles = ['admin'];
                data.accessToken = 'admin';
            }
            return {
                code: 0,
                message: '登录成功',
                data
              };
        }
    }
]  as MockMethod[]