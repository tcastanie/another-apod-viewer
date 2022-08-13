<template>
  <LoadingLayer v-if="!imgLoaded" />
  <div class="c-picture-viewer">
    <Transition>
      <a v-show="imgLoaded" class="c-picture-viewer__img" :href="fullUrl">
        <img :src="imgUrl" @load="onImgLoad" />
      </a>
    </Transition>
  </div>
</template>

<script>
import LoadingLayer from "./LoadingLayer.vue";
export default {
  components: {
    LoadingLayer,
  },
  props: {
    imgUrl: {
      type: String,
      default: "",
    },
    fullUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      imgLoaded: false,
    };
  },
  methods: {
    onImgLoad() {
      this.imgLoaded = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.c-picture-viewer {
  display: flex;
  align-items: center;
  justify-content: center;

  &__img {
    img {
      max-width: 100%;
      height: auto;
      max-height: var(--max-picture-height);
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
