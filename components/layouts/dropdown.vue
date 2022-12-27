<template>
  <div
    class="absolute bg-white w-72 py-2 shadow-dropdown rounded-2xl right-20 top-16"
    v-click-outside="() => handleClickOutside()"
  >
    <div class="flex flex-col">
      <div
        v-for="item in menuItems"
        :key="item.name"
        class="nav-item"
        @click="$emit('click', item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from "vue";
  defineProps({
    menuItems: {
      type: Array as PropType<{ name: string }[]>,
      required: true,
    },
  });

  const emits = defineEmits(["outsideClick"]);
  function handleClickOutside() {
    emits("outsideClick");
  }
</script>

<style lang="postcss" scoped>
  .nav-item {
    @apply text-base font-normal text-primary px-8 py-2 cursor-pointer;
  }
  .nav-item:hover {
    @apply bg-neutral-100;
  }
</style>
