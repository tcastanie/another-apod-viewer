<template>
  <LoadingLayer v-if="loading" />
  <div v-else-if="errorMessage" class="g-error">{{ errorMessage }}</div>
  <div v-else class="c-apod-viewer">
    <PictureViewer :img-url="apod.url" :full-url="apod.hdurl" />
    <h1 class="c-apod-viewer__title">{{ apod.title }}</h1>
    <div class="c-apod-viewer__date">{{ apod.date }}</div>
    <div class="c-apod-viewer__description">{{ apod.explanation }}</div>
    <div class="c-apod-viewer__copyright">{{ apod.copyright }}</div>
  </div>
</template>

<script>
import { useStore } from "@/stores/apod";
import LoadingLayer from "./LoadingLayer.vue";
import PictureViewer from "./PictureViewer.vue";
export default {
  components: {
    LoadingLayer,
    PictureViewer,
  },
  props: {
    apodProp: {
      type: Object,
      default: null,
    },
    dateParam: {
      type: String,
      default: null,
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return {
      loading: false,
      errorMessage: null,
      apod: {},
    };
  },
  created() {
    if (this.apodProp !== null) {
      this.apod = this.apodProp;
    } else {
      this.loading = true;
      const url = this.dateParam
        ? this.store.getUrlWithDate(this.dateParam)
        : this.store.getTodayUrl;
      this.fetchUrl(url);
    }
  },
  methods: {
    fetchUrl(url) {
      fetch(url)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            const error1 = data && (data.msg || data.error.code);
            const error2 = `${response.statusText} (${response.status})`;
            return Promise.reject(new Error(`${error1}. ${error2}`));
          }
          this.apod = data;
          this.loading = false;
        })
        .catch((error) => {
          this.errorMessage = error;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.c-apod-viewer {
  position: relative;
}
</style>
