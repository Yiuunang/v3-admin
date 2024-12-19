import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { getMessageInfo } from "./status";
import { BaseResponse } from "./type";

const service = axios.create({
  // 启用 mock 就请求 mock 路径
  // 不启用 mock 就请求 正常后端路径
    baseURL: import.meta.env.VITE_APP_USE_MOCK
    ? import.meta.env.VITE_APP_MOCK_BASEURL
    : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response;
    }
    ElMessage({
      message: getMessageInfo(response.status),
      type: "error",
    });
    return response;
  },
  (error) => {
    const { response } = error;

    if (response) {
      ElMessage({
        message: getMessageInfo(response.status),
        type: "error",
      });
      return Promise.reject(response.data);
    }

    ElMessage({
      message: "网络连接异常，请稍后再试！",
      type: "error",
    });
    return Promise.reject(error);
  }
);

// BaseResponse 为 res.data 的类型
// T 为 res.data.data 的类型 不同的接口会返回不同的 data 所以我们加一个泛型表示
// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    service
      .request<any, AxiosResponse<BaseResponse>>(conf)
      .then((res: AxiosResponse<BaseResponse>) => {        
        const data = res.data;        
        // 如果data.code为错误代码返回message信息
        if (data.code != 0) {
          ElMessage({
            message: data.message,
            type: "error",
          });
          reject(data.message);
        } else {
          ElMessage({
            message: data.message,
            type: "success",
          });
          // 此处返回data信息 也就是 api 中配置好的 Response类型
          resolve(data.data as T);
        }
      });
  });
};

// 在最后使用封装过的axios导出不同的请求方式
export function get<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  parms?: U
): Promise<T> {
  return requestInstance({ ...config, url, method: "GET", params: parms });
}

export function post<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  data: U
): Promise<T> {
  return requestInstance({ ...config, url, method: "POST", data: data });
}
