<template>
  <header
    class="w-full h-20 flex justify-between items-center shadow px-20 text-primary font-normal"
  >
    <div
      class="flex justify-between items-center font-bold text-2xl text-secondary cursor-pointer"
    >
      <nuxt-link to="/">
        <img src="~/assets/images/logo.svg" alt="" class="w-10 h-10" />
      </nuxt-link>
      <span>pakbnb</span>
    </div>
    <nav class="h-12 flex items-center justify-between rounded-4xl nav">
      <span class="nav-item border-r-2">
        <nuxt-link to="/">Home</nuxt-link></span
      >
      <span class="nav-item border-r-2">
        <nuxt-link to="">About</nuxt-link></span
      >
      <span class="nav-item">
        <nuxt-link to="">Contact</nuxt-link>
      </span>
    </nav>
    <div
      class="rounded-4xl border-2 h-12 w-20 px-2 flex justify-between items-center cursor-pointer"
    >
      <span>
        <img src="~/assets/images/icons/user.svg" alt="" />
      </span>

      <span>
        <img src="~/assets/images/icons/menu.svg" alt="" />
      </span>
    </div>
  </header>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped>
  .router-link-active {
    @apply text-secondary;
  }
  .nav-item {
    @apply text-sm font-normal text-primary px-8 py-2 cursor-pointer;
  }
  .nav {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.04);
    @apply py-3;
    border: 1px solid #ebebeb;
  }
  .btn {
    @apply bg-transparent border-2 border-primary font-bold px-8 py-2 rounded;
  }
  .btn:hover {
    @apply bg-primary text-white;
  }
</style>
