import { describe, it, expect, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index.js";
import SearchList from "@/components/SearchList.vue";
import { createTestingPinia } from "@pinia/testing";
import { testList } from "./constantsMockups";

let router;
beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes,
  });
});

describe("SearchList", () => {
  it("renders properly", () => {
    const wrapper = mount(SearchList, {
      props: {
        list: testList,
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("open picture correctly", async () => {
    router.push("/search");
    await router.isReady();
    const wrapper = mount(SearchList, {
      props: {
        list: testList,
      },
      global: {
        plugins: [router, createTestingPinia()],
      },
    });
    wrapper.findAll("article")[0].trigger("click");
    await flushPromises();
    expect(wrapper.vm.$route.path).toBe(`/${testList[0].date}`);
  });
});
