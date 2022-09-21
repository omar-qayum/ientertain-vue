import { createRouter, createWebHistory } from "vue-router";
import { useUserStore, userAuthorized } from "@/store/index.js";
import RootView from "@/views/RootView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import AdminView from "@/views/account/AdminView.vue";
import HomeView from "@/views/account/HomeView.vue";
import SettingsView from "@/views/account/SettingsView.vue";
import ShoppingCartView from "@/views/account/ShoppingCartView.vue";
import UserView from "@/views/account/UserView.vue";
import WishListView from "@/views/account/WishListView.vue";
import CategoryView from "@/views/category/CategoryView.vue";
import SearchView from "@/views/category/SearchView.vue";
import ErrorView from "@/views/ErrorView.vue";
import TestView from "@/views/test/TestView.vue"
import TestView2 from "@/views/test/TestView2.vue"
import TestView3 from "@/views/test/TestView3.vue"
import TestView4 from "@/views/test/TestView4.vue"
import TestView5 from "@/views/test/TestView5.vue"

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
      path: "/test",
      component: TestView,
      meta: { auth: false },
    },
    {
      path: "/test2",
      component: TestView2,
      meta: { auth: false },
    },
    {
      path: "/test3",
      component: TestView3,
      meta: { auth: false },
    },
    {
      path: "/test4",
      component: TestView4,
      meta: { auth: false },
    },
    {
      path: "/test5",
      component: TestView5,
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
          component: ShoppingCartView,
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
