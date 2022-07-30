import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DateView from "../views/DateView.vue";
import SearchView from "../views/SearchView.vue";
import AboutView from "../views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:date",
      name: "date",
      component: DateView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
