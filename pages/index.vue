<template>
  <div class="max-w-4xl px-20 my-10 font-normal" v-if="homes">
    <h1 class="gradient-text">Search a best place</h1>
    <div v-if="homes" class="w-full grid grid-cols-6 gap-2.5 align-middle">
      <div v-for="home in homes" :key="home.objectID">
        <nuxt-link :to="`/home/${home.objectID}`">
          <home-card :home="home" />
        </nuxt-link>
      </div>
    </div>
  </div>
  <div v-else>loading...</div>
</template>

<script lang="ts" setup>
  import type Home from "~/types/home";

  definePageMeta({
    layout: "home",
  });

  const { $getHomes } = useNuxtApp();
  const homes = ref<Home[] | null>(null);
  onMounted(async () => {
    homes.value = await $getHomes();
  });
</script>

<style scoped></style>
