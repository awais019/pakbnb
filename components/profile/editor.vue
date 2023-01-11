<template>
  <div class="w-full wrapper py-5 px-14 flex flex-col items-center gap-6">
    <form>
      <div class="w-full flex flex-col gap-3 items-center">
        <label for="image">
          <span
            ><img :src="`${authStore.imageUrl}`" class="rounded-full w-32 h-32"
          /></span>
          <input
            v-show="false"
            type="file"
            id="image"
            accept="image/*"
            @change="handleImageUpload"
          />
        </label>
        <div class="grid grid-cols-1 gap-3">
          <div class="flex items-center gap-2 text-neutral-500">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" />
          </div>
          <div class="flex items-center gap-2 text-neutral-500">
            <label for="email">Email</label>
            <input type="text" id="email" v-model="email" />
          </div>
          <div class="flex flex-col gap-2 text-neutral-500">
            <label for="description">Description</label>
            <textarea v-model="description" />
          </div>
        </div>
      </div>
    </form>
  </div>
  <button
    class="p-3 m-2 rounded-lg text-white font-medium gradient hover:bg-white hover:gradient-text hover:border-1 hover:border-primary"
    @click="handleClick()"
  >
    Save profile
  </button>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();

  const name = ref(authStore.name);
  const email = ref(authStore.email);
  const description = ref(authStore.description);

  function handleImageUpload() {
    console.log("handleImageUpload");
  }

  function handleClick() {
    console.log("save");
  }
</script>

<style lang="postcss" scoped>
  input,
  textarea {
    @apply bg-white outline-none rounded-lg;
    border: 2px solid #ebebeb;
  }
</style>
