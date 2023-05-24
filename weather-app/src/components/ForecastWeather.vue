<template>
  <div class="forecast-weather">
    <div
      v-for="(forecast, index) in forecastData"
      :key="index"
      class="forecast-item"
    >
      <p>{{ forecast.weather[0].description }}</p>
      <p>{{ forecast.main.temp }} °C</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

export interface ForecastData {
  weather: { description: string }[];
  main: { temp: number };
}

const props = defineProps({
  forecastData: {
    type: Array as () => ForecastData[],
    required: true,
  },
});
</script>