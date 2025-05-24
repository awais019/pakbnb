<template>
  <div class="w-80 relative">
    <input
      type="search"
      class="w-full"
      v-model="query"
      @focus.native="() => (isFocused = true)"
    />
    <div
      v-if="isFocused"
      class="absolute top-3/4 z-20 bg-white rounded-md shadow-custom inset-x-0"
      v-click-outside="() => (isFocused = false)"
    >
      <div
        v-for="suggestion in suggestions?.features"
        :key="suggestion.id"
        class="p-4 hover:bg-neutral-100"
        @click="
          () => {
            query = suggestion.place_name;
            isFocused = false;
            location = { lat: suggestion.center[1], lng: suggestion.center[0] };
            handleClick(suggestion.place_name, location);
          }
        "
      >
        {{ suggestion.place_name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type Places from "~~/types/places";
  const runtimeConfig = useRuntimeConfig();
  const access_token = runtimeConfig.public.mapbox.accessToken as string;
  const endpoint = "mapbox.places";

  const query = useDebouncedRef("", 200, false);
  const location = ref<{
    lat: number;
    lng: number;
  }>();
  const suggestions = ref<Places>();

  const isFocused = ref(false);

  const emits = defineEmits<{
    (e: "locationSelected", place_name: string, location: any): void;
  }>();

  function handleClick(place_name: string, location: any) {
    emits("locationSelected", place_name, location);
  }

  watch(query, async () => {
    const url = `https://api.mapbox.com/geocoding/v5/${endpoint}/${query.value}.json?access_token=${access_token}`;
    const { data } = await useFetch<Places>(url, {
      pick: ["features"],
    });
    suggestions.value = data.value as Places;
    if (!!!query.value) {
      location.value = undefined;
    }
  });
</script>

<style lang="postcss" scoped>
  input {
    @apply block outline-hidden mb-2 bg-transparent border-1 border-gray-300  rounded-md p-2;
  }
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
</style>
