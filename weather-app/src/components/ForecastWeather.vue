<template>
  <div class="forecast-weather">
    <div  v-for="(forecast, index) in forecastData.slice(1, 10)" :key="index" class="forecast-item">
    <img
    v-if="forecast.weather.length > 0"
    :src="'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png'"
    />
      <p>Väderförhållanden: {{ forecast.weather[0].description }}</p>
      <p>Tempratur: {{ forecast.main.temp }} °C</p>
      <p> Tidpunkt: {{forecast.dt_txt}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { ForecastDataInterface } from "../modules/types";

const props = defineProps({
  forecastData: {
    type: Array as () => ForecastDataInterface[],
    required: true,
  },
});
</script>