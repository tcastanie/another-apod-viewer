<template>
  <form>
    <div class="grid">
      <label for="date1">
        {{
          isRange
            ? "Enter first date of the interval"
            : "Go to specific date picture"
        }}
        <input
          id="date1"
          v-model="searchInput1"
          name="date1"
          type="date"
          min="1995-06-16"
        />
      </label>
      <div v-if="!isRange"></div>
      <label v-if="isRange" for="date2">
        Enter second date of the interval
        <input
          id="date2"
          v-model="searchInput2"
          name="date2"
          type="date"
          min="1995-06-20"
        />
      </label>
    </div>
    <fieldset>
      <label for="range">
        <input
          id="range"
          v-model="isRange"
          type="checkbox"
          name="range"
          role="switch"
        />
        Search for a range of dates
      </label>
    </fieldset>
    <button
      :disabled="isRange && rangeBetweenDates > 20"
      @click.prevent="startSearch"
    >
      {{
        isRange
          ? rangeBetweenDates > 20
            ? "❌ Range is too big ! (> 20)"
            : "🔍 Search"
          : "🪐 Go"
      }}
    </button>
  </form>
  <LoadingLayer v-if="loading" />
  <ErrorLayer v-if="errorMessage">{{ errorMessage }}</ErrorLayer>
</template>

<script>
import { useStore } from "@/stores/apod";
import LoadingLayer from "./LoadingLayer.vue";
import ErrorLayer from "./ErrorLayer.vue";
export default {
  components: { LoadingLayer, ErrorLayer },
  emits: ["searchResults"],
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return {
      isRange: false,
      searchInput1: "",
      searchInput2: "",
      errorMessage: null,
      loading: false,
    };
  },
  computed: {
    dateFourDaysBefore() {
      const date = new Date();
      const day = date.getDate();
      date.setDate(day - 4);
      return date.toISOString().split("T")[0];
    },
    dateYesterday() {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date.toISOString().split("T")[0];
    },
    rangeBetweenDates() {
      const date1 = new Date(this.searchInput1);
      const date2 = new Date(this.searchInput2);
      const diff = Math.abs(date2.getTime() - date1.getTime());
      const days = Math.ceil(diff / (1000 * 3600 * 24));
      return days;
    },
  },
  mounted() {
    this.searchInput1 = this.dateFourDaysBefore;
    this.searchInput2 = this.dateYesterday;
  },
  methods: {
    startSearch() {
      if (!this.isRange) {
        this.$router.push({
          name: "date",
          params: { date: this.searchInput1 },
        });
      } else {
        this.loading = true;
        const url = this.store.getUrlWithRange(
          this.searchInput1,
          this.searchInput2
        );
        fetch(url)
          .then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
              const error1 = data && (data.msg || data.error.code);
              const error2 = `${response.statusText} (${response.status})`;
              return Promise.reject(new Error(`${error1}. ${error2}`));
            }
            this.loading = false;
            this.$emit("searchResults", data);
          })
          .catch((error) => {
            this.errorMessage = error;
            this.loading = false;
          });
      }
    },
  },
};
</script>
