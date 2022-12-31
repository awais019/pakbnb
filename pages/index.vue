<template>
  <div class="max-w-4xl px-20 my-10 font-normal">
    <h1 class="gradient-text">Search a best place</h1>
    <div v-if="homes" class="w-full grid grid-cols-6 gap-2.5 align-middle">
      <div v-for="home in homes" :key="home.objectID">
        <nuxt-link :to="`/home/${home.objectID}`">
          <home-card :home="home" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import homes from "~/data/homes.json";
  definePageMeta({
    layout: "home",
  });
</script>

<style scoped></style>
