<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from 'vue-router';
import { 
  fetchCurrentWeather, 
  fetchWeatherDetails, 
  fetchGeoLocation, 
  CurrentWeatherData, 
  WeatherDetailsData, 
  fetchForecastWeather,
  ForecastWeatherData} from "./service/apiService";
import NavBar from "./components/NavBar.vue";
import SearchBar from "./components/SearchBar.vue";
import WeatherDetails from "./components/WeatherDetails.vue";
import ForecastWeather from "./components/ForecastWeather.vue";

    const inputValue = ref(""); 
    const currentWeather =ref<CurrentWeatherData | null>(null); 
    const weatherDetails = ref<WeatherDetailsData | null>(null); 
    const forecastData = ref<ForecastWeatherData | null>(null);
    


const handleWeatherDetail = async () => {
  try {
    const getLocation = await fetchGeoLocation(currentWeather.value?.name || "");
    const data = await fetchWeatherDetails(getLocation.lat, getLocation.lon);
    weatherDetails.value ={
      name: data.name, 
      main: data.main, 
      wind: data.wind,
      weather: data.weather,
    }
   
  } catch (error) {
    console.error("Error in handleWeather Detail:",error);
  }
}; 

const toggleDetails = () => {
  if(weatherDetails.value){
    weatherDetails.value = null;
  } else {
    handleWeatherDetail();
  }
};

const onCitySearched = async (cityName) => {
  console.log("City name received in App.vue:", cityName);
  try {
    const location = await fetchGeoLocation(cityName);
    if (!location) {
      // Handle no location found
      return;
    }

    const currentWeatherData = await fetchCurrentWeather(location.lat, location.lon);
    currentWeather.value = {
      name: currentWeatherData.name,
      main: currentWeatherData.main,
      weather: currentWeatherData.weather
    };

    const weatherDetailsData = await fetchWeatherDetails(location.lat, location.lon);
    weatherDetails.value = {
      name: weatherDetailsData.name,
      main: weatherDetailsData.main,
      wind: weatherDetailsData.wind,
      weather: weatherDetailsData.weather,
    };

    forecastData.value = await fetchForecastWeather(location.lat, location.lon);
    }
     catch (error) {
    console.error(error);
  }
};
    
</script>

<template>
  <div id ="app">
    <nav-bar></nav-bar>
    <search-bar @city-searched="onCitySearched"> </search-bar>
    
    <div v-if="currentWeather!==null" class="current-weather">
      <img :src="'http://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png'" />
      <p>Stad: {{ currentWeather.name }}</p>
      <p>Tempratur: {{ currentWeather.main.temp}}</p>
      <p>Väderförhållanden: {{ currentWeather.weather[0].description }}</p>
      <button class="weather-details" @click="toggleDetails">Deatails</button>

    </div>  

    <WeatherDetails 
    v-if="weatherDetails"
    :temperature="weatherDetails.main.temp"
    :conditions="weatherDetails.weather[0].description"
    :wind-speed="weatherDetails.wind.speed"
    ></WeatherDetails>

  <ForecastWeather :cityName="currentWeather?.name" :forecastData="forecastData" />
    <RouterView />
  </div>
  
</template>

<style scoped>

</style>
