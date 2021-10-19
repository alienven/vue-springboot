import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Home from "@/views/Home";
import UserInfo from "@/views/UserInfo";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
      hidden: true,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      children: [
        {
          path: "/userinfo",
          name: "个人中心",
          component: UserInfo,
        },
      ],
    },
  ],
});
