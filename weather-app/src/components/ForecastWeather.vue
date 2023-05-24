<template>
  <div class="forecast-weather">
    <div
      v-for="(forecast, index) in forecastData.slice(0,10)"
      :key="index"
      class="forecast-item"
    >
    <img
    v-if="forecast.weather.length > 0"
    :src="'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png'"
    />
      <p>{{ forecast.weather[0].description }}</p>
      <p>{{ forecast.main.temp }} °C</p>
      <p> {{forecast.dt_txt}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

export interface ForecastData {
  dt_txt: number;
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