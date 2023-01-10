<template>
  <div class="max-w-4xl relative w-full h-full 4xl:m-auto overflow-x-auto">
    <layouts-header :is-sticky="false" />
    <div class="max-w-2xl m-auto">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped></style>
