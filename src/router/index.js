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

// Main test view
import TestView from "@/test/TestView.vue"
// Component test views
import TestComponent from "@/test/components/TestComponent.vue"
import TestCarousel from "@/test/components/TestCarousel.vue"
import TestNavBar from "@/test/components/TestNavBar.vue"
import TestModal from "@/test/components/TestModal.vue"
import TestRecord from "@/test/components/TestRecord.vue"
import TestAudioPlayer from "@/test/components/TestAudioPlayer.vue"
// Site test views
import TestSite from "@/test/views/TestSite.vue"
import TestHome from "@/test/views/TestHome.vue"
import TestBooks from "@/test/views/TestBooks.vue"
import TestGames from "@/test/views/TestGames.vue"
import TestMovies from "@/test/views/TestMovies.vue"
import TestMusic from "@/test/views/TestMusic.vue"

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
      path: "/test",
      component: TestView,
      meta: { auth: false },
      children: [
        {
          path: "components",
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
              component: TestBooks,
            },
            {
              path: "games",
              component: TestGames,
            },
            {
              path: "movies",
              component: TestMovies,
            },
            {
              path: "music",
              component: TestMusic,
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

export default router;

// {
//   path: '/about',
//   name: 'about',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
// }
