<template>
  <div class="w-full px-20">
    <HomeGallery :images="(home?.images as string[])" />
    <HomeDetails :home="(home as Record<string, any>)" />
    <hr />
    <HomeDescription :home="(home as Record<string, any>)" />
    <hr />
    <Map :latlng="(home?._geoloc as Object)" />
    <hr />
    <HomeReviews :reviews="(homereviews as Record<string, any>[])" />
    <hr />
    <HomeHost :host="(host as Object)" />
  </div>
</template>

<script lang="ts" setup>
  const route = useRoute();
  const { id } = route.params;

  const { $getHomeById, $getReviewsByHomeId, $getUserByHomeId } = useNuxtApp();
  const home = await $getHomeById(id);
  const homereviews = await $getReviewsByHomeId(id);
  const host = await $getUserByHomeId(id);
</script>

<style lang="postcss" scoped></style>
