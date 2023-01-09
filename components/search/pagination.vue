<template>
  <ul class="flex justify-center items-center gap-5">
    <button
      :class="{ disabled: currentPage == 0 }"
      @click="setPage(currentPage - 1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
        />
      </svg>
    </button>
    <li
      v-for="page in nbPages"
      class="cursor-pointer"
      :class="{ 'gradient-text': page == currentPage + 1 }"
      @click="setPage(page - 1)"
    >
      {{ page }}
    </li>
    <button
      :class="{ disabled: currentPage == nbPages - 1 }"
      @click="setPage(currentPage + 1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
        />
      </svg>
    </button>
  </ul>
</template>

<script lang="ts" setup>
  const props = defineProps({
    nbPages: {
      type: Number,
      required: true,
    },
  });

  const currentPage = ref(0);

  const emits = defineEmits<{
    (e: "change", page: number): void;
  }>();

  function setPage(page: number) {
    if (page < 0 || page == props.nbPages || page == currentPage.value) return;
    currentPage.value = page;
    emits("change", page);
  }
</script>

<style lang="postcss" scoped>
  .disabled {
    @apply text-gray-400 cursor-not-allowed;
  }
</style>
