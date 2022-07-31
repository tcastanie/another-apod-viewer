<template>
  <ApodViewer :key="$route.params.date" :date-param="$route.params.date" />
  <div class="previous-next">
    <RouterLink :to="linkPreviousDay">Previous</RouterLink>
    <RouterLink v-if="isNextDayValid" :to="dateNextDay"> Next </RouterLink>
  </div>
</template>

<script>
import { useStore } from "@/stores/apod";
import ApodViewer from "../components/ApodViewer.vue";
export default {
  components: { ApodViewer },
  setup() {
    const store = useStore();
    return { store };
  },
  computed: {
    getPageDate() {
      const now = new Date();
      const parts = this.$route.params.date.split("-");
      const date = new Date(
        parts[0],
        parts[1] - 1,
        parts[2],
        now.getHours(),
        now.getMinutes()
      );
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
