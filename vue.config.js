/*
 * @Author: your name
 * @Date: 2020-02-17 09:49:45
 * @LastEditTime: 2020-02-18 14:10:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \kunshan_epidemic_record\vue.config.js
 */
module.exports = {
  lintOnSave: false,
  outputDir: "dist/version:" + new Date().toLocaleString(),
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      // 配置跨域
      "/api": {
        target: "http://10.10.10.17:8099", //10.10.10.78:8668 //10.10.10.112:8118//10.10.24.96:8080
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
    // overlay: {
    //   warnings: false,
    //   errors: false
    // },
    // lintOnSave: false
  }
};
