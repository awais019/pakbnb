<template>
  <div class="w-full h-full">
    <div id="map" class="w-full h-full"></div>
    <template v-show="false">
      <home-card :home="currentPopupEl" ref="popupEl" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import type { PropType } from "vue";
  import "mapbox-gl/dist/mapbox-gl.css";
  import mapboxgl, { LngLatLike, Map, Marker, Popup } from "mapbox-gl";

  import HomeCard from "~/components/home/card.vue";

  const props = defineProps({
    homes: {
      type: Array as PropType<any>,
      required: true,
    },
  });

  const runtimeConfig = useRuntimeConfig();

  mapboxgl.accessToken = runtimeConfig.public.mapbox.accessToken as string;

  const popupEl = ref<typeof HomeCard>();
  const currentPopupEl = ref();
  let map: Map;
  const markers: Marker[] = [];
  const popup: Popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    offset: 12,
    maxWidth: "200px",
  });
  let lastClickedMarker: Element;

  function addMarkers() {
    const markerBounds = new mapboxgl.LngLatBounds();
    props.homes.forEach((home: any) => {
      const coords: LngLatLike = [home._geoloc.lng, home._geoloc.lat];

      const el = document.createElement("div");
      el.classList.add("marker");

      const marker = new mapboxgl.Marker(el).setLngLat(coords).addTo(map);
      home.marker = marker;
      markers.push(marker);

      el.addEventListener("click", () => onMarkerClick(marker, home));

      markerBounds.extend(coords);
    });

    map.fitBounds(markerBounds, { padding: 80, maxZoom: 15, linear: true });
  }

  function updateMarkerState(marker: Marker) {
    if (lastClickedMarker) {
      lastClickedMarker.classList.remove("marker-active");
    }
    const markerEl = marker.getElement();
    markerEl.classList.add("marker-active");

    lastClickedMarker = markerEl;
  }

  function updatePopup(marker: Marker) {
    if (popupEl.value) {
      popup
        .setLngLat(marker.getLngLat())
        .setDOMContent(popupEl.value.$el)
        .addTo(map);
    }
  }

  function flyToMarker(marker: Marker) {
    map.flyTo({
      center: marker.getLngLat(),
      zoom: 20,
      offset: [0, -100],
    });
  }

  function onMarkerClick(marker: Marker, home: any) {
    currentPopupEl.value = home;

    updateMarkerState(marker);
    flyToMarker(marker);
    updatePopup(marker);
  }

  onUpdated(() => {
    markers.forEach((marker) => marker.remove());
    map.setZoom(12);
    addMarkers();
  });
  onMounted(() => {
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 12,
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

    addMarkers();
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

  .mapboxgl-popup-content {
    @apply rounded-xl p-3 pt-5;
  }
  .mapboxgl-popup-close-button {
    @apply outline-hidden w-3.5 h-3.5 p-1 ml-3 mr-1 top-1 rounded-full flex items-center justify-center bg-black text-white hover:bg-black;
  }
</style>
