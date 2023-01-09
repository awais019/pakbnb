<template>
  <form
    class="flex relative py-6 px-8 bg-white shadow-custom my-auto rounded-2xl flex-wrap"
    @submit.prevent="() => search()"
    @click.native="(e) => clicked(e)"
  >
    <div class="input mb-2 mr-4 flex-1">
      <icons-search />
      <input
        type="search"
        placeholder="Enter location"
        class="w-full"
        v-model="query"
        @focus.native="() => (isFocused = true)"
      />
      <icons-close v-if="!!query" @click="() => (query = '')" />
    </div>
    <DatePicker @dateFocus="isFocused = false" />
    <button class="gradient py-2 px-16 rounded-lg text-white text-xl mb-2 ml-4">
      Search
    </button>
    <div
      v-if="isFocused"
      class="absolute top-3/4 bg-white rounded-md shadow-custom inset-x-0"
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
          }
        "
      >
        {{ suggestion.place_name }}
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import Places from "~/types/places";

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
  function clicked(e: MouseEvent) {
    if (e.target instanceof HTMLFormElement) {
      isFocused.value = false;
    }
  }
  async function search() {
    const router = useRouter();
    if (location.value && query.value) {
      router.push({
        name: "search",
        query: {
          place: query.value,
          lat: location.value.lat,
          lng: location.value.lng,
        },
      });
    }
  }
</script>
<style lang="postcss" scoped>
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
</style>
