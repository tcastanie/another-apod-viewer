import { beforeEach, describe, expect, it } from "vitest";
import { createRouter, createWebHistory } from "vue-router";
import { flushPromises, mount } from "@vue/test-utils";
import SearchInput from "@/components/SearchInput.vue";
import { createTestingPinia } from "@pinia/testing";
import { routes } from "@/router/index.js";

let router;
beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes,
  });
});

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayDate = yesterday.toISOString().split("T")[0];
const fourDaysBefore = new Date();
fourDaysBefore.setDate(fourDaysBefore.getDate() - 4);
const fourDaysBeforeDate = fourDaysBefore.toISOString().split("T")[0];

describe("SearchInput", () => {
  it("renders properly", () => {
    const wrapper = mount(SearchInput, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("has correct values", async () => {
    const wrapper = mount(SearchInput, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.vm.searchInput1).toBe(fourDaysBeforeDate);
    expect(wrapper.vm.searchInput2).toBe(yesterdayDate);
    expect(wrapper.vm.rangeBetweenDates).toBe(3);
    expect(wrapper.find("button").attributes("disabled")).toBeUndefined();
    expect(wrapper.find("button").text()).toContain("Go");

    const date1 = "2020-01-01";
    const date2 = "2020-01-08";
    await wrapper.setData({
      searchInput1: date1,
      searchInput2: date2,
    });
    expect(wrapper.vm.rangeBetweenDates).toBe(7);

    await wrapper.find("#range").setValue(true);
    await wrapper.find("#date1").setValue("2022-01-01");
    await wrapper.find("#date2").setValue("2022-01-12");
    expect(wrapper.vm.searchInput1).toBe("2022-01-01");
    expect(wrapper.vm.searchInput2).toBe("2022-01-12");
    expect(wrapper.vm.rangeBetweenDates).toBe(11);
  });

  it("disable search button correctly", async () => {
    const wrapper = mount(SearchInput, {
      global: {
        plugins: [createTestingPinia()],
      },
      computed: {
        rangeBetweenDates() {
          return 25;
        },
      },
    });
    await wrapper.find("#range").setValue(true);
    expect(wrapper.find("button").attributes("disabled")).toBe("");
    expect(wrapper.find("button").text()).toContain("Range is too big");
  });

  it("open singnle apod correctly", async () => {
    router.push("/search");
    await router.isReady();
    const wrapper = mount(SearchInput, {
      global: {
        plugins: [router, createTestingPinia()],
      },
    });
    await wrapper.find("button").trigger("click");
    await flushPromises();
    expect(wrapper.vm.$route.path).toBe(`/${fourDaysBeforeDate}`);
  });

  it("search apods in range correctly", async () => {
    router.push("/search");
    await router.isReady();
    const wrapper = mount(SearchInput, {
      global: {
        plugins: [router, createTestingPinia({ stubActions: false })],
      },
    });
    await wrapper.find("#range").setValue(true);
    await wrapper.find("button").trigger("click");
    await flushPromises();
    // Check if the apods are correctly loaded
  });
});
