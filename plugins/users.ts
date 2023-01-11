import algoliasearch from "algoliasearch";

import User from "~/types/user";

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

  const client = algoliasearch(
    "EPY4Z8GR7F",
    "adaa4dc231574144262554442d5a338d"
  );
  const index = client.initIndex("Users");
  nuxtApp.provide("addUser", async (user: User) => {
    await index.saveObject(user);
    console.log(user);
  });

  nuxtApp.provide("getUserById", async (id: string) => {
    const requestOptions = {
      filters: `objectID:${id}`,
      attributesToRetrieve: [
        "image",
        "name",
        "joined",
        "reviewCount",
        "description",
      ],
    };
    await search({ requestOptions });
    if (!result.value.hits.length) {
      return null;
    }
    return {
      objectID: result.value.hits[0].objectID,
      name: result.value.hits[0].name,
      image: result.value.hits[0].image,
      joined: result.value.hits[0].joined,
      reviewCount: result.value.hits[0].reviewCount,
      description: result.value.hits[0].description,
    };
  });
});
