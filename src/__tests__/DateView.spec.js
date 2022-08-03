import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router/index.js";
import { createTestingPinia } from "@pinia/testing";
import DateView from "@/views/DateView.vue";

let router;
beforeEach(async () => {
  router = createRouter({
    history: createWebHistory(),
    routes: routes,
  });
});

const today = new Date();
const todayDate = today.toISOString().split("T")[0];
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayDate = yesterday.toISOString().split("T")[0];
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowDate = tomorrow.toISOString().split("T")[0];

const testRoute = `/${todayDate}`;
describe("DateView", async () => {
  it("renders properly", async () => {
    router.push(testRoute);
    await router.isReady();
    const wrapper = mount(DateView, {
      global: {
        plugins: [router, createTestingPinia()],
        stubs: {
          "apod-viewer": true,
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("have correct links", async () => {
    router.push(testRoute);
    await router.isReady();
    const wrapper = mount(DateView, {
      global: {
        plugins: [router, createTestingPinia()],
        stubs: {
          "apod-viewer": true,
        },
      },
    });
    expect(wrapper.vm.linkPreviousDay).toContain(yesterdayDate);
    expect(wrapper.findAll("a")[0].attributes("href")).toContain(yesterdayDate);
    expect(wrapper.vm.linkNextDay).toContain(tomorrowDate);
  });

  it("displays correct links", async () => {
    router.push(testRoute);
    await router.isReady();
    const wrapper = mount(DateView, {
      global: {
        plugins: [router, createTestingPinia()],
        stubs: {
          "apod-viewer": true,
        },
      },
    });
    expect(wrapper.findAll("a")[0].attributes("href")).toContain(yesterdayDate);
    expect(wrapper.vm.isNextDayValid).toBe(false);
  });
});
