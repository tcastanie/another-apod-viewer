import { beforeEach, describe, expect, it, vi } from "vitest";
import { createRouter, createWebHistory } from "vue-router";
import SearchList from "@/components/SearchList.vue";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { routes } from "@/router/index.js";
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
    const push = vi.spyOn(router, "push");
    await wrapper.findAll("article")[0].trigger("click");
    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "date",
        params: {
          date: testList[0].date,
        },
      }),
    );
  });
});
