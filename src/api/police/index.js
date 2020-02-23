/*
 * @Author: your name
 * @Date: 2020-02-17 17:46:58
 * @LastEditTime: 2020-02-17 21:57:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kunshan_epidemic_record\src\api\police\index.js
 */
import request from "../fetch";

const api = {
  //巡防力量情况
  xfll: data => {
    return request({
      url: "/epidemic/entry/xfll",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  xfllgx: data => {
    return request({
      url: "/epidemic/entry/xfllgx",
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
  //查控车辆和人员
  ckrc: data => {
    return request({
      url: "/epidemic/entry/ckrc",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  ckrcbc: data => {
    return request({
      url: "/epidemic/entry/ckrcbc",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  ckrcxgjl: data => {
    return request({
      url: "/epidemic/entry/ckrcxgjl",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  //涉疫接警数据
  jjsj: data => {
    return request({
      url: "/epidemic/entry/jjsj",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  jjsjgx: data => {
    return request({
      url: "/epidemic/entry/jjsjgx",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  //重点防控工作情况
  zdfk: data => {
    return request({
      url: "/epidemic/entry/zdfk",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  zdfkbc: data => {
    return request({
      url: "/epidemic/entry/zdfkbc",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  zdfkgjl: data => {
    return request({
      url: "/epidemic/entry/zdfkgjl",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  //热门舆情
  rmyq: data => {
    return request({
      url: "/epidemic/entry/rmyq",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  rmyqgx: data => {
    return request({
      url: "/epidemic/entry/rmyqgx",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

export default api;
