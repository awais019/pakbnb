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
});
