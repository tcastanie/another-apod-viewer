<template>
  <!-- <ApodViewer v-if="" :apod-prop="" /> -->
  <ApodViewer v-if="$route.params.date" :date-param="$route.params.date" />
  <!-- TODO : 👆 replace v-if by v-else-if  -->
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
