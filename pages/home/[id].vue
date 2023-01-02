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
  import reviews from "~/data/reviews.json";
  import users from "~/data/users.json";

  const route = useRoute();
  const { id } = route.params;

  const { $getHomeById } = useNuxtApp();
  const home = await $getHomeById(id);

  const homereviews = reviews.filter((reviews) => reviews.homeId === id);

  const host = users.find((user) => user.homeId.includes(id as string));
</script>

<style lang="postcss" scoped></style>
