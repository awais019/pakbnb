<template>
  <div
    class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25"
    @click="handleClick"
  >
    <div
      class="bg-white max-w-4xl w-full p-20 mx-20 rounded-2xl"
      @click="(e) => e.stopPropagation()"
    >
      <h2>Add a place for others</h2>
      <form @submit.prevent="submit" class="relative flex gap-6 justify-evenly">
        <div>
          Images: <br />
          <input type="file" accept="image/*" @change="uploadImage" required />
          <input type="file" accept="image/*" @change="uploadImage" required />
          <input type="file" accept="image/*" @change="uploadImage" required />
          <input type="file" accept="image/*" @change="uploadImage" />
          <input type="file" accept="image/*" @change="uploadImage" required />
        </div>
        <div>
          Title: <br />
          <input type="text" class="w-80" v-model="home.title" required />
          Description: <br />
          <textarea class="w-80" v-model="home.description" required />
          Note: <br />
          <textarea class="w-80" v-model="home.note" required />
        </div>
        <div>
          Features: <br />
          <input
            type="text"
            placeholder="Press enter after adding a feature"
            class="w-80"
            v-model="feature"
            @keydown="
              (e) => {
                if (e.key === 'Enter') pushFeature();
              }
            "
          />
          <div>
            <span
              v-for="(feature, index) in home.features"
              :key="index"
              class="bg-slate-100 px-2 py-1 rounded-lg mr-1"
              >{{ feature }}</span
            >
          </div>
          Price Per Night <br />
          <input
            type="number"
            class="w-80"
            min="1"
            v-model="home.pricePerNight"
          />
          Guests/ Rooms / Beds / Baths <br />
          <div class="flex gap-1">
            <input type="number" class="w-20" min="1" v-model="home.guests" />
            <input type="number" class="w-20" min="1" v-model="home.bedrooms" />
            <input type="number" class="w-20" min="1" v-model="home.beds" />
            <input type="number" class="w-20" min="1" v-model="home.bathrooms" />
          </div>
        </div>
        <div>
          Enter a location:
          <profile-locationselector
            @location-selected="
              (place_name, location) => {
                home.location = place_name;
                home._geoloc = location;
              }
            "
          />
          Avaibility Range:
          <profile-datepicker
            @range-selected="
              (availability) => {
                home.availability = availability;
              }
            "
          />
        </div>
        <input type="submit" value="Add" />
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";

  const home = reactive({
    images: [] as string[],
    title: "",
    description: "",
    note: "",
    features: [] as string[],
    pricePerNight: 0,
    guests: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    reviewValue: 0,
    reviewCount: 0,
    location: "",
    _geoloc: {
      lat: 0,
      lng: 0,
    },
    availability: [] as string[],
  });

  const feature = ref("");

  const { $uploadImage, $addHome } = useNuxtApp();
  const authStore = useAuthStore();

  async function uploadImage(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    $uploadImage("homes/", file).then((url: string) => {
      home.images.push(url);
    });
  }

  function pushFeature() {
    if (feature.value === " ") feature.value = "";
    feature.value.replace(/\s+/g, "");
    home.features.push(feature.value);
    feature.value = "";
  }

  async function submit() {
    const id = await $addHome(home);
    let homeId = authStore.homeId;
    homeId.push(id);
    homeId = [ ...new Set(homeId)]
    authStore.updateUser({
      objectID: authStore.objectID,
      homeId,
    });
    emits("close");
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
