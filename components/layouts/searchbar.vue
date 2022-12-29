<template>
  <form
    class="flex py-6 px-8 bg-white shadow-custom my-auto rounded-2xl flex-wrap"
    @submit.prevent
  >
    <div class="input mb-2 mr-4 flex-1">
      <icons-search />
      <input type="search" placeholder="Enter location" class="w-full" />
    </div>
    <LayoutsDatePicker />
    <button class="gradient py-2 px-16 rounded-lg text-white text-xl mb-2">
      Search
    </button>
  </form>
</template>

<script lang="ts" setup></script>
<style lang="postcss"></style>
