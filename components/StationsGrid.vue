<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {},
  props: {
    stations: Array,
  },
  emits: ["stationEvent"],
  methods: {
    emitStationEvent(event) {
      console.log(event);
      this.$emit("stationEvent", event);
    },
  },
});
</script>

<template>
  <ul role="list" class="flex-row mx-10 py-10 flex-wrap justify-center">
    <li
      v-for="station in stations"
      :key="station.title"
      class="
        col-span-1
        flex flex-col
        text-center
        bg-gray-800
        rounded-lg
        shadow
        mt-10
        mx-5
        w-full
        max-w-xs
        divide-y divide-gray-600
        overflow-hidden
      "
    >
      <station :station="station" v-on:stationEvent="emitStationEvent" />
    </li>
  </ul>
  <div class="py-20" />
</template>