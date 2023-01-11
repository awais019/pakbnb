<template>
  <div class="w-full info py-5 px-14 flex flex-col items-center gap-6">
    <div class="w-full flex flex-col gap-3 items-center">
      <span
        ><img :src="`${authStore.imageUrl}`" class="rounded-full w-32 h-32"
      /></span>
      <span class="font-medium">{{ authStore.name }}</span>
    </div>
    <div class="flex w-full flex-col gap-8">
      <div class="text-neutral-500 flex justify-between w-full">
        <span>Email </span> <span>{{ authStore.email }}</span>
      </div>
      <div class="flex flex-col w-full text-neutral-500">
        <span>Description: </span>
        <home-short-text :text="description" :target="100" />
      </div>
    </div>
  </div>
  <button
    class="p-3 m-2 rounded-lg text-white font-medium gradient hover:bg-white hover:gradient-text hover:border-1 hover:border-primary"
    @click="handleClick()"
  >
    Edit profile
  </button>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~~/store/auth";

  const authStore = useAuthStore();

  const emits = defineEmits<{
    (e: "editProfile"): void;
  }>();

  const description = computed(() =>
    authStore.description
      ? authStore.description
      : "You haven't added any information about yourself yet."
  );
  function handleClick() {
    emits("editProfile");
  }
</script>
