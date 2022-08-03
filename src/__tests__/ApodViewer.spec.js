import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ApodViewer from "@/components/ApodViewer.vue";
import { createTestingPinia } from "@pinia/testing";
import { testList } from "./constantsMockups";

describe("ApodViewer", () => {
  it("renders properly", () => {
    const wrapper = mount(ApodViewer, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders properly", () => {
    const wrapper = mount(ApodViewer, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              apod: { apodsAlreadyFetched: testList[0] },
            },
          }),
        ],
      },
    });
    // TODO
    expect(wrapper.html()).toMatchSnapshot();
  });
});
