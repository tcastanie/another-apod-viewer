import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import DateView from "../views/DateView.vue";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export { routes };

export default router;
