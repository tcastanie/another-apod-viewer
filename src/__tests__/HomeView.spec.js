import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index.js";
import HomeView from "@/views/HomeView.vue";

let router;
beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes,
  });
});

describe("HomeView", async () => {
  it("renders properly", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
        stubs: {
          "apod-viewer": true,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("shows correct link", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
        stubs: {
          "apod-viewer": true,
        },
      },
    });
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split("T")[0];
    expect(wrapper.find("a").attributes("href")).toContain(yesterdayDate);
  });
});
