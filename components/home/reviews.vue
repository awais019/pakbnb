<template>
  <div class="my-10 py-8">
    <div
      v-for="(review, index) in reviews"
      :key="index"
      class="grid grid-cols-2 mb-6 align-middle"
    >
      <div class="flex flex-col justify-between items-center border-secondary-light border-l-2">
        <img :src="review.reviewer.image" class="rounded-full" />
        <p class="font-bold">{{ review.reviewer.name }}</p>
      </div>
      <div class="flex flex-col bg-secondary-light p-5 rounded-lg">
        <div class="flex justify-between py-2">
          <p class="font-light">{{ shortDate(review.date) }}</p>
          <div class="flex">
            <icons-star v-for="i in review.rating" :key="i" />
          </div>
        </div>
        <home-short-text class="text-light" :text="review.comment" :target="150" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import shortDate from "~~/utils/shortDate";
  defineProps<{
    reviews: Record<string, any>[];
  }>();
</script>

<style lang="postcss" scoped></style>
