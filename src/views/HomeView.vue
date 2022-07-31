<template>
  <ApodViewer />
  <RouterLink :to="yesterdayLink">Previous</RouterLink>
</template>

<script>
import ApodViewer from "../components/ApodViewer.vue";
export default {
  components: { ApodViewer },
  computed: {
    dateYesterday() {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date.toISOString().split("T")[0];
    },
    yesterdayLink() {
      return `/${this.dateYesterday}`;
    },
  },
};
</script>
