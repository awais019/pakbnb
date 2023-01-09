<template>
  <div class="relative flex mb-2">
    <div class="input mr-4 w-1/2" @click="showDatePicker = true">
      <input
        placeholder="Check in"
        :value="getStart()"
        class="w-full"
        @focus.native="$emit('dateFocus')"
      />
      <icons-calender />
    </div>
    <div class="input w-1/2" @click="showDatePicker = true">
      <input
        placeholder="Check out"
        :value="getEnd()"
        class="w-full"
        @focus.native="$emit('dateFocus')"
      />
      <icons-calender />
    </div>
    <ClientOnly>
      <div
        v-if="showDatePicker"
        v-click-outside="() => (showDatePicker = false)"
        class="absolute top-14 right-0 left-0"
      >
        <DatePicker
          is-range
          v-model="range"
          color="yellow"
          :columns="2"
          :min-date="new Date()"
          is-expanded
          @input="showDatePicker = false"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
  import { DatePicker } from "v-calendar";
  import "v-calendar/dist/style.css";

  const showDatePicker = ref(false);

  type rangeType = {
    start: Date | string;
    end: Date | string;
  };

  const range = ref<rangeType>({
    start: "",
    end: "",
  });

  function getStart() {
    if (typeof range.value.start == "string") return "";
    else return range.value.start.toDateString();
  }

  function getEnd() {
    if (typeof range.value.end == "string") return "";
    else return range.value.end.toDateString();
  }

  watch(range, (newRange) => {
    showDatePicker.value = false;
  });
</script>

<style lang="postcss" scoped></style>
