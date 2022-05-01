

<script>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { loadStations, stationTags } from "~~/components/music";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";
import consolaGlobalInstance from "consola";

export default {
  data: function () {
    return {
      loading: true,
      stationTags: [],
      playing: false,
      currentStation: null,
      volume: 100,
    };
  },
  mounted() {
    console.log("mounted");
    this.loadRadio();
  },
  methods: {
    async loadRadio() {
      console.log("load radio");
      this.loading = true;
      const stations = await loadStations();
      for (const station of stations) {
        for (const genre of stationTags) {
          const news = station.tags.includes("news");
          const newsGenre = genre.tags.includes("news");
          const matchingTag =
            station.tags.some((r) => genre.tags.includes(r)) && !news;

          if (genre.tags.includes("all")) genre.stations.push(station);
          else if (matchingTag) genre.stations.push(station);
          else if (newsGenre && news) genre.stations.push(station);
        }
      }
      this.stationTags = stationTags;
      this.loading = false;
    },
    handleVolume(evt){
      const {value } = evt;
      const music = this.$refs.music;
      music.volume = value/100
      this.volume = value
    },
    async handleStationEvent(evt) {
      console.log("play radio", evt);
      const { currentStation } = this;

      const {station, event} = evt;
      const music = this.$refs.music;
      let targetCurrent = false;

      if (currentStation) currentStation.playing = false;
      if (currentStation && currentStation.title === station.title) targetCurrent = true;

      if (event === "play") {
        if (!targetCurrent) station.currentStation = 0;
        station.playing = true;
      }

      if (event === "next") {
        if (!targetCurrent) station.currentStation = 0;
        station.currentStation += 1;
        station.playing = true;
      }

      if (event === "previous") {
        if (!targetCurrent) station.currentStation = 0;
        station.currentStation -= 1;
        station.playing = true;
      }

      let stationIdx = station.currentStation;
      if (stationIdx >= station.stations.length)  stationIdx = 0
      if (stationIdx <= 0)  stationIdx = 0

      const newStation = station.stations[stationIdx]
      music.src = newStation.urlResolved;

      if (event === "pause") {
        station.playing = false;
        music.pause()
      } else {
        station.playing = true; 
        try {
        const audio = await music.play()
        } catch (e) {
          console.log(e)
        }
      }


      this.currentStation = station;
      this.currentPlayingStation = newStation
    },
  },
};
</script>


<template>
  <div class="">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2
          class="
            text-base
            font-semibold
            text-indigo-600
            tracking-wide
            uppercase
          "
        >
          welcome to Radioly
        </h2>
        <p
          class="
            mt-1
            text-4xl
            font-extrabold
            text-gray-50
            sm:text-5xl sm:tracking-tight
            lg:text-6xl
          "
        >
          Music should be available.
        </p>
        <p class="max-w-xl mt-1 mx-auto text-xl text-gray-500">
          Enjoy thousands of free internet radio stations.
        </p>
        <p class="max-w-xl mt-1 mx-auto text-xl text-gray-500">
          No bloat, no tracking, no signup.
        </p>
      </div>
    </div>
  </div>

  <div v-if="loading">loading</div>
  <div v-else>
    <audio id="radio" class="hidden" preload="none" ref="music" />
    <currently-playing v-if="currentStation" :station="currentStation" v-on:stationEvent="handleStationEvent" v-on:volume="handleVolume" :volume="volume"/>
    
    <stations-grid
      :stations="stationTags"
      v-on:stationEvent="handleStationEvent"
    />
  </div>
  <music-bar />
</template>
