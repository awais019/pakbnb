<template>
  <div class="w-full px-20">
    <HomeGallery :images="(home?.images as string[])" />
    <HomeDetails :home="(home as Record<string, any>)" />
    <hr />
    <HomeDescription :home="(home as Record<string, any>)" />
    <hr />
    <Map :latlng="(home?._geoloc as Object)" />
  </div>
</template>

<script lang="ts" setup>
  import homes from "~/data/homes.json";

  const route = useRoute();
  const { id } = route.params;

  const home = homes.find((home) => home.objectID === id);
</script>

<style lang="postcss" scoped></style>
