import request from "../fetch";

const api = {
  checkData: data => {
    return request({
      url: "/jsbrgl/InfoManager/queryByCoditions",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  //修改已读状态
  updateMessage: data => {
    return request({
      url: "/jsbrgl/InfoManager/updateMessageById",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

export default api;
