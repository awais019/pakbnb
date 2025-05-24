import algoliasearch from "algoliasearch";

export default defineNuxtPlugin((nuxtApp) => {
  const { result, search } = useAlgoliaSearch("Homes");
  let id = 0;
  const client = algoliasearch(
    "EPY4Z8GR7F",
    "adaa4dc231574144262554442d5a338d"
  );
  const index = client.initIndex("Homes");

  nuxtApp.provide("getHomes", async () => {
    await search({ query: "" });
    return result.value.hits;
  });

  nuxtApp.provide("getHomeById", async (id: string) => {
    const requestOptions = {
      filters: `objectID:${id}`,
      query: "",
    };
    await search(requestOptions);

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
        query: "",
      };
      await search(requestOptions);
      return { data: result.value.hits, nbPages: result.value.nbPages };
    }
  );
  nuxtApp.provide("addHome", (home: any) => {
    index.saveObject({ ...home, objectID: ++id });
    return id;
  });
  nuxtApp.provide(
    "removeHome",
    async (id: string) => await index.deleteObject(id)
  );
});
