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
    <search-pagination :nbPages="pages" @change="(page) => changePage(page)" />
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "search",
  });
  const route = useRoute();
  const { lat, lng } = route.query;
  let pages = ref(0);
  const homes = ref();

  async function changePage(page: number) {
    const { $getHomesByLocation } = useNuxtApp();
    const { data } = await $getHomesByLocation({ lat, lng }, page);
    homes.value = data;
  }

  onMounted(async () => {
    const { $getHomesByLocation } = useNuxtApp();
    const { data, nbPages } = await $getHomesByLocation({ lat, lng });
    homes.value = data;
    pages.value = nbPages;
  });
</script>

<style lang="postcss" scoped></style>
