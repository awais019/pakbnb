<template>
  <div
    class="absolute bg-white w-72 py-4 shadow-custom rounded-2xl right-20 top-16"
    v-click-outside="() => handleClickOutside()"
  >
    <div class="flex flex-col">
      <div v-for="item in menuItems" :key="item.name">
        <nuxt-link
          v-if="!!item.link"
          :to="`${item.link}`"
          class="nav-item block"
          >{{ item.name }}</nuxt-link
        >
        <div v-else @click="handleClick(item.name)" class="nav-item">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { PropType } from "vue";
  defineProps({
    menuItems: {
      type: Array as PropType<{ name: string; link: string | null }[]>,
      required: true,
    },
  });

  const emits = defineEmits<{
    (e: "outsideClick"): void;
    (e: "openPopup", name: string): void;
  }>();
  function handleClickOutside() {
    emits("outsideClick");
  }
  function handleClick(name: string) {
    emits("openPopup", name);
  }
</script>

<style lang="postcss" scoped>
  .nav-item {
    @apply text-base font-normal text-secondary px-8 py-2 cursor-pointer;
  }
  .nav-item:hover {
    @apply bg-neutral-100;
  }
</style>
