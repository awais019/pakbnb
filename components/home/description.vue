<template>
  <div class="bg-secondary-light rounded-lg my-10 py-8">
    <div>
      <div class="flex">
        <div class="flex-1 border-r-2 p-10">
          <h2>Description</h2>
          <div>{{ home.description }}</div>
        </div>
        <div class="flex-1 p-10">
          <h2>Features</h2>
          <div class="">
            <div v-for="(feature, index) in home.features" :key="index">
              {{ feature }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    home: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="postcss" scoped></style>
