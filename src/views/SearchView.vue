<template>
  <h1>Search</h1>
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
  methods: {
    updateList(e) {
      this.apodList = e;
    },
  },
};
</script>
