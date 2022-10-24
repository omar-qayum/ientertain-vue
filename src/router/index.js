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
import TestGridCarousel from "@/test/component/TestGridCarousel.vue"
import TestSearchBar from "@/test/component/TestSearchBar.vue"
import TestQuotaCount from "@/test/component/TestQuotaCount.vue"
// Page test views
import TestPage from "@/test/page/TestPage.vue"
import TestRegister from "@/test/page/TestRegister.vue"
import TestRoot from "@/test/page/TestRoot.vue"
// Site test views
import TestSite from "@/test/site/TestSite.vue"
import TestHome from "@/test/site/TestHome.vue"
import TestCategory from "@/test/site/TestCategory.vue"
import TestAdmin from "@/test/site/TestAdmin.vue"
import TestSettings from "@/test/site/TestSettings.vue"
import TestWishlist from "@/test/site/TestWishlist.vue"
import TestSearch from "@/test/site/TestSearch.vue"
import TestCheckout from "@/test/site/TestCheckout.vue"

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
            {
              path: "grid-carousel",
              component: TestGridCarousel,
            },
            {
              path: "search",
              component: TestSearchBar,
            },
            {
              path: "quota",
              component: TestQuotaCount,
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
            {
              path: "root",
              component: TestRoot,
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
            },
            {
              path: "books",
              component: TestCategory,
              props: { category: "books" },
            },
            {
              path: "games",
              component: TestCategory,
              props: { category: "games" },
            },
            {
              path: "movies",
              component: TestCategory,
              props: { category: "movies" },
            },
            {
              path: "music",
              component: TestCategory,
              props: { category: "music" },
            },
            {
              path: "search",
              component: TestSearch,
              props: (route) => ({ query: route.query.q }),
            },
            {
              path: "admin",
              component: TestAdmin,
            },
            {
              path: "settings",
              component: TestSettings,
            },
            {
              path: "wishlist",
              component: TestWishlist,
            },
            {
              path: "checkout",
              component: TestCheckout,
            },
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

export default router;
