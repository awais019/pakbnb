export default defineNuxtPlugin((nuxtApp) => {
  const { result, search } = useAlgoliaSearch("Reviews");
  nuxtApp.provide("getReviewsByHomeId", async (homeId: string) => {
    const requestOptions = {
      filters: `homeId:${homeId}`,
    };
    await search({ requestOptions });
    return result.value.hits;
  });
});
