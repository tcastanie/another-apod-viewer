import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PictureViewer from "../PictureViewer.vue";

const imgUrl =
  "https://apod.nasa.gov/apod/image/2207/SaturnIR_CassiniKakitsev_960.jpg";
const fullUrl =
  "https://apod.nasa.gov/apod/image/2207/SaturnIR_CassiniKakitsev_1024.jpg";

describe("PictureViewer", () => {
  it("renders properly", () => {
    const wrapper = mount(PictureViewer, {
      props: {
        imgUrl: imgUrl,
        fullUrl: fullUrl,
      },
    });
    expect(wrapper.find("a").html()).toContain(`href="${fullUrl}"`);
    expect(wrapper.find("img").html()).toContain(`src="${imgUrl}"`);
  });
});
