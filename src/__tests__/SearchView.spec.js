import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index.js";
import SearchView from "@/views/SearchView.vue";
import { testList } from "./constantsMockups";

let router;
beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });
});

describe("SearchView", async () => {
  it("renders properly", async () => {
    router.push("/search");
    await router.isReady();
    const wrapper = mount(SearchView, {
      global: {
        plugins: [router],
        stubs: {
          "search-input": true,
          "search-list": true,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders properly", async () => {
    router.push("/search");
    await router.isReady();
    const wrapper = mount(SearchView, {
      global: {
        plugins: [router],
        stubs: {
          "search-input": true,
          "search-list": true,
        },
      },
    });
    wrapper.vm.updateList(testList);
    expect(wrapper.vm.apodList).toEqual(testList);
  });
});
