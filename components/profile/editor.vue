<template>
  <div class="w-full wrapper py-5 px-14 flex flex-col items-center gap-6">
    <form>
      <div class="w-full flex flex-col gap-3 items-center">
        <label for="image">
          <span
            ><img :src="`${imageUrl}`" class="rounded-full w-32 h-32"
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
    @click="handleClick"
  >
    Save profile
  </button>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";

  const authStore = useAuthStore();
  const { $uploadImage } = useNuxtApp();

  const name = ref(authStore.name);
  const email = ref(authStore.email);
  const description = ref(authStore.description);
  const imageUrl = ref(authStore.imageUrl);

  authStore.$onAction(({ name, args, after, onError }) => {
    after(() => {
      if (name === "setUser") {
        emits("save-profile");
      }
    });
  });

  const emits = defineEmits<{
    (e: "save-profile"): void;
  }>();

  async function handleImageUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    $uploadImage("users/", file).then((url: string) => {
      imageUrl.value = url;
    });
  }

  async function handleClick() {
    const user = {
      objectID: authStore.id,
      name: name.value,
      email: email.value,
      description: description.value,
      image: imageUrl.value,
    };
    await authStore.updateUser(user);
  }
</script>

<style lang="postcss" scoped>
  input,
  textarea {
    @apply bg-white outline-hidden rounded-lg;
    border: 2px solid #ebebeb;
  }
  textarea {
    @apply p-2;
  }
</style>
