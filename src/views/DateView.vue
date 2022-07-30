<template>
  <ApodViewer :date-param="$route.params.date" />
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
};
</script>
