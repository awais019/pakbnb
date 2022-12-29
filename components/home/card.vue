<template>
  <div class="flex flex-col justify-between h-full">
    <img :src="home.images[0]" class="max-w-full h-full rounded-lg" />
    <br />
    <div>
      {{ home.location.address }} {{ home.location.city }}
      {{ home.location.state }} <br />
      <span class="text-neutral-3000">{{ home.guests }} guests</span> <br />
      <span class="font-medium">${{ home.pricePerNight }}</span> night <br />
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    home: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="postcss" scoped></style>
