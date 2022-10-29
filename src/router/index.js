import { createRouter, createWebHistory } from "vue-router";
import { useUserStore, userAuthorized } from "@/store/index.js";
// Site views
import RootView from "@/views/site/RootView.vue";
import RegisterView from "@/views/site/RegisterView.vue";
import LoginView from "@/views/site/LoginView.vue";
import ErrorView from "@/views/site/ErrorView.vue";
// User views
import UserView from "@/views/account/UserView.vue";
import HomeView from "@/views/category/HomeView.vue";
import CategoryView from "@/views/category/CategoryView.vue";
import SearchView from "@/views/category/SearchView.vue";
import WishlistView from "@/views/account/WishlistView.vue";
import ShoppingCartView from "@/views/account/ShoppingCartView.vue";
import CheckoutView from "@/views/account/CheckoutView.vue";
import SettingsView from "@/views/account/SettingsView.vue";
import AdminView from "@/views/account/AdminView.vue";

import AuthenticationReset from "@/components/authentication/AuthenticationReset.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: RootView,
    },
    {
      path: "/register/:plan",
      component: RegisterView,
      meta: { auth: false },
      props: true,
    },
    {
      path: "/login",
      component: LoginView,
      meta: { auth: false },
    },

    {
      path: "/reset",
      component: AuthenticationReset,
      meta: { auth: false },
    },


    {
      path: "/account",
      component: UserView,
      meta: { auth: true },
      children: [
        {
          path: "admin",
          component: AdminView,
        },
        {
          path: "settings",
          component: SettingsView,
        },
        {
          path: "wishlist",
          component: WishlistView,
        },
        {
          path: "cart",
          component: ShoppingCartView,
        },
        {
          path: "checkout",
          component: CheckoutView,
        },
      ],
    },
    {
      path: "/categories",
      component: UserView,
      meta: { auth: true },
      children: [
        {
          path: "home",
          component: HomeView,
        },
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
          props: (route) => ({ criteria: route.query.criteria, category: route.query.category, field: route.query.field }),
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
