<template>
  <div class="w-1/2" v-if="homes">
    <search-map :homes="homes" />
  </div>
  <div class="w-1/2" v-if="homes">
    <layouts-header />
    <div></div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "search",
  });
  const route = useRoute();
  const { lat, lng } = route.query;

  const homes = ref();

  onMounted(async () => {
    const { $getHomesByLocation } = useNuxtApp();
    homes.value = await $getHomesByLocation({ lat, lng });
    console.log(homes.value);
  });
</script>

<style lang="postcss" scoped></style>
