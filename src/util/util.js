/*
 * @Author: wangzhongjie
 * @Date: 2019-10-25 11:38:08
 * @LastEditors: wangzhongjie
 * @LastEditTime: 2019-10-25 11:39:42
 * @Description:手机号验证
 * @Email: UvDream@163.com
 */

import * as Mock from "mockjs";

export const validatePhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("手机号不能为空"));
  } else if (!/^1[34578]\d{9}$/.test(value)) {
    callback("手机号格式不正确!");
  } else {
    callback();
  }
};

export const validatePhone2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("联系电话不可为空"));
  } else {
    if (value !== "") {
      var reg1 = /^(0\d{2,3}\-)?([2-9]\d{6,7})+(\-\d{1,6})?$/;
      var reg2 = /^((\+86|\+86\-)|(86|86\-)|(0086|0086\-))?1[3|5|7|8|9]\d{9}$/;
      if (!reg1.test(value) && !reg2.test(value)) {
        callback(new Error("请输入正确的手机号或者座机号格式为：0000-0000000"));
      }
    }
    callback();
  }
};

// 时间格式化
export function formatDate(date, fmt) {
  let o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}

export function isValidDate(date) {
  let date1 = new Date(date);
  return date1 instanceof Date && !isNaN(date1.getTime());
}

// 封装mock函数
export function mock(url, data) {
  Mock.mock("/api/" + url, data);
}
