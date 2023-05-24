<template>
    <div>
      <h1>Forecast Weather</h1>
      <div class="forecast-weather" v-for="weather in forecastData">
        <div>Temperature: {{ weather.main.temp }}</div>
        <div>Weather Conditions: {{ weather.weather[0].description }}</div>
      </div>
    </div>
  </template>

<script setup lang="ts">


import { fetchForecastWeather, fetchGeoLocation } from "../service/apiService";
import { ForecastWeatherData } from "../service/apiService";
import { ref, onMounted, watch, defineProps } from "vue";

const props = defineProps({
  cityName: String,
  forecastData: Array,
});
const forecastData = ref<ForecastWeatherData[]>(props.forecastData);
const city = ref("")

onMounted(async () => {
    await getForecastWeather();
})

const getForecastWeather = async () => {
  try {
    const location = await fetchGeoLocation(props.cityName);
    forecastData.values = await fetchForecastWeather(location.lat, location.lon);
  } catch (error) {
    console.error("Failed to fetch forecast weather data", error);
  }
};
</script>

<style>

</style>