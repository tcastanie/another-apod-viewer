<template>
  <div class="c-search-input">
    <input v-model="isRange" type="checkbox" /> Range ? <br />
    <input v-model="searchInput1" type="date" min="1995-06-16" />
    <template v-if="isRange">
      <div>to</div>
      <input v-model="searchInput2" type="date" min="1995-06-20" />
    </template>
    <button @click="startSearch">go</button>
  </div>
</template>

<script>
export default {
  emits: ["searchResults"],
  data() {
    return {
      isRange: false,
      searchInput1: "",
      searchInput2: "",
    };
  },
  computed: {
    dateFirstDayOfCurrentMonth() {
      const date = new Date();
      date.setDate(1);
      return date.toISOString().split("T")[0];
    },
    dateYesterday() {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date.toISOString().split("T")[0];
    },
  },
  mounted() {
    this.searchInput1 = this.dateFirstDayOfCurrentMonth;
    this.searchInput2 = this.dateYesterday;
  },
  methods: {
    startSearch() {
      if (!this.isRange) {
        console.log(`searching for ${this.searchInput1}`);
        this.$router.push({
          name: "date",
          params: { date: this.searchInput1 },
        });
      } else {
        console.log(
          `searching for range ${this.searchInput1} to ${this.searchInput2}`
        );
        // TODO $emit array of apods
        this.$emit("searchResults", []);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.c-search-input {
  position: relative;
}
</style>
