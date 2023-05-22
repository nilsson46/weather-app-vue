<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import { fetchCurrentWeather, fetchWeatherForecast, fetchGeoLocation, CurrentWeatherData } from "./service/apiService"

const inputValue = ref(""); 
const currentWeather =ref<CurrentWeatherData | null>(null); 

const handleButtonClick = async () => {
  try {
    const getLocation = await fetchGeoLocation(inputValue.value);
    const data = await fetchCurrentWeather(getLocation.lat, getLocation.lon);
    currentWeather.value = {
      name: data.name,
      main: data.main, 
      weather: data.weather
    };
     
  } catch (error){
    console.error(error)
  }
};

const handleWeatherDetail = async () => {
  console.log("Här kommer data")
  try{
    const getLocation = await fetchGeoLocation(inputValue.value);
    const data = await fetchWeatherForecast(getLocation.lat, getLocation.lon);
      console.log(data)
  }catch(error){
    console.error(error)
  }
} 


</script>

<template>
  <div>
    <div>
      <input class="city-input" placeholder="Search city..." v-model="inputValue" @keypress.enter="handleButtonClick">
      <button class="submit-button" type="submit" @click="handleButtonClick" >Search</button>
    </div>
    <div v-if="currentWeather!=null" class="current-weather">
      <p>City: {{ currentWeather.name }}</p>
      <p>Temprature: {{ currentWeather.main.temp}}</p>
      <p>Weather: {{ currentWeather.weather[0].description }}</p>
      <button class="weather-deatils" @click="handleWeatherDetail">Deatails</button>

    </div>
    <RouterView />
  </div>
  
</template>

<style scoped>

</style>
