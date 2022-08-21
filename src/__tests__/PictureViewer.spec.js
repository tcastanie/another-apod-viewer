import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PictureViewer from "@/components/PictureViewer.vue";
import { imgUrl, fullUrl } from "./constantsMockups";

describe("PictureViewer", () => {
  it("renders properly", () => {
    const wrapper = mount(PictureViewer, {
      props: {
        imgUrl,
        fullUrl,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("display image correctly ", () => {
    const wrapper = mount(PictureViewer, {
      props: {
        imgUrl,
        fullUrl,
      },
    });
    expect(wrapper.vm.imgLoaded).toBe(false);
    wrapper.find("img").trigger("load");
    expect(wrapper.vm.imgLoaded).toBe(true);
  });
});
