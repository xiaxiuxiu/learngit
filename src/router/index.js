import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/login";
import Home from "../views/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: "/",
    children: [
      {
        path: "/society",
        name: "society",
        meta: {
          label: "社会防控"
        },
        component: () => import("../views/society/index.vue")
      },
      {
        path: "/police",
        name: "police",
        meta: {
          label: "公安防控"
        },
        component: () => import("../views/police/index.vue")
      },
      {
        path: "/result",
        name: "result",
        meta: {
          label: "防控成果"
        },
        component: () => import("../views/result/index.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    label: "登录",
    component: Login
  }
];

const router = new VueRouter({
  routes
});

export default router;
