<template>
  <div class="c-search-list">
    <article
      v-for="apod in list"
      :key="apod.date"
      class="c-search-list__item"
      @click="openApod(apod)"
    >
      <div class="c-search-list__item-preview">
        <img :src="apod.thumbnail_url ?? apod.url" :alt="apod.title" />
      </div>
      <div class="c-search-list__item-date">{{ apod.date }}</div>
      <div class="c-search-list__item-title">{{ apod.title }}</div>
    </article>
  </div>
</template>

<script>
import { useStore } from "@/stores/apod";
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    openApod(apod) {
      console.log(`opening apod for ${apod}`);
      this.store.saveApod(apod);
      this.$router.push({ name: "date", params: { date: apod.date } });
    },
  },
};
</script>

<style lang="scss" scoped>
.c-search-list {
  position: relative;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover,
    &:active {
      background-color: var(--secondary);
      color: var(--secondary-inverse);
      transform: scale(101%);
    }
  }

  &__item-preview {
    max-width: 150px;
  }
}
</style>
