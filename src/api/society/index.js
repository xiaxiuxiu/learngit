/*
 * @Author: your name
 * @Date: 2020-02-17 13:25:05
 * @LastEditTime: 2020-02-17 19:33:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kunshan_epidemic_record\src\api\society\index.js
 */
import request from "../fetch";

const api = {
  //疫情重点地区在昆实有人员情况
  zdyq: () => {
    return request({
      url: "/epidemic/entry/zdyq",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  zdyqbc: data => {
    return request({
      url: "/epidemic/entry/zdyqbc",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  zdyqxgjl: data => {
    return request({
      url: "/epidemic/entry/zdyqxgjl",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  delete: data => {
    return request({
      url: "/epidemic/entry/delete",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  //涉疫重点数据
  zdsj: data => {
    return request({
      url: "/epidemic/entry/zdsj",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  zdsjxg: data => {
    return request({
      url: "/epidemic/entry/zdsjxg",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  //昆山地图
  ksmap: data => {
    return request({
      url: "/epidemic/entry/ksmap",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  ksselect: data => {
    return request({
      url: "/epidemic/entry/ksselect",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  ksmapgx: data => {
    return request({
      url: "/epidemic/entry/ksmapgx",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  //苏州各区县
  szmap: data => {
    return request({
      url: "/epidemic/entry/szmap",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  szselect: data => {
    return request({
      url: "/epidemic/entry/szselect",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  szmapgx: data => {
    return request({
      url: "/epidemic/entry/szmapgx",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

export default api;
