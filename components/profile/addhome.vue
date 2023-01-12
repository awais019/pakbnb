<template>
  <div
    class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25"
    @click="handleClick"
  >
    <div class="bg-white max-w-4xl w-full p-20 mx-20 rounded-2xl">
      <h2>Add a place for others</h2>
      <form @submit.prevent="submit" class="relative flex gap-6 justify-evenly">
        <div>
          Images: <br />
          <input type="file" accept="image/*" />
          <input type="file" accept="image/*" />
          <input type="file" accept="image/*" />
          <input type="file" accept="image/*" />
          <input type="file" accept="image/*" />
        </div>
        <div>
          Title: <br />
          <input type="text" class="w-80" />
          Description: <br />
          <textarea class="w-80" />
          Note: <br />
          <textarea class="w-80" />
        </div>
        <div>
          Features: <br />
          <input
            type="text"
            placeholder="Press enter after adding a feature"
            class="w-80"
          />
          Price Per Night <br />
          <input type="number" class="w-80" min="1" />
          Guests/ Rooms / Beds / Baths <br />
          <div class="flex gap-1">
            <input type="number" class="w-20" min="1" />
            <input type="number" class="w-20" min="1" />
            <input type="number" class="w-20" min="1" />
            <input type="number" class="w-20" min="1" />
          </div>
        </div>
        <div>
          Enter a location:
          <profile-locationselector />
          Avaibility Range:
          <profile-datepicker />
        </div>
        <input type="submit" value="Add" />
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  function submit() {
    console.log("submit");
  }
  const emits = defineEmits<{
    (e: "close"): void;
  }>();
  function handleClick() {
    emits("close");
  }
</script>

<style lang="postcss" scoped>
  input,
  textarea {
    @apply block outline-none mb-2 bg-transparent border-1 border-gray-300  rounded-md p-2;
  }
  input[type="submit"] {
    @apply absolute bottom-0 right-0 gradient text-white font-medium px-6 py-2 cursor-pointer hover:border-1 hover:border-primary;
  }
</style>
