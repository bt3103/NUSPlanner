import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

export default new VueRouter({
    routes: [
      {
        path: "/",
        redirect: {
          name: "login"
        }
      },
      {
        path: "/login",
        name: "login",
        component: LoginComponent
      },
      {
        path: "/first_page",
        name: "first_page",
        component: FirstComponent
      }
    ]
  });