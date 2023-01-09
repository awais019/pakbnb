<template>
  <div class="w-1/2" v-if="homes">
    <search-map :homes="homes" />
  </div>
  <div class="w-1/2" v-if="homes">
    <layouts-header />
    <div class="px-20 my-10">
      <div
        v-if="homes"
        class="w-full grid grid-cols-3 gap-x-2.5 gap-y-20 align-middle"
      >
        <div v-for="home in homes" :key="home.objectID">
          <nuxt-link :to="`/home/${home.objectID}`">
            <home-card :home="home" />
          </nuxt-link>
        </div>
      </div>
    </div>
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
  });
</script>

<style lang="postcss" scoped></style>
