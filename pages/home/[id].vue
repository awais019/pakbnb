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
  </div>
</template>

<script lang="ts" setup>
  import homes from "~/data/homes.json";
  import reviews from "~/data/reviews.json";

  const route = useRoute();
  const { id } = route.params;

  const home = homes.find((home) => home.objectID === id);
  const homereviews = reviews.filter((reviews) => reviews.homeId === id);
</script>

<style lang="postcss" scoped></style>
