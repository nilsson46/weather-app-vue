<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from 'vue-router'
import { fetchCurrentWeather, fetchWeatherDetails, fetchGeoLocation, CurrentWeatherData, WeatherDetailsData } from "./service/apiService"

const inputValue = ref(""); 
const currentWeather =ref<CurrentWeatherData | null>(null); 
const weatherDetails = ref<WeatherDetailsData | null>(null);

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
  try{
    const getLocation = await fetchGeoLocation(inputValue.value);
    const data = await fetchWeatherDetails(getLocation.lat, getLocation.lon);

    weatherDetails.value ={
      name: data.name,
      main: data.main,
      wind: data.wind,
      weather: data.weather
    };

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

    <div v-if="weatherDetails != null" class="weather-details">
      <p>City: {{weatherDetails.name}}</p>
      <p>Temperatur: {{weatherDetails.main.temp}}</p>
      <p>Feels like: {{weatherDetails.main.feels_like}}</p>
      <p>Pressure: {{weatherDetails.main.pressure}}</p>
      <p>Wind speed: {{weatherDetails.wind.speed}}</p>
      <p>Weahter: {{weatherDetails.weather[0].main}}</p>
    </div>
    <RouterView />
  </div>
  
</template>

<style scoped>

</style>
