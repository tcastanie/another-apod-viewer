<template>
  <article class="c-error">
    <slot></slot>
  </article>
</template>

<style lang="scss" scoped>
.c-error {
  color: rgb(255 187 0);
  font-weight: bold;

  &::before {
    margin-right: 0.2em;
    content: "⚠️";
  }

  &::after {
    margin-left: 0.2em;
    content: "⚠️";
  }
}
</style>
