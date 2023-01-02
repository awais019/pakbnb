export default defineNuxtPlugin((nuxtApp) => {
  const { result, search } = useAlgoliaSearch("Users");

  nuxtApp.provide("getUserByHomeId", async (homeId: string) => {
    const requestOptions = {
      filters: `homeId:${homeId}`,
      attributesToRetrieve: [
        "image",
        "name",
        "joined",
        "reviewCount",
        "description",
      ],
    };
    await search({ requestOptions });
    return result.value.hits[0];
  });
});
