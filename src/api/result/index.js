import request from "../fetch";

const api = {
  upload(data) {
    return request({
      url: "/epidemic/entry/upload",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  get(data) {
    return request({
      url: "/epidemic/entry/get",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  getRec(data) {
    return request({
      url: "/epidemic/entry/getRec",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  edit(data) {
    return request({
      url: "/epidemic/entry/edit",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  delete(data) {
    return request({
      url: "/epidemic/entry/delete",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  add(data) {
    return request({
      url: "/epidemic/entry/add",
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

export default api;
