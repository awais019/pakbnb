<template>
  <div class="relative w-80">
    <div class="w-full" @click="showDatePicker = true">
      <input :value="getRange()" class="w-full" />
    </div>
    <ClientOnly>
      <div
        v-if="showDatePicker"
        v-click-outside="() => (showDatePicker = false)"
        class="absolute top-11 right-0 left-0 z-20"
      >
        <DatePicker
          is-range
          v-model="range"
          color="yellow"
          timezone="UTC"
          :modelConfig="{ timeAdjust: '00:00:00' }"
          :min-date="new Date()"
          @input="showDatePicker = false"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
  import { emit } from "process";
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

  function getRange() {
    if (getStart()) {
      return getStart() + " to " + getEnd();
    } else return "";
  }

  const availability: string[] = [];
  const emits = defineEmits<{
    (e: "rangeSelected", availability: string[]): void;
  }>();

  watch(range, (newRange) => {
    const start = Math.floor(new Date(newRange.start).getTime() / 1000);
    const end = Math.floor(new Date(newRange.end).getTime() / 1000);

    for (let day = start; day <= end; day += 86400) {
      availability.push(day.toString());
    }
    emits("rangeSelected", availability);

    showDatePicker.value = false;
  });
</script>

<style lang="postcss" scoped>
  input {
    @apply block outline-none mb-2 bg-transparent border-1 border-gray-300  rounded-md p-2;
  }
</style>
