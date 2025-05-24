<template>
  <div class="my-10">
    <div
      id="map"
      class="w-full h-96 rounded-xl overflow-hidden transform"
    ></div>
  </div>
</template>

<script lang="ts" setup>
  import "mapbox-gl/dist/mapbox-gl.css";
  import mapboxgl, { LngLatLike, Map } from "mapbox-gl";

  const props = defineProps({
    latlng: {
      type: Object,
      required: true,
    },
  });

  const runtimeConfig = useRuntimeConfig();

  mapboxgl.accessToken = runtimeConfig.public.mapbox.accessToken as string;

  let map: Map;
  function addMarker() {
    const markerBounds = new mapboxgl.LngLatBounds();

    const coords: LngLatLike = [props.latlng.lng, props.latlng.lat];
    const el = document.createElement("div");
    el.classList.add("marker");
    el.innerHTML = ``;

    new mapboxgl.Marker(el).setLngLat(coords).addTo(map);
    el.addEventListener("click", () => {
      map.flyTo({
        center: coords,
        zoom: 20,
        offset: [0, -100],
      });
    });
    markerBounds.extend(coords);
    map.fitBounds(markerBounds, { padding: 80, maxZoom: 15, linear: true });
  }

  onMounted(() => {
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 15,
      scrollZoom: true,
    });
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
      }),
      "bottom-left"
    );
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-left"
    );
    map.addControl(new mapboxgl.FullscreenControl(), "top-right");

    addMarker();
  });
</script>

<style lang="postcss">
  .mapboxgl-canvas {
    @apply focus:outline-none;
  }
  .mapboxgl-ctrl-group:not(:empty) {
    @apply shadow-md rounded-xl p-2;
  }

  .mapboxgl-ctrl-group button {
    @apply w-8 h-8 focus:outline-hidden transition-colors rounded-md;
  }
  .mapboxgl-ctrl-group button:focus:first-child,
  .mapboxgl-ctrl-group button:focus:last-child,
  .mapboxgl-ctrl-group button:focus:only-child {
    @apply rounded-md;
  }

  .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out .mapboxgl-ctrl-icon {
    @apply bg-minus-icon;
  }

  .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {
    @apply bg-plus-icon;
  }

  .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon {
    @apply bg-location-icon;
  }

  .mapboxgl-ctrl button.mapboxgl-ctrl-fullscreen .mapboxgl-ctrl-icon {
    @apply bg-arrows-expand-icon;
  }

  .mapboxgl-ctrl button.mapboxgl-ctrl-shrink .mapboxgl-ctrl-icon {
    @apply bg-arrows-shrink-icon;
  }

  .mapboxgl-ctrl-group button + button {
    @apply border-none;
  }

  .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl {
    @apply ml-6 mb-3;
  }

  .mapboxgl-ctrl-top-right .mapboxgl-ctrl {
    @apply mt-6 mr-6;
  }

  .mapboxgl-ctrl-attrib {
    @apply hidden;
  }

  .marker {
    @apply w-5 h-7 cursor-pointer bg-marker;
  }

  .marker:hover:before {
    @apply bg-opacity-40;
  }

  .marker:before,
  .marker:after {
    content: "";
    @apply absolute rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2;
  }

  .marker:before {
    @apply w-12 h-12 bg-primary bg-opacity-20 transition-colors;
  }
</style>
