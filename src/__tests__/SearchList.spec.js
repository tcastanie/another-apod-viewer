import { beforeEach, describe, expect, it } from "vitest";
import { createRouter, createWebHistory } from "vue-router";
import { flushPromises, mount } from "@vue/test-utils";
import SearchList from "@/components/SearchList.vue";
import { createTestingPinia } from "@pinia/testing";
import { routes } from "@/router/index.js";
import { testList } from "./constantsMockups";

let router;
beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
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
