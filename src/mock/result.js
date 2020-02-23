import { mock } from "@/util/util";
import { Random } from "mockjs";

const dataset = {
  // 高位统筹
  10: {
    zkhycs: 22,
    zdddcs: 11,
    ghwwcs: 11
  },
  // 党旗飘扬
  11: {
    lsdzzs: 22,
    lsdzbs: 11,
    hxrds: 11,
    qzss: 11
  },
  // 涉疫打击
  12: { djths: 22, sjrs: 11, sjwzs: 11 },
  // 战时表彰
  13: { fjs: 22, mjs: 22 },
  14: {
    date: "2018-10-10",
    sort: 1,
    show: "1",
    detail: "文章文章文章文章文章文章文章文章文章"
  },
  15: { detail: "文章文章文章文章文章文章" },
  16: { detail: "文章文章文章文章文章文章" },
  17: {
    ycxkzs: 1000,
    n95: 1000,
    hmjs: 1000,
    yyfhfs: 1000
  }
};

// 上传接口
mock("epidemic/entry/upload", {
  code: 10000
});

// get
mock("epidemic/entry/get", function(option) {
  const { type } = JSON.parse(option.body);
  return {
    code: 10000,
    total: 100,
    data: [
      {
        id: Random.id(),
        edittime: Random.date(),
        editer: Random.cname(),
        ...dataset[type]
      }
    ]
  };
});

// getRec
mock("epidemic/entry/getRec", function(option) {
  const { type } = JSON.parse(option.body);
  return {
    code: 10000,
    total: 100,
    data: [
      {
        id: Random.id(),
        edittime: Random.date(),
        editer: Random.cname(),
        ...dataset[type]
      }
    ]
  };
});

// edit
mock("epidemic/entry/edit", {
  code: 10000
});

// delete
mock("epidemic/entry/delete", {
  code: 10000
});

// add
mock("epidemic/entry/add", { code: 10000 });
