export default defineNuxtPlugin((nuxtApp) => {
  const { result, search } = useAlgoliaSearch("Homes");
  nuxtApp.provide("getHomes", async () => {
    await search({});
    return result.value.hits;
  });

  nuxtApp.provide("getHomeById", async (id: string) => {
    const requestOptions = {
      filters: `objectID:${id}`,
    };
    await search({ requestOptions });

    return result.value.hits[0];
  });

  nuxtApp.provide(
    "getHomesByLocation",
    async (latlng: { lat: number; lng: number }, page = 0) => {
      const requestOptions = {
        hitsPerPage: 6,
        page,
        aroundLatLng: `${latlng.lat}, ${latlng.lng}`,
        aroundRadius: 20000,
      };
      await search({ requestOptions });
      return { data: result.value.hits, nbPages: result.value.nbPages };
    }
  );
});
