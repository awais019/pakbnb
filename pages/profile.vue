<template>
  <div class="w-full mt-20">
    <div class="w-full flex items-center">
      <div class="w-1/3 flex items-center flex-col">
        <profile-card />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";

  const authStore = useAuthStore();
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
  .info {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.04);
    border: 2px solid #ebebeb;
  }
</style>
