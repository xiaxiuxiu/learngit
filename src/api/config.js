import { baseUrl } from "@/config/env";
export default {
  method: "post",
  // 基础url前缀
  baseURL: baseUrl,
  // 请求头信息
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
    // "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyIiwiZXhwIjoxNTcyNTEyOTY2LCJpYXQiOjE1NzI1MDkzNjZ9.fDC2FTomgK4G-kXi-jBGui-a4zWit5CbKeWYBlUkJws"
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: "json"
};
