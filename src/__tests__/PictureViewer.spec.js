import { describe, expect, it } from "vitest";
import { fullUrl, imgUrl } from "./constantsMockups";
import PictureViewer from "@/components/PictureViewer.vue";
import { mount } from "@vue/test-utils";

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
