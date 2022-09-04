import { createRouter, createWebHistory } from "vue-router";
import { useUserStore, userAuthorized } from "@/store/index.js";
import RootView from "@/views/RootView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import UserView from "@/views/account/UserView.vue";
import AdminView from "@/views/account/AdminView.vue";
import HomeView from "@/views/account/HomeView.vue";
import CategoryView from "@/views/account/CategoryView.vue";
import SettingsView from "@/views/account/SettingsView.vue";
import WishListView from "@/views/account/WishListView.vue";
import CartView from "@/views/account/CartView.vue";
import SearchView from "@/views/account/SearchView.vue";
import ErrorView from "@/views/ErrorView.vue";
import TestView from "@/views/TestView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
      component: UserView,
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
          path: "settings",
          component: SettingsView,
        },
        {
          path: "wish-list",
          component: WishListView,
        },
        {
          path: "cart",
          component: CartView,
        },
      ],
    },
    {
      path: "/categories",
      component: UserView,
      meta: { auth: true },
      children: [
        {
          path: "books",
          component: CategoryView,
          props: { category: "books" },
        },
        {
          path: "games",
          component: CategoryView,
          props: { category: "games" },
        },
        {
          path: "movies",
          component: CategoryView,
          props: { category: "movies" },
        },
        {
          path: "music",
          component: CategoryView,
          props: { category: "music" },
        },
        {
          path: "search",
          component: SearchView,
          props: (route) => ({ query: route.query.q })
        },
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      component: ErrorView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  return userAuthorized.then(() => {
    const userStore = useUserStore();
    if ("auth" in to.meta) {
      if (to.meta.auth && !userStore.user) {
        next("/login");
      } else if (!to.meta.auth && userStore.user) {
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
