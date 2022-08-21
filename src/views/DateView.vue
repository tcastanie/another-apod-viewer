<template>
  <ApodViewer :key="$route.params.date" :date-param="$route.params.date" />
  <div class="previous-next">
    <RouterLink :to="linkPreviousDay">Previous</RouterLink>
    <RouterLink v-if="isNextDayValid" :to="dateNextDay"> Next </RouterLink>
  </div>
</template>

<script>
import ApodViewer from "../components/ApodViewer.vue";
import { useStore } from "@/stores/apod";
export default {
  components: { ApodViewer },
  setup() {
    const store = useStore();
    return { store };
  },
  computed: {
    getPageDate() {
      var tzoffset = new Date().getTimezoneOffset() * 60000;
      const parts = this.$route.params.date.split("-");
      let date = new Date(parts[0], parts[1] - 1, parts[2]);
      date = new Date(date.getTime() - tzoffset);
      return date;
    },
    datePreviousDay() {
      const date = new Date(this.getPageDate);
      date.setDate(date.getDate() - 1);
      return date.toISOString().split("T")[0];
    },
    dateNextDay() {
      const date = new Date(this.getPageDate);
      date.setDate(date.getDate() + 1);
      return date.toISOString().split("T")[0];
    },
    linkPreviousDay() {
      return `/${this.datePreviousDay}`;
    },
    linkNextDay() {
      return `/${this.dateNextDay}`;
    },
    isNextDayValid() {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      const tomorrow = now.toISOString().split("T")[0];
      return tomorrow !== this.dateNextDay;
    },
  },
};
</script>

<style scoped>
.previous-next {
  display: flex;
  justify-content: space-between;
}
</style>
