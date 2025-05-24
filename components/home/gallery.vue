<template>
  <div class="mt-20">
    <div class="masonry">
      <div
        v-for="image in images"
        :key="image"
        :style="`background-image: url(${image})`"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { PropType } from "vue";
  defineProps({
    images: {
      type: Array as PropType<string[]>,
      required: true,
    },
  });
</script>

<style lang="postcss" scoped>
  .masonry {
    @apply grid grid-cols-4 grid-rows-2 gap-6;
    grid-template-rows: 280px 280px;
    > div {
      background-size: cover;
      &:nth-child(1) {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
        @apply rounded-l-3xl;
      }

      &:nth-child(2) {
        grid-column: 3 / 4;
      }

      &:nth-child(3) {
        grid-column: 4 / 5;
        @apply rounded-tr-3xl;
      }

      &:nth-child(4) {
        grid-column: 3 / 4;
        grid-row: 2 / 3;
      }

      &:nth-child(5) {
        grid-column: 4 / 5;
        grid-row: 2 / 3;
        @apply rounded-br-3xl;
      }
    }
  }
</style>
