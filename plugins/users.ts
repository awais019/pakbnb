import algoliasearch from "algoliasearch";

import User from "~/types/user";
import { useAuthStore } from "~/store/auth";

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
  });

  nuxtApp.provide("getUserById", async (id: string) => {
    const requestOptions = {
      filters: `objectID:${id}`,
      attributesToRetrieve: [
        "image",
        "name",
        "email",
        "joined",
        "homeId",
        "reviewCount",
        "description",
      ],
    };
    await search({ requestOptions, refresh: true });
    if (!result.value.hits.length) {
      return null;
    }
    return {
      objectID: result.value.hits[0].objectID,
      name: result.value.hits[0].name,
      email: result.value.hits[0].email,
      image: result.value.hits[0].image,
      joined: result.value.hits[0].joined,
      homeId: result.value.hits[0].homeId,
      reviewCount: result.value.hits[0].reviewCount,
      description: result.value.hits[0].description,
    };
  });

  nuxtApp.provide("updateUser", async (user: any) => {
    const authStore = useAuthStore();
    const requestOptions = {
      filters: `objectID:${user.objectID}`,
      attributesToRetrieve: [
        "image",
        "name",
        "email",
        "joined",
        "homeId",
        "reviewCount",
        "description",
      ],
    };
    index
      .partialUpdateObject(user)
      .wait()
      .then(() => {
        client.clearCache();
        index.search("", requestOptions).then((res) => {
          authStore.setUser({
            objectID: res.hits[0].objectID,
            name: res.hits[0].name,
            email: res.hits[0].email,
            image: res.hits[0].image,
            joined: res.hits[0].joined,
            homeId: res.hits[0].homeId,
            reviewCount: res.hits[0].reviewCount,
            description: res.hits[0].description,
          });
        });
      });
  });
});
