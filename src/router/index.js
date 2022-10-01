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
import WishListView from "@/views/account/WishListView.vue";
import ShoppingCartView from "@/views/account/ShoppingCartView.vue";
import SettingsView from "@/views/account/SettingsView.vue";
import AdminView from "@/views/account/AdminView.vue";

// Main test view
import TestApp from "@/test/TestApp.vue"
// Component test views
import TestComponent from "@/test/component/TestComponent.vue"
import TestCarousel from "@/test/component/TestCarousel.vue"
import TestNavBar from "@/test/component/TestNavBar.vue"
import TestModal from "@/test/component/TestModal.vue"
import TestRecord from "@/test/component/TestRecord.vue"
import TestAudioPlayer from "@/test/component/TestAudioPlayer.vue"
import TestAuthentication from "@/test/component/TestAuthentication.vue"
import TestLoading from "@/test/component/TestLoading.vue"
import TestTimer from "@/test/component/TestTimer.vue"
// Page test views
import TestPage from "@/test/page/TestPage.vue"
import TestRegister from "@/test/page/TestRegister.vue"
// Site test views
import TestSite from "@/test/site/TestSite.vue"
import TestHome from "@/test/site/TestHome.vue"
import TestCategory from "@/test/site/TestCategory.vue"

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
          path: "home",
          component: HomeView,
          meta: { pageOrder: 1 },
        },
        {
          path: "books",
          component: CategoryView,
          props: { category: "books" },
          meta: { pageOrder: 2 },
        },
        {
          path: "games",
          component: CategoryView,
          props: { category: "games" },
          meta: { pageOrder: 3 },
        },
        {
          path: "movies",
          component: CategoryView,
          props: { category: "movies" },
          meta: { pageOrder: 4 },
        },
        {
          path: "music",
          component: CategoryView,
          props: { category: "music" },
          meta: { pageOrder: 5 },
        },
        {
          path: "search",
          component: SearchView,
          props: (route) => ({ query: route.query.q }),
          meta: { pageOrder: 6 },
        },
      ]
    },
    {
      path: "/test",
      component: TestApp,
      meta: { auth: false },
      children: [
        {
          path: "component",
          component: TestComponent,
          children: [
            {
              path: "carousel",
              component: TestCarousel,
            },
            {
              path: "navbar",
              component: TestNavBar,
            },
            {
              path: "modal",
              component: TestModal,
            },
            {
              path: "record",
              component: TestRecord,
            },
            {
              path: "audio",
              component: TestAudioPlayer,
            },
            {
              path: "authentication",
              component: TestAuthentication,
            },
            {
              path: "loading",
              component: TestLoading,
            },
            {
              path: "timer",
              component: TestTimer,
            },
          ]
        },
        {
          path: "page",
          component: TestPage,
          children: [
            {
              path: "register",
              component: TestRegister,
            },
          ]
        },
        {
          path: "site",
          component: TestSite,
          children: [
            {
              path: "home",
              component: TestHome,
              props: { category: "home" },
              meta: { pageOrder: 1 },
            },
            {
              path: "books",
              component: TestCategory,
              props: { category: "books" },
              meta: { pageOrder: 2 },
            },
            {
              path: "games",
              component: TestCategory,
              props: { category: "games" },
              meta: { pageOrder: 3 },
            },
            {
              path: "movies",
              component: TestCategory,
              props: { category: "movies" },
              meta: { pageOrder: 4 },
            },
            {
              path: "music",
              component: TestCategory,
              props: { category: "music" },
              meta: { pageOrder: 5 },
            }
          ]
        }
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

router.afterEach((to, from) => {
  if (to.path.includes("categories") && from.path.includes("categories")
  || to.path.includes("site") && from.path.includes("site")) {
    const toPageOrder = to.meta.pageOrder;
    const fromPageOrder = from.meta.pageOrder;
    to.meta.direction = toPageOrder > fromPageOrder ? 'right' : 'left'
  }
})

export default router;

// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
// }
