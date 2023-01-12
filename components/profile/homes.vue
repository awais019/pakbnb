<template>
  <div
    class="w-70% min-h-80vh wrapper grid grid-cols-3 grid-rows-2 gap-x-2 p-3 overflow-auto"
  >
    <div
      v-if="homes.length"
      v-for="home in homes"
      :key="home.objectID"
      class="flex flex-col items-center shadow-md p-2 rounded-lg"
    >
      <home-card :home="home" />
      <button>Delete</button>
    </div>
    <div
      class="w-full rounded-lg shadow-md flex flex-col cursor-pointer hover:shadow-lg items-center justify-center"
      @click="openAddHome = true"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
      <span>{{ text }}</span>
    </div>
  </div>
  <profile-addhome v-if="openAddHome" @close="openAddHome = false" />
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";
  import Home from "~/types/home";

  const authStore = useAuthStore();
  const { $getHomeById } = useNuxtApp();
  const text = computed(() =>
    authStore.homeId?.length ? "Add another place" : "Become a host"
  );

  const openAddHome = ref(false);
  const homes = ref<Home[]>([]);
  onMounted(() => {
    if (authStore.homeId?.length) {
      authStore.homeId.forEach(async (id) => {
        const home = await $getHomeById(id);
        homes.value.push(home);
      });
    }
  });
</script>

<style lang="postcss" scoped>
  button {
    @apply gradient p-3 rounded-lg outline-none text-white font-medium;
  }
</style>
