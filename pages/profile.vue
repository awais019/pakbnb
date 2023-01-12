<template>
  <div class="w-full mt-20">
    <div class="w-full flex gap-2">
      <div class="w-30% flex items-center flex-col">
        <profile-card v-if="!edit" @edit-profile="edit = true" />
        <profile-editor v-else @save-profile="edit = false" />
      </div>
      <profile-homes />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";

  const authStore = useAuthStore();
  const edit = ref(false);
  const router = useRouter();
  const loggedIn = computed(() => authStore.loggedIn);

  watch(loggedIn, (val) => {
    if (!val) {
      router.push("/");
    }
  });

  onMounted(() => {
    if (!loggedIn.value) {
      router.push("/");
    }
  });
</script>

<style lang="postcss">
  .wrapper {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.04);
    border: 2px solid #ebebeb;
  }
</style>
