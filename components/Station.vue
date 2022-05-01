<script>
import { defineComponent } from "@vue/composition-api";
import { Genre } from "./music";

export default defineComponent({
  setup() {},
  props: {
    station: Genre,
  },
  emits: ["stationEvent"],
  methods: {
    emitStationEvent(event, station) {
      this.$emit("stationEvent", { event, station });
    },
  },
});
</script>

<template>
  <div
    class="
      w-full
      h-48
      flex flex-col
      relative
      group
      block
      w-full
      aspect-w-10 aspect-h-7
      overflow-hidden
      max-w-full
    "
    v-bind:style="{ background: station.color }"
  >
    <img
      class="w-full h-full flex-shrink-0 mx-auto object-cover"
      alt=""
      :src="station.stations[station.currentStation].favicon"
      onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100';"
    />
    <div class="absolute mt-20 w-full flex-grow flex flex-row justify-around">
      <button
        v-on:click="emitStationEvent('previous', station)"
        type="button"
        class="hover:opacity-75"
      >
        <img
          class="w-full h-full flex-shrink-0 mx-auto object-cover"
          alt=""
          src="/assets/icons/previous.svg"
        />
      </button>
      <button
        v-if="station.playing"
        v-on:click="emitStationEvent('pause', station)"
        type="button"
        class="hover:opacity-75"
      >
        <img
          class="w-full h-full flex-shrink-0 mx-auto object-cover"
          alt=""
          src="/assets/icons/pause.svg"
        />
      </button>
      <button
        v-else
        v-on:click="emitStationEvent('play', station)"
        type="button"
        class="hover:opacity-75"
      >
        <img
          class="w-full h-full flex-shrink-0 mx-auto object-cover"
          alt=""
          src="/assets/icons/play.svg"
        />
      </button>
      <button
        v-on:click="emitStationEvent('next', station)"
        type="button"
        class="hover:opacity-75"
      >
        <img
          class="w-full h-full flex-shrink-0 mx-auto object-cover"
          alt=""
          src="/assets/icons/next.svg"
        />
      </button>
    </div>
  </div>
  <div class="flex-column divide-gray-200 w-full">
    <h3 class="text-gray- text-lg font-medium py-4 bg-gray-900">
            <span class="block text-white text-4xl">{{ station.title }}</span>
            <span class="block text-indigo-200 ">{{ station.stations.length }} Stations</span>
    </h3>
  </div>
</template>
