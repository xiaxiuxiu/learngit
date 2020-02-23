/*
 * @Author: your name
 * @Date: 2020-02-17 17:46:58
 * @LastEditTime: 2020-02-17 19:34:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \kunshan_epidemic_record\src\api\person-center\index.js
 */
import request from "../fetch";

const api = {
  checkPerAccount: () => {
    return request({
      url: "/jsbrgl/PerAccount/findOne",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  updatePassWord: data => {
    return request({
      url: "/jsbrgl/PerAccount/updatePassWord",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  updateUserInfo: data => {
    return request({
      url: "/jsbrgl/PerAccount/updateUserInfo",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

export default api;
