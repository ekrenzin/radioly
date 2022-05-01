<script>
import { defineComponent } from "@vue/composition-api";
import { Genre } from "./music";

export default defineComponent({
  setup() {},
  props: {
    station: Genre,
    volume: Number
  },
  emits: ["stationEvent", "volume"],
  methods: {
    emitStationEvent(event, station) {
      this.$emit("stationEvent", { event, station });
    },
    volumeChange(event, station) {
      this.$emit("volume", { value: event.target.value });
    },
  },
});
</script>

<template>
  <div class="relative">
    <div class="absolute inset-x-0 bottom-0 h-1/2" />
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
        <div class="absolute inset-0">
          <img
            class="h-full w-full object-cover"
            :src="station.stations[station.currentStation].favicon"
            onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100';"
          />
          <div class="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
        </div>
        <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <h1
            class="
              text-center text-4xl
              font-extrabold
              tracking-tight
              sm:text-5xl
              lg:text-6xl
            "
          >
            <span class="block text-white text-4xl">{{ station.title }}</span>
            <span class="block text-indigo-200">{{
              station.stations[station.currentStation].name
            }}</span>
          </h1>
          <p
            class="
              mt-6
              max-w-lg
              mx-auto
              text-center text-xl text-indigo-200
              sm:max-w-3xl
            "
          >
            You are listening to
            {{ station.stations[station.currentStation].name }} from
            {{ station.stations[station.currentStation].state }}
            {{ station.stations[station.currentStation].countrycode }}
          </p>
          <div
            class="
              mt-10
              max-w-sm
              mx-auto
              sm:max-w-none sm:flex sm:justify-center
            "
          >
            <div class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid">
              <input type="range" min="1" max="100" :value="volume" class="slider" v-on:change="volumeChange" />
              <div
                class="
                  max-w-7xl
                  mx-auto
                  py-5
                  px-3
                  sm:px-6
                  lg:px-8
                  flex flex-row
                "
              >
                <div class="w-full flex-1 flex justify-center">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slidecontainer {
  width: 100%;
}

.slider {
  width: 400px;
  max-width: 90%;
  height: 15px;
  outline: none;
  opacity: 0.7;
  background-color: #04aa6d;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 10px;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #04aa6d;
  cursor: pointer;
}
</style>