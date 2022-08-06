import { createRouter, createWebHistory } from "vue-router";
import {userAuthorized} from "../store/index.js";
import RootView from "../views/RootView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import AccountView from "../views/AccountView.vue";
import HomeView from "../views/HomeView.vue";
import MovieView from "../views/MovieView.vue";
import ErrorView from "../views/ErrorView.vue";

const routes = [
  {
    path: "/",
    component: RootView,
  },
  {
    path: "/register",
    component: RegisterView,
    meta: { auth: false },
  },
  {
    path: "/login",
    component: LoginView,
    meta: { auth: false },
  },
  {
    path: "/account",
    component: AccountView,
    children: [
      {
        path: "home",
        component: HomeView,
        meta: { auth: true },
      },
      {
        path: "movies",
        component: MovieView,
        meta: { auth: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

userAuthorized.then((status)=> console.log("store: " + status.email));


// router.beforeEach((to, from, next) => {
//   console.log(to.meta.auth);
//   console.log(store.state.user);
//   console.log("a");
//   if (to.meta.auth && !store.state.user) {
//     console.log("a");
//     return {
//       path: "/login",
//     };
//   } else if (!to.meta.auth && store.state.user) {
//     console.log("b");
//     return false;
//   } else {
//     console.log("c");
//     next();
//   }
// });

export default router;

// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
// }
