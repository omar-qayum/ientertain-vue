import { createRouter, createWebHistory } from "vue-router";
import store, { userAuthorized } from "../store/index.js";
import RootView from "../views/RootView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import AccountView from "../views/account/AccountView.vue";
import AdminView from "../views/account/AdminView.vue";
import HomeView from "../views/account/HomeView.vue";
import BooksView from "../views/account/BooksView.vue";
import GamesView from "../views/account/GamesView.vue";
import MoviesView from "../views/account/MoviesView.vue";
import MusicView from "../views/account/MusicView.vue";
import SettingsView from "../views/account/SettingsView.vue";

import TestView from "../views/TestView.vue"
//import ErrorView from "../views/ErrorView.vue";

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
    path: "/test",
    component: TestView,
    meta: { auth: false },
  },
  {
    path: "/account",
    component: AccountView,
    meta: { auth: true },
    children: [
      {
        path: "home",
        component: HomeView,
      },
      {
        path: "admin",
        component: AdminView,
      },
      {
        path: "books",
        component: BooksView,
      },
      {
        path: "games",
        component: GamesView,
      },
      {
        path: "movies",
        component: MoviesView,
      },
      {
        path: "music",
        component: MusicView,
      },
      {
        path: "settings",
        component: SettingsView,
      },
    ],
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   component: ErrorView,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  return userAuthorized.then(() => {
    if ("auth" in to.meta) {
      if (to.meta.auth && !store.state.user) {
        next("/login");
      } else if (!to.meta.auth && store.state.user) {
        next("/user/home");
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;

// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
// }
