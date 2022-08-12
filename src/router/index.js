import { createRouter, createWebHistory } from "vue-router";
import store, { userAuthorized } from "../store/index.js";
import RootView from "../views/RootView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import AccountView from "../views/AccountView.vue";
import HomeView from "../views/HomeView.vue";
import MoviesView from "../views/MoviesView.vue";
import GamesView from "../views/GamesView.vue";
import MusicView from "../views/MusicView.vue";
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
    path: "/account",
    component: AccountView,
    meta: { auth: true },
    children: [
      {
        path: "home",
        component: HomeView,
      },
      {
        path: "movies",
        component: MoviesView,
      },
      {
        path: "games",
        component: GamesView,
      },
      {
        path: "music",
        component: MusicView,
      },
    ],
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   component: ErrorView,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  return userAuthorized.then(() => {
    if ("auth" in to.meta) {
      if (to.meta.auth && !store.state.user) {
        next("/login");
      } else if (!to.meta.auth && store.state.user) {
        next("/account/home");
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
