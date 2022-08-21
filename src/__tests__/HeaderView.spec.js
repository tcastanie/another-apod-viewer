import { beforeEach, describe, expect, it } from "vitest";
import { createRouter, createWebHistory } from "vue-router";
import HeaderView from "@/views/HeaderView.vue";
import { mount } from "@vue/test-utils";
import { routes } from "@/router/index.js";

let router;
beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes,
  });
});

describe("HeaderView", async () => {
  it("renders properly", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = mount(HeaderView, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.text()).toContain("Another APOD viewer");
    expect(wrapper.text()).toContain("Home");
    expect(wrapper.text()).toContain("Search");
    expect(wrapper.text()).toContain("About");
  });
});
