/*
 * @Author: wangzhongjie
 * @Date: 2019-10-09 16:23:07
 * @LastEditors: wangzhongjie
 * @LastEditTime: 2019-10-29 15:46:28
 * @Description:url
 * @Email: UvDream@163.com
 */

let baseUrl = "";
if (process.env.NODE_ENV == "development") {
  baseUrl = `/api`; //开发环境地址
} else if (process.env.NODE_ENV == "production") {
  // http://10.10.10.23:8668
  // baseUrl = ``; //生产环境地址
  // baseUrl = `http://50.78.138.7:8081`; //生产环境地址
  // baseUrl = `http://10.10.10.23:8668`; //生产环境地址
  // baseUrl = `http://192.168.20.86:8668`; //生产环境地址
  baseUrl = ``; //生产环境地址
  // baseUrl = `http://10.10.10.76:8668`; //生产环境地址
  // baseUrl = `http://localhost:8668`; //生产环境地址
}
export { baseUrl };
