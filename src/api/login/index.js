/*
 * @Author: your name
 * @Date: 2020-02-15 13:34:59
 * @LastEditTime: 2020-02-15 13:56:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \昆山公安局疫情防控数据录入系统\src\api\login\index.js
 */
import fetch from "../fetch";

// 登陆
export const login = data => {
  return fetch({
    url: "/epidemic/entry/login",
    method: "POST",
    data
  });
};
