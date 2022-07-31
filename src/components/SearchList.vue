<template>
  <div class="c-search-list">
    <article
      v-for="apod in list"
      :key="apod.date"
      class="c-search-list__item"
      @click="openApod(apod)"
    >
      <div
        class="c-search-list__item-preview"
        :style="{ backgroundImage: `url(${apod.thumbnail_url ?? apod.url})` }"
        :alt="apod.title"
      ></div>
      <h5>{{ apod.title }}</h5>
      <small>{{ apod.date }}</small>
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
      this.store.saveApod(apod);
      this.$router.push({ name: "date", params: { date: apod.date } });
    },
  },
};
</script>

<style lang="scss" scoped>
.c-search-list {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  &__item {
    display: grid;
    margin: 0;
    cursor: pointer;
    grid-column-gap: 10px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    transition: all 0.2s ease-in-out;

    &:hover,
    &:active {
      background-color: var(--secondary);
      color: var(--secondary-inverse);
      transform: scale(101%);
    }
  }

  &__item-preview {
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    grid-area: 1 / 1 / 3 / 2;
  }
}
</style>
