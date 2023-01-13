<template>
  <div class="my-10 flex justify-between items-center">
    <div>
      <div>
        <h1>{{ home.title }}</h1>
        <div>
          <div v-if="typeof home.location == 'object'">
            {{ home.location.address }} {{ home.location.city }}
            {{ home.state }} {{ home.country }}
          </div>
          <div v-else>
            {{ home.location }}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <IconsStar /> <span>{{ home.reviewValue }}</span>
          <span>{{ pluralize(home.reviewCount, "review") }}</span>
        </div>
      </div>
      <div>
        {{ pluralize(home.guests, "guest") }} &middot;
        {{ pluralize(home.bedrooms, "room") }} &middot;
        {{ pluralize(home.beds, "bed") }} &middot;
        {{ pluralize(home.bathrooms, "bath") }}
      </div>
    </div>
    <div
      class="shadow-custom border-1.5 rounded-2xl flex flex-col justify-between p-10 gap-5"
    >
      <div>${{ home.pricePerNight }}<span> / night</span></div>
      <DatePicker />
      <button
        class="w-full gradient text-white rounded-lg h-10"
        @click="handleClick"
      >
        Request to book!
      </button>
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
  async function handleClick() {
    const res = await $fetch("/api/checkout", {
      method: "POST",
      body: {
        nights: 3,
      },
    });

    window.location.assign(res.url as string);
  }
</script>

<style lang="postcss" scoped></style>
