<template>
  SEARCH
  <SearchInput @search-results="updateList" />
  <SearchList :list="apodList" />
</template>

<script>
import SearchInput from "../components/SearchInput.vue";
import SearchList from "../components/SearchList.vue";
export default {
  components: {
    SearchInput,
    SearchList,
  },
  data() {
    return {
      apodList: [],
    };
  },
  computed: {
    dateToday() {
      const date = new Date();
      return date.toISOString().split("T")[0];
    },
  },
  methods: {
    updateList(e) {
      this.apodList = e;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-search {
  position: relative;
}
</style>
