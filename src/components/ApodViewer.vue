<template>
  <LoadingLayer v-if="loading" />
  <ErrorLayer v-else-if="errorMessage">{{ errorMessage }}</ErrorLayer>
  <div v-else class="c-apod-viewer">
    <PictureViewer
      v-if="apod.media_type === 'image'"
      :img-url="apod.url"
      :full-url="apod.hdurl"
    />
    <VideoViewer
      v-else-if="apod.media_type === 'video'"
      :video-url="apod.url"
    />
    <div class="headings">
      <h1>{{ apod.title }}</h1>
      <h2>{{ apod.date }}</h2>
    </div>
    <div class="c-apod-viewer__description"></div>
    <div class="c-apod-viewer__copyright"></div>
    <blockquote>
      <b>Explanation:</b> {{ apod.explanation }}
      <footer v-if="apod.copyright">
        <cite>© {{ apod.copyright }}</cite>
      </footer>
    </blockquote>
  </div>
</template>

<script>
import { useStore } from "@/stores/apod";
import LoadingLayer from "./LoadingLayer.vue";
import ErrorLayer from "./ErrorLayer.vue";
import PictureViewer from "./PictureViewer.vue";
import VideoViewer from "./VideoViewer.vue";
export default {
  components: {
    LoadingLayer,
    ErrorLayer,
    PictureViewer,
    VideoViewer,
  },
  props: {
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
    if (this.store.apodsAlreadyFetched[this.dateParam]) {
      this.apod = this.store.apodsAlreadyFetched[this.dateParam];
    } else {
      this.fetchApod();
    }
  },
  methods: {
    fetchApod() {
      this.loading = true;
      const url = this.dateParam
        ? this.store.getUrlWithDate(this.dateParam)
        : this.store.getTodayUrl;
      this.fetchUrl(url);
    },
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
