import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/iview.js";
import G2 from "@antv/g2";
import "./assets/icon/iconfont.css";
// import "@/mock";

Vue.use(G2);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
