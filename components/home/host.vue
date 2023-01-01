<template>
  <div class="my-10">
    <div class="flex items-center gap-10">
      <div class="py-10">
        <img :src="host.image" class="rounded-full" />
      </div>
      <div>
        <h2>Hosted by {{ host.name }}</h2>
        <p>Joined in {{ shortDate(host.joined) }}</p>
        <p>{{ pluralize(host.reviewCount, "review") }}</p>
      </div>
    </div>
    <div>
      <home-short-text :text="host.description" :target="300" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    host: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="postcss" scoped></style>
