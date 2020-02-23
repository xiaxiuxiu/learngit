/*
 * @Author: your name
 * @Date: 2020-02-15 19:32:40
 * @LastEditTime: 2020-02-15 19:35:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \昆山公安局疫情防控数据录入系统\src\mixin\page.js
 */
// import api from "@/api/file-manage";
export default {
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
      //pageSet: {},
      editer: {
        editer: sessionStorage.getItem("username")
      }
    };
  },
  computed: {
    pageSet: function() {
      return {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
    }
  },
  mounted() {},
  methods: {
    pageChange(cur) {
      this.pageNum = cur;
      let obj = Object.assign(
        { pageNum: this.pageNum },
        { pageSize: this.pageSize }
      );
      this.searchFunc(obj);
    },
    pageSizeChange(pagesize) {
      this.pageSize2 = pagesize;
      let obj = Object.assign(
        { pageNum: this.pageNum },
        { pageSize: this.pageSize }
      );
      this.searchFunc(obj);
    }
  }
};
